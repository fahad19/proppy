/* global describe, test, expect */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { compose, withProps, withState } from 'proppy';
import { ProppyProvider, attach } from 'proppy-react';

import { useProppy } from './useProppy';

describe('proppy-react-hooks :: useProppy', () => {
  let reactRoot;

  beforeEach(() => {
    resetDOM();

    reactRoot = document.createElement('div');
    document.body.appendChild(reactRoot);
  });

  afterEach(() => {
    document.body.removeChild(reactRoot);
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
      const { foo } = useProppy(P);

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

  test('----sync single render', () => {
    const providers = {};

    const P = compose(
      withProps({ foo: 'foo value' })
    );

    function Child(props) {
      const { foo } = useProppy(P);

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

  // test('sync multiple renders', () => {
  //   const providers = {};

  //   const P = compose(
  //     withState('counter', 'setCounter', 0),
  //   );

  //   function Child(props) {
  //     const { counter, setCounter } = useProppy(P);

  //     return <p onClick={() => setCounter(counter + 1)}>{counter}</p>;
  //   }

  //   function Root() {
  //     return (
  //       <ProppyProvider providers={providers}>
  //         <Child />
  //       </ProppyProvider>
  //     );
  //   }

  //   ReactDOM.render(<Root />, reactRoot);

  //   // const p = reactRoot.querySelector('p');
  //   // console.log(p.textContent);
  // });
});
