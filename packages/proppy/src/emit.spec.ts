/* global describe, test, expect */
import { from } from 'rxjs';

import { emit } from './emit';

describe('proppy :: emit', () => {
  test('is a function', () => {
    expect(typeof emit).toEqual('function');
  });

  test('initial state', () => {
    let cancelled = false;

    const P = emit(function (cb) {
      cb({ counter: 1 });
      cb({ counter: 2 });

      return (props) => {
        cancelled = props;
      };
    });
    const p = P();

    expect(p.props).toEqual({});

    p.subscribe(() => {});

    expect(p.props).toEqual({ counter: 2 });
    expect(cancelled).toEqual(false);

    p.destroy();
    expect(cancelled).toEqual({ counter: 2 });
  });
});
