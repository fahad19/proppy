import { ProppyFactory } from './types';
import { create } from './create';

export function withReducer(stateName, dispatcherName, reducer, initialState): ProppyFactory {
  return create({
    initialize() {
      this.props[stateName] = initialState;
      this.props[dispatcherName] = (action) => {
        const payload = typeof action === 'function'
          ? action(this.props, this.providers)
          : action;

        this.set({
          [stateName]: reducer(this.props[stateName], payload),
        });
      };
    },
  });
}
