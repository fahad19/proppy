/* global describe, test, expect */
import { compose } from './compose';
import { withProps } from './withProps';
import { withState } from './withState';
import { map } from './map';

describe('proppy :: map', () => {
  test('is a function', () => {
    expect(typeof map).toEqual('function');
  });

  test('with plain object', () => {
    const P = compose(
      withProps({ counter: 10 }),
      map(props => ({
        counter: props.counter * 10,
      })),
    );
    const p = P();

    expect(p.props).toEqual({
      counter: 100,
    });
  });

  test('with state', () => {
    const P = compose(
      withProps({ staticCounter: 10 }),
      withState('counter', 'setCounter', 0),
      map(props => ({
        ...props,
        staticCounter: props.staticCounter * 10,
        counter: props.counter * 10,
      })),
    );
    const p = P();

    expect(p.props.counter).toEqual(0);
    expect(p.props.staticCounter).toEqual(100);

    p.props.setCounter(5);

    expect(p.props.counter).toEqual(50);
    expect(p.props.staticCounter).toEqual(100);
  });

  test('subscription', () => {
    expect.assertions(2);

    const P = compose(
      withProps({ counter: 10 }),
      map(props => ({
        counter: props.counter * 10,
      })),
    );
    const p = P();

    expect(p.props).toEqual({
      counter: 100,
    });

    p.subscribe(props => {
      expect(props).toEqual({
        counter: 100,
      });
    });
  });
});
