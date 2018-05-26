/* global describe, test, expect */
import { from } from 'rxjs';

import { handleReceivedProps } from './handleReceivedProps';
import { compose } from './compose';
import { emit } from './emit';

describe('proppy :: handleReceivedProps', () => {
  test('is a function', () => {
    expect(typeof handleReceivedProps).toEqual('function');
  });

  test('updates', () => {
    let cancelled = false;

    const P = compose(
      emit(function (cb) {
        cb({ counter: 1 });
        cb({ counter: 2 });

        return (props) => {
          cancelled = props;
        };
      }),
      handleReceivedProps(false),
    );
    const p = P();

    expect(p.props).toEqual({});

    p.subscribe(() => {});

    expect(p.props).toEqual({});

    p.destroy();
  });
});
