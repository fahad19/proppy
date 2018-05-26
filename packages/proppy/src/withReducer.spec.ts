/* global describe, test, expect */
import { from } from 'rxjs';

import { withReducer } from './withReducer';

describe('proppy :: withReducer', () => {
  test('is a function', () => {
    expect(typeof withReducer).toEqual('function');
  });

  function testReducer(state, action) {
    switch (action.type) {
      case 'INCREMENT':
        return { value: state.value + 1 };
      case 'DECREMENT':
        return { value: state.value - 1 };
      default:
        return state;
    }
  }

  test('initial state', () => {
    const P = withReducer('counter', 'dispatch', testReducer, { value: 0 });
    const p = P();

    expect(p.props.counter.value).toEqual(0);
    expect(typeof p.props.dispatch).toEqual('function');
  });

  test('initial subscription', () => {
    expect.assertions(3);

    const P = withReducer('counter', 'dispatch', testReducer, { value: 0 });
    const p = P();

    expect(p.props.counter.value).toEqual(0);
    expect(typeof p.props.dispatch).toEqual('function');

    p.subscribe(props => {
      expect(props.counter.value).toEqual(0);
    });
  });

  test('updates', () => {
    const P = withReducer('counter', 'dispatch', testReducer, { value: 0 });
    const p = P({ foo: 'foo value' });

    expect(p.props.counter.value).toEqual(0);
    expect(typeof p.props.dispatch).toEqual('function');

    p.props.dispatch({ type: 'INCREMENT' });
    expect(p.props.counter.value).toEqual(1);

    p.props.dispatch({ type: 'INCREMENT' });
    expect(p.props.counter.value).toEqual(2);

    p.props.dispatch({ type: 'DECREMENT' });
    expect(p.props.counter.value).toEqual(1);

    p.props.dispatch({ type: 'I_DONT_EXIST' });
    expect(p.props.counter.value).toEqual(1);

    p.props.dispatch((props, providers) => {
      expect(p.props.counter.value).toEqual(1);
      expect(providers).toEqual({ foo: 'foo value' });

      return { type: 'INCREMENT' };
    });
    expect(p.props.counter.value).toEqual(2);
  });
});
