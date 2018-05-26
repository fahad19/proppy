import { ProppyFactory } from './types';
import { create } from './create';

export function withProps(defaults: any = {}): ProppyFactory {
  return create({
    initialize() {
      const props = typeof defaults === 'function'
        ? defaults(this.props, this.providers)
        : defaults;

      this.set(props);
    },
  });
}
