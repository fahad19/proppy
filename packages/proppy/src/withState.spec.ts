/* global describe, test, expect */
import { from } from 'rxjs';

import { withState } from './withState';

describe('proppy :: withState', () => {
  test('is a function', () => {
    expect(typeof withState).toEqual('function');
  });

  test('initial state', () => {
    const P = withState('counter', 'setCounter', 0);
    const p = P();

    expect(p.props.counter).toEqual(0);
    expect(typeof p.props.setCounter).toEqual('function');
  });

  test('initial subscription', () => {
    expect.assertions(3);

    const P = withState('counter', 'setCounter', 0);
    const p = P();

    expect(p.props.counter).toEqual(0);
    expect(typeof p.props.setCounter).toEqual('function');

    p.subscribe(props => {
      expect(props.counter).toEqual(0);
    });
  });

  test('updates', () => {
    const P = withState('counter', 'setCounter', 0);
    const p = P();

    expect(p.props.counter).toEqual(0);
    expect(typeof p.props.setCounter).toEqual('function');

    p.props.setCounter(1);
    expect(p.props.counter).toEqual(1);

    p.props.setCounter(2);
    expect(p.props.counter).toEqual(2);

    p.props.setCounter(3);
    expect(p.props.counter).toEqual(3);
  });

  test('subscription triggers', () => {
    const P = withState('counter', 'setCounter', 0);
    const p = P();

    let triggerCount = 0;
    p.subscribe(() => {
      triggerCount++;
    });

    p.props.setCounter(1);
    p.props.setCounter(2);
    p.props.setCounter(3);

    expect(triggerCount).toEqual(4);
  });
});
