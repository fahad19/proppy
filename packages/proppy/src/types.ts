export type Props = any;
export type Providers = any;
export type SetFunction = (props: Props, replace?: boolean) => any;
export type UnsubscribeFunction = () => void;
export type SubscribeFunction = (cb: any) => UnsubscribeFunction;
export type DestroyFunction = () => any;

export interface Proppy {
  parent?: Proppy|null;
  providers?: Providers;
  props?: Props;
  set?: SetFunction;
  subscribe?: SubscribeFunction;
  destroy?: DestroyFunction;
}

export type ProppyFactory = (providers?: Providers, parent?: Proppy|null) => Proppy;

export type InitializeFunction = () => void;
export type DidSubscribeFunction = () => void;
export type WillDestroyFunction = () => void;
export type HandleReceivedPropsFunction = (props) => void;

export interface ProppyFactoryOptions {
  initialize?: InitializeFunction;
  didSubscribe?: DidSubscribeFunction;
  willDestroy?: WillDestroyFunction;
  handleReceivedProps?: boolean|HandleReceivedPropsFunction;
}
