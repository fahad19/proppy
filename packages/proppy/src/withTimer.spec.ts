/* global describe, test, expect */
import { compose } from './compose';
import { withTimer } from './withTimer';

describe('proppy :: withTimer', () => {
  test('is a function', () => {
    expect(typeof withTimer).toEqual('function');
  });

  test('updates', (done) => {
    const P = compose(
      withTimer(100, { foo: 'foo value' }),
      withTimer(100, (props, providers) => ({
        foo: props.foo,
        bar: providers.bar,
      })),
    );

    const p = P({
      bar: 'bar value',
    });

    p.subscribe(() => {});

    expect(p.props).toEqual({});

    setTimeout(() => {
      expect(p.props).toEqual({
        foo: 'foo value',
        bar: 'bar value',
      });

      p.destroy();
      done();
    }, 150);
  });
});
