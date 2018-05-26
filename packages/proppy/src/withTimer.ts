import { ProppyFactory } from './types';
import { create } from './create';

export function withTimer(timer: number, defaults: any = {}): ProppyFactory {
  return create({
    didSubscribe() {
      this._t = setTimeout(() => {
        const props = typeof defaults === 'function'
          ? defaults(this.props, this.providers)
          : defaults;

        this.set(props);
      }, timer);
    },

    willDestroy() {
      clearTimeout(this._t);
    },
  });
}
