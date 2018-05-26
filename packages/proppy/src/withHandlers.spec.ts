/* global describe, test, expect */
import { compose } from './compose';
import { withState } from './withState';
import { withHandlers } from './withHandlers';

describe('proppy :: withHandlers', () => {
  test('is a function', () => {
    expect(typeof withHandlers).toEqual('function');
  });

  test('updates', () => {
    const P = compose(
      withState('counter', 'setCounter', 0),
      withHandlers({
        increment: props => () => props.setCounter(props.counter + 1),
        decrement: props => () => props.setCounter(props.counter - 1),
      }),
    );
    const p = P();

    expect(p.props.counter).toEqual(0);
    expect(typeof p.props.increment).toEqual('function');
    expect(typeof p.props.decrement).toEqual('function');

    p.props.increment();
    p.props.increment();

    expect(p.props.counter).toEqual(2);

    p.props.decrement();

    expect(p.props.counter).toEqual(1);
  });
});
