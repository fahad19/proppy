import { Component } from 'preact';

/**
 * Source: https://gist.github.com/developit/5d879edb820228224dc9
 */
export class ProppyProvider extends Component {
  public getChildContext() {
    const { children, ...context } = this.props;

    return context;
  }

  public render({ children }) {
    return (children && children[0]) || null;
  }
}