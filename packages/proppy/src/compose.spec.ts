/* global describe, test, expect */
import { compose } from './compose';
import { withProps } from './withProps';
import { withState } from './withState';
import { map } from './map';
import { shouldUpdate } from './shouldUpdate';

describe('proppy :: compose', () => {
  test('is a function', () => {
    expect(typeof compose).toEqual('function');
  });

  test('with multiple defaults', () => {
    const P = compose(
      withProps({ foo: 'foo value' }),
      withProps({ bar: 'bar value' }),
      withProps((props, { baz }) => ({ baz })),
    );

    const p = P({
      baz: 'baz value',
    });

    expect(p.props).toEqual({
      foo: 'foo value',
      bar: 'bar value',
      baz: 'baz value',
    });
  });

  test('with multiple states', () => {
    const P = compose(
      withState('counter', 'setCounter', 0),
      withState('age', 'setAge', 50),
      compose(
        withState('score', 'setScore', 0),
        shouldUpdate(
          (prevProps, nextProps) => nextProps.score % 2 === 0,
        ),
      ),
      map(props => ({
        ...props,
        score: props.score * 10,
      })),
    );

    const p = P();

    expect(p.props.counter).toEqual(0);
    expect(typeof p.props.setCounter).toEqual('function');

    expect(p.props.age).toEqual(50);
    expect(typeof p.props.setAge).toEqual('function');

    expect(p.props.score).toEqual(0);
    expect(typeof p.props.setScore).toEqual('function');

    let triggerCount = 0;
    p.subscribe(() => {
      triggerCount++;
    });

    p.props.setCounter(1);
    expect(p.props.counter).toEqual(1);
    p.props.setCounter(2);
    expect(p.props.counter).toEqual(2);

    p.props.setAge(55);
    expect(p.props.age).toEqual(55);

    expect(triggerCount).toEqual(4);

    expect(p.props.counter).toEqual(2);
    expect(typeof p.props.setCounter).toEqual('function');
    expect(p.props.age).toEqual(55);
    expect(typeof p.props.setAge).toEqual('function');

    p.props.setScore(1);
    expect(p.props.score).toEqual(0);

    p.props.setScore(2);
    expect(p.props.score).toEqual(20);
  });
});
