/* global describe, test, expect */
import { compose } from './compose';
import { withProps } from './withProps';
import { withState } from './withState';
import { onChange } from './onChange';

describe('proppy :: onChange', () => {
  test('is a function', () => {
    expect(typeof onChange).toEqual('function');
  });

  test('changes by string', () => {
    const P = compose(
      withProps({ foo: 'initial foo' }),
      withState('counter', 'setCounter', 0),
      onChange('counter', (props) => ({
        foo: `changed foo with counter ${props.counter}`
      })),
    );
    const p = P();

    expect(p.props.foo).toEqual('initial foo');
    expect(p.props.counter).toEqual(0);

    p.props.setCounter(5);
    expect(p.props.foo).toEqual('changed foo with counter 5');
  });

  test('changes by comparison', () => {
    const P = compose(
      withProps({ foo: 'initial foo' }),
      withState('counter', 'setCounter', 0),
      onChange(
        (prevProps, nextProps) => prevProps.counter !== nextProps.counter,
        (props) => ({
          foo: `changed foo with counter ${props.counter}`
        })
      ),
    );
    const p = P();

    expect(p.props.foo).toEqual('initial foo');
    expect(p.props.counter).toEqual(0);

    p.props.setCounter(5);
    expect(p.props.counter).toEqual(5);
    expect(p.props.foo).toEqual('changed foo with counter 5');

    // should still be same since no change
    p.props.setCounter(5);
    expect(p.props.counter).toEqual(5);
    expect(p.props.foo).toEqual('changed foo with counter 5');

    p.props.setCounter(10);
    expect(p.props.counter).toEqual(10);
    expect(p.props.foo).toEqual('changed foo with counter 10');
  });

  test('changes by string, returning async props', () => {
    const P = compose(
      withState('foo', 'setFoo', 'initial foo'),
      withState('counter', 'setCounter', 0),
      onChange('counter', (props, providers, cb) => {
        cb({
          foo: `changed foo with counter ${props.counter}`
        });
      }),
    );
    const p = P();

    expect(p.props.foo).toEqual('initial foo');
    expect(p.props.counter).toEqual(0);

    p.props.setCounter(5);
    expect(p.props.foo).toEqual('changed foo with counter 5');
  });
});
