import { ProppyFactory } from './types';
import { create } from './create';

export function willDestroy(fn): ProppyFactory {
  return create({
    willDestroy: function () {
      fn(this.props, this.providers);
    },
  });
}
