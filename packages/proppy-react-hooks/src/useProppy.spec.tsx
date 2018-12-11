/* global describe, test, expect */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { compose, withProps } from 'proppy';
import { ProppyProvider, attach } from 'proppy-react';

import { useProppy } from './useProppy';

describe('proppy-react-hooks :: useProppy', () => {
  let reactRoot;

  beforeEach(() => {
    reactRoot = document.createElement('div');
    document.body.appendChild(reactRoot);
  });

  test('is a function', () => {
    expect(typeof useProppy).toEqual('function');
  });

  test('sync single render', () => {
    const providers = {};

    const P = compose(
      withProps({ foo: 'foo value' })
    );

    function Child(props) {
      const { foo } = useProppy(P, props);

      return <p>{foo}</p>;
    }

    function Root() {
      return (
        <ProppyProvider providers={providers}>
          <Child />
        </ProppyProvider>
      );
    }

    ReactDOM.render(<Root />, reactRoot);
    expect(reactRoot.textContent).toEqual('foo value');
  });
});
