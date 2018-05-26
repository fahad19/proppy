import { ProppyFactory } from './types';
import { create } from './create';

export function withState(stateName, setterName, initialState): ProppyFactory {
  return create({
    initialize() {
      this.props[stateName] = initialState;
      this.props[setterName] = (value) => {
        this.set({
          [stateName]: value,
        });
      };
    },
  });
}
