import { h, Component } from 'preact';

import { ProppyContext } from './ProppyContext';

export class ProppyProvider extends Component {
  public render({ children, providers }) {
    return (
      <ProppyContext.Provider value={providers}>
        {children}
      </ProppyContext.Provider>
    );
  }
}
