import {
  Proppy,
  ProppyFactory,
  ProppyFactoryOptions,
} from './types';

function notify(callbacks, props) {
  callbacks.forEach(cb => cb(props));
}

function removeCallback(callbacks, cb = null) {
  for (let i = 0; i < callbacks.length; i++) {
    if (cb && callbacks[i] === cb) {
      callbacks.splice(i, 1);
      break;
    } else {
      callbacks.splice(i, 1);
    }
  }
}

function defaultParentHandler() {
  this.set.apply(this, arguments);
}

function getParentHandler(parent: null|Proppy, options: ProppyFactoryOptions) {
  if (
    !parent ||
    options.handleReceivedProps === false
  ) {
    return;
  }

  if (
    options.handleReceivedProps === true ||
    options.handleReceivedProps === undefined
  ) {
    return defaultParentHandler;
  }

  return options.handleReceivedProps;
}

export function create(options: ProppyFactoryOptions): ProppyFactory {
  return function (providers = {}, parent): Proppy {
    const callbacks = [];
    let hasSubscribed = false;
    const parentHandler = getParentHandler(parent, options);
    let parentSubscription;

    const p: Proppy = {
      props: parent
        ? Object.assign({}, parent.props)
        : {},
      parent,
      providers,
    };

    p.set = function (props, replace = false) {
      p.props = replace
        ? Object.assign({}, props)
        : Object.assign({}, p.props, props);

      return notify(callbacks, p.props);
    };

    p.subscribe = function (cb) {
      if (!hasSubscribed) {
        hasSubscribed = true;

        if (options.didSubscribe) {
          options.didSubscribe.apply(p);
        }
      }

      callbacks.push(cb);
      cb(p.props);

      return function () {
        removeCallback(callbacks, cb);
      };
    };

    p.destroy = function () {
      if (options.willDestroy) {
        options.willDestroy.apply(p);
      }

      if (parentSubscription) {
        parentSubscription();
        parent.destroy();
      }

      removeCallback(callbacks);
    };

    if (options.initialize) {
      options.initialize.apply(p);
    }

    if (parentHandler) {
      parentSubscription = parent.subscribe(
        props => parentHandler.apply(p, [props]),
      );
    }

    return p;
  };
}
