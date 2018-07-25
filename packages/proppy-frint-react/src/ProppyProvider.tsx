import * as React from 'react'; // eslint-disable-line
import { observe, streamProps, ProviderProps } from 'frint-react';
import { ProppyProvider as ProppyReactProvider } from 'proppy-react'; // eslint-disable-line

export class Base extends React.Component<ProviderProps & { providers }> {
  public render() {
    const { providers, children } = this.props;
    return <ProppyReactProvider providers={providers}>{children}</ProppyReactProvider>;
  }
}

export const ProppyProvider = observe((app: any) => {
  return streamProps({})
    .set(app.get())
    .get$();
})(Base);
