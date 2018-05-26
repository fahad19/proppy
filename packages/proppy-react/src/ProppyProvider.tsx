import * as React from 'react';
import { Providers } from 'proppy';

import { ProppyContext } from './ProppyContext';

export class ProppyProvider extends React.Component {
  public props: {
    providers: Providers;
    children: any;
  };

  public render() {
    return (
      <ProppyContext.Provider value={this.props.providers}>
        {this.props.children}
      </ProppyContext.Provider>
    );
  }
}
