import { ProppyFactory } from './types';
import { create } from './create';

export function onChange(propName, fn): ProppyFactory {
  return create({
    initialize() {
      this._prevProps = this.props;

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

      if (detector(this._prevProps, parentProps)) {
        const cb = newProps => this.set(newProps);
        const result = fn(parentProps, this.providers, cb);

        if (result) {
          this.set(result);
        }
      }
    },
  });
}
