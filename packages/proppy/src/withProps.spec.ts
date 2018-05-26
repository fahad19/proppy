/* global describe, test, expect */
import { withProps } from './withProps';

describe('proppy :: withProps', () => {
  test('is a function', () => {
    expect(typeof withProps).toEqual('function');
  });

  test('with plain object', () => {
    const P = withProps({
      foo: 'foo value',
    });
    const p = P();

    expect(p.props).toEqual({
      foo: 'foo value',
    });
  });

  test('with function returning plain object', () => {
    const P = withProps(() => ({
      foo: 'foo value',
    }));
    const p = P();

    expect(p.props).toEqual({
      foo: 'foo value',
    });
  });

  test('with function accessing args returning plain object', () => {
    const P = withProps((props, { bar }) => ({
      foo: 'foo value',
      bar,
    }));
    const p = P({
      bar: 'bar value',
    });

    expect(p.props).toEqual({
      foo: 'foo value',
      bar: 'bar value',
    });
  });

  test('subscription', () => {
    expect.assertions(2);

    const P = withProps(() => ({
      foo: 'foo value',
    }));
    const p = P();

    expect(p.props).toEqual({
      foo: 'foo value',
    });

    p.subscribe(props => {
      expect(props).toEqual({
        foo: 'foo value',
      });
    });
  });
});
