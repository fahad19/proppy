import { ProppyFactory } from './types';
import { create } from './create';

export function withStateHandlers(
  initialState,
  handlers,
  acceptReceivedProps = true
): ProppyFactory {
  return create({
    initialize() {
      this.set(initialState, !acceptReceivedProps);

      Object.keys(handlers).forEach((k) => {
        const v = handlers[k];

        this.set({
          [k]: (...args) => this.set(
            v(
              this.props,
              this.providers,
            )(...args),
          ),
        });
      });
    },

    handleReceivedProps: acceptReceivedProps,
  });
}
