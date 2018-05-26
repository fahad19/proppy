/* global describe, test, expect */
import { withStateHandlers } from './withStateHandlers';

describe('proppy :: withStateHandlers', () => {
  test('is a function', () => {
    expect(typeof withStateHandlers).toEqual('function');
  });

  test('updates', () => {
    const P = withStateHandlers(
      { counter: 0 },
      {
        increment: ({ counter }) => () => ({ counter: counter + 1 }),
        decrement: ({ counter }) => () => ({ counter: counter - 1 }),
      },
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
