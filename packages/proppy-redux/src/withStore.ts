import { create, ProppyFactory } from 'proppy';

const defaultOptions = {
  providerName: 'store',
};

export function withStore(
  mapState,
  mapDispatch,
  options = defaultOptions
): ProppyFactory {
  return create({
    initialize() {
      this._store = this.providers[options.providerName];

      if (!this._store) {
        throw new Error('Store not found');
      }

      if (mapState) {
        this.set(mapState.apply(this, [
          this._store.getState(),
          this.providers,
          this.props,
        ]));
      }

      if (mapDispatch) {
        Object.keys(mapDispatch).forEach(actionName => {
          const actionCreator = mapDispatch[actionName];

          this.set({
            [actionName]: (...args) => this._store.dispatch(
              actionCreator(...args),
            ),
          });
        });
      }
    },

    didSubscribe() {
      if (mapState) {
        this._storeSubscription = this._store.subscribe(() => {
          this.set(mapState.apply(this, [
            this._store.getState(),
            this.providers,
            this.props,
          ]));
        });
      }
    },

    handleReceivedProps(parentProps) {
      if (mapState) {
        this.set(parentProps);
        this.set(mapState.apply(this, [
          this._store.getState(),
          this.providers,
          this.props,
        ]));
      }
    },
    
    willDestroy() {
      if (this._storeSubscription) {
        this._storeSubscription();
      }
    },
  });
}
