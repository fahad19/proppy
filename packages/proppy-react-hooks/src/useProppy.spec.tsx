/* global describe, test, expect */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestRenderer from 'react-test-renderer';

import { compose, withProps, withState } from 'proppy';
import { ProppyProvider, attach } from 'proppy-react';

import { useProppy } from './useProppy';

describe('proppy-react-hooks :: useProppy', () => {
  test('is a function', () => {
    expect(typeof useProppy).toEqual('function');
  });

  test('sync single render', () => {
    const providers = {};

    const P = compose(
      withProps({ foo: 'foo value' })
    );

    function Child(props) {
      const { foo } = useProppy(P);

      return <p data-test="foo">{foo}</p>;
    }

    function Root() {
      return (
        <ProppyProvider providers={providers}>
          <Child />
        </ProppyProvider>
      );
    }

    const result = TestRenderer.create(<Root />);
    const testInstance = result.root;
    const find = id => testInstance.findByProps({ "data-test": id })

    expect(find('foo').children[0]).toEqual('foo value');
  });

  test('-- running previous test again, but hangs', () => {
    const providers = {};

    const P = compose(
      withProps({ foo: 'foo value' })
    );

    function Child(props) {
      const { foo } = useProppy(P);

      return <p data-test="foo">{foo}</p>;
    }

    function Root() {
      return (
        <ProppyProvider providers={providers}>
          <Child />
        </ProppyProvider>
      );
    }

    const result = TestRenderer.create(<Root />);
    const testInstance = result.root;
    const find = id => testInstance.findByProps({ "data-test": id })

    expect(find('foo').children[0]).toEqual('foo value');
  });
});
