import { ProppyFactory } from './types';
import { create } from './create';

export function emit(fn): ProppyFactory {
  return create({
    didSubscribe() {
      const cb = (...args) => this.set(...args);

      this._cancel = fn(cb, this.props, this.providers);
    },

    willDestroy() {
      if (typeof this._cancel === 'function') {
        this._cancel(this.props);
      }
    }
  });
}
