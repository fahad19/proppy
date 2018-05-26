/* global describe, test, expect */
import { map } from 'rxjs/operators';
import { compose, withState } from 'proppy';

import { withStream } from './withStream';

describe('proppy-rx :: withStream', () => {
  test('is a function', () => {
    expect(typeof withStream).toEqual('function');
  });

  test('updates', () => {
    const P = compose(
      withState('counter', 'setCounter', 0),
      withStream(props$ => props$.pipe(
        map((props: any) => ({
          ...props,
          counter: props.counter * 10,
        })),
      )),
    );

    const p = P();

    p.subscribe(() => {});

    expect(p.props.counter).toEqual(0);

    p.props.setCounter(5);

    expect(p.props.counter).toEqual(50);
  });
});
