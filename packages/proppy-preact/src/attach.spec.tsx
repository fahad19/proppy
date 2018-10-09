/* global describe, test, expect */
/** @jsx h */
import { h, Component } from 'preact';
import { compose, withState, withProps, map } from 'proppy';
import * as RenderSpy from 'preact-render-spy'
import { resetDOM } from 'frint-test-utils';

import { attach } from './attach';
import { ProppyProvider } from './ProppyProvider';

describe('proppy-preact :: attach', () => {
  beforeAll(() => resetDOM());

  test('is a function', () => {
    expect(typeof attach).toEqual('function');
  });

  test('single render', () => {
    function Base(props) {
      return (
        <div>
          <span className="counter">{props.counter}</span>
        </div>
      );
    }

    const P = withProps({
      counter: 1,
    });

    const Enhanced = attach(P)(Base);
    const wrapper = RenderSpy.render(<Enhanced />);
    expect(wrapper.find('.counter').text()).toEqual('1');
  });

  test('single render with parent props', () => {
    function Base(props) {
      return (
        <div>
          <span className="counter">{props.counter}</span>
          <span className="foo">{props.foo}</span>
        </div>
      );
    }

    const P = withProps({
      counter: 1,
    });

    const Enhanced = attach(P)(Base);

    function Root() {
      return <Enhanced foo="foo value" />;
    }

    const wrapper = RenderSpy.render(<Root />);
    expect(wrapper.find('.counter').contains('1')).toBeTruthy();
    expect(wrapper.find('.foo').contains('foo value')).toBeTruthy();
  });

  test('single render while accessing providers', () => {
    function Base(props) {
      return (
        <div>
          <span className="counter">{props.counter}</span>
          <span className="foo">{props.foo}</span>
          <span className="a">{props.a}</span>
        </div>
      );
    }

    const P = withProps((props, providers) => {
      return {
        counter: 1,
        a: providers.providerA,
      };
    });

    const Enhanced = attach(P)(Base);

    function Root() {
      return (
        <ProppyProvider providers={{ providerA: 'A' }}>
          <Enhanced foo="foo value" />
        </ProppyProvider>
      );
    }

    const wrapper = RenderSpy.render(<Root />);
    expect(wrapper.find('.counter').contains('1')).toBeTruthy();
    expect(wrapper.find('.foo').text()).toEqual('foo value');
    expect(wrapper.find('.a').text()).toEqual('A');
  })

  test('re-renders based on own updates', () => {
    function Base(props) {
      return (
        <div>
          <span className="counter">
            {props.counter}
          </span>

          <a
            href="#"
            className="increment"
            onClick={() => props.setCounter(props.counter + 1)}
          >
            Increment
          </a>
        </div>
      );
    }

    const P = withState('counter', 'setCounter', 0);

    const Enhanced = attach(P)(Base);

    function Root() {
      return (
        <ProppyProvider>
          <Enhanced foo="foo value" />
        </ProppyProvider>
      );
    }

    const wrapper = RenderSpy.render(<Root />);
    expect(wrapper.find('.counter').contains('0')).toBeTruthy();
    wrapper.find('.increment').simulate('click');
    expect(wrapper.find('.counter').contains('1')).toBeTruthy();
  });

  test('re-renders based on parent updates', () => {
    function Base(props) {
      return (
        <div>
          <span className="counter">
            {props.counter}
          </span>

          <a
            href="#"
            className="increment"
            onClick={() => props.setCounter(props.counter + 1)}
          >
            Increment
          </a>

          <span className="foo">
            {props.foo}
          </span>
        </div>
      );
    }

    const P = compose(
      map(props => ({
        ...props,
      })),
      withState('counter', 'setCounter', 0),
    );

    const Enhanced = attach(P)(Base);

    interface RootState {
      foo: string;
    }

    class Root extends Component<{}, RootState> {
      constructor(props) {
        super(props);

        this.state = {
          foo: 'initial foo',
        };
      }

      public handleFooUpdate() {
        this.setState({
          foo: 'updated foo',
        });
      }

      public render() {
        return (
          <div>
            <a
              href="#"
              className="update-foo"
              onClick={() => this.handleFooUpdate()}
            >
              Update foo's value
            </a>

            <Enhanced foo={this.state.foo} />
          </div>
        );
      }
    }

    const wrapper = RenderSpy.render(<Root />);

    // initial foo
    expect(wrapper.find('.foo').contains('initial foo')).toBeTruthy();

    // counter
    expect(wrapper.find('.counter').contains('0')).toBeTruthy();
    wrapper.find('.increment').simulate('click');
    expect(wrapper.find('.counter').contains('1')).toBeTruthy();

    // updated foo
    wrapper.find('.update-foo').simulate('click');
    expect(wrapper.find('.foo').contains('updated foo')).toBeTruthy();
  });
});
