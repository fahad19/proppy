/* global describe, test, expect */
import { compose } from './compose';
import { withState } from './withState';
import { shouldUpdate } from './shouldUpdate';

describe('proppy :: shouldUpdate', () => {
  test('is a function', () => {
    expect(typeof shouldUpdate).toEqual('function');
  });

  test('with state', () => {
    const P = compose(
      withState('counter', 'setCounter', 0),
      shouldUpdate(
        (prevProps, nextProps) => nextProps.counter % 2 === 0,
      ),
    );
    const p = P();

    expect(p.props.counter).toEqual(0);

    // shouldn NOT update
    p.props.setCounter(1);
    expect(p.props.counter).toEqual(0);

    // should update
    p.props.setCounter(2);
    expect(p.props.counter).toEqual(2);
  });
});
