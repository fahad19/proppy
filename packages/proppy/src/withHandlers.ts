import { ProppyFactory } from './types';
import { create } from './create';

export function withHandlers(handlers): ProppyFactory {
  return create({
    initialize() {
      Object.keys(handlers).forEach((k) => {
        const v = handlers[k];

        this.set({
          [k]: (...args) => v(
            this.props,
            this.providers,
          )(...args),
        });
      });
    },
  });
}
