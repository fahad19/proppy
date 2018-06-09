import { ProppyFactory } from './types';
import { create } from './create';

export function onChange(propName, fn): ProppyFactory {
  return create({
    initialize() {
      this._prevProps = this.props;
      this._own = {};

      this._i = false;
    },

    handleReceivedProps(parentProps) {
      if (!this._i) {
        this._i = true;

        return;
      }

      const detector = typeof propName === 'string'
        ? (p, n) => p[propName] !== n[propName]
        : propName;

      this.set(Object.assign({}, parentProps, this._own));

      const cb = newProps => {
        this._own = newProps;
        this.set(newProps);
      };

      if (detector(this._prevProps, parentProps)) {
        const result = fn(parentProps, this.providers, cb);

        if (result) {
          cb(result);
        }
      }

      this._prevProps = this.props;
    },
  });
}
