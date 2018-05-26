/* global describe, test, expect */
import { map } from 'rxjs/operators';
import { withState } from 'proppy';

import { from } from './from';

describe('proppy-rx :: from', () => {
  test('is a function', () => {
    expect(typeof from).toEqual('function');
  });

  test('subscription triggers with Observable', () => {
    const P = withState('counter', 'setCounter', 0);
    const p = P();
    const props$ = from(p);

    let triggerCount = 0;

    props$.subscribe(() => {
      triggerCount++;
    });

    p.props.setCounter(1);
    p.props.setCounter(2);
    p.props.setCounter(3);

    expect(triggerCount).toEqual(4);
  });
});
