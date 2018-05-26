import * as React from 'react';
import { Proppy, ProppyFactory, Providers, create } from 'proppy';

export interface ComponentProps {
  children: any;
  parentProps: any;
  providers: Providers;
  proppyFactory: ProppyFactory;
}

export interface ComponentState {
  proppyProps: any;
}

export class ProppySubscription extends React.Component<ComponentProps, ComponentState> {
  private _p: Proppy;
  private _parent: Proppy;

  constructor(props, ...args) {
    super(props, ...args);

    const {
      providers,
      proppyFactory,
      parentProps,
    } = props;

    this._parent = create({
      initialize() {
        this.set(parentProps);
      },
    })(providers);
    this._p = props.proppyFactory(providers, this._parent);

    this.state = {
      proppyProps: this._p.props,
    };
  }

  // @TODO: this needs attention
  public UNSAFE_componentWillReceiveProps(nextProps) {
    this._parent.set(nextProps.parentProps);
  }

  public componentDidMount() {
    this._p.subscribe(
      proppyProps => this.setState({
        proppyProps,
      })
    );
  }

  public componentWillUnmount() {
    this._p.destroy();
  }

  public render() {
    return this.props.children(this.state.proppyProps);
  }
}
