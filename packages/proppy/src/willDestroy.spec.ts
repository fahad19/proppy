/* global describe, test, expect */
import { from } from 'rxjs';

import { compose } from './compose';
import { withState } from './withState';
import { willDestroy } from './willDestroy';

describe('proppy :: willDestroy', () => {
  test('is a function', () => {
    expect(typeof willDestroy).toEqual('function');
  });

  test('updates', () => {
    let called = false;

    const P = compose(
      withState('counter', 'setCounter', 0),
      willDestroy(() => {
        called = true;
      }),
    );
    const p = P();

    p.subscribe(() => {});

    expect(p.props.counter).toEqual(0);
    expect(typeof p.props.setCounter).toEqual('function');
    expect(called).toBe(false);

    p.destroy();
    expect(called).toBe(true);
  });
});
