import { ProppyFactory } from './types';
import { create } from './create';

export function shouldUpdate(fn): ProppyFactory {
  return create({
    initialize() {
      this._prevProps = this.props;
    },

    handleReceivedProps(parentProps) {
      if (fn(this._prevProps, parentProps, this.providers)) {
        this.set(parentProps, true);
      }
    },
  });
}
