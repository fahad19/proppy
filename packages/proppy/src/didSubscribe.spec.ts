/* global describe, test, expect */
import { from } from 'rxjs';

import { compose } from './compose';
import { withState } from './withState';
import { didSubscribe } from './didSubscribe';

describe('proppy :: didSubscribe', () => {
  test('is a function', () => {
    expect(typeof didSubscribe).toEqual('function');
  });

  test('updates', () => {
    let called = false;

    const P = compose(
      withState('counter', 'setCounter', 0),
      didSubscribe((props) => {
        props.setCounter(1);

        return () => {
          called = true;
        };
      }),
    );
    const p = P();

    p.subscribe(() => {});

    expect(p.props.counter).toEqual(1);
    expect(typeof p.props.setCounter).toEqual('function');
    expect(called).toEqual(false);

    p.destroy();
    expect(called).toEqual(true);
  });
});
