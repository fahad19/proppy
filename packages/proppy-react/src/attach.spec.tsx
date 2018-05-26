/* global describe, test, expect */
import * as React from 'react';
import { compose, withState, withProps, map } from 'proppy';
import * as TestRenderer from 'react-test-renderer';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { resetDOM } from 'frint-test-utils';

import { attach } from './attach';
import { ProppyProvider } from './ProppyProvider';

Enzyme.configure({ adapter: new Adapter() });

describe('proppy-react :: attach', () => {
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

    const wrapper = Enzyme.render(<Enhanced />);

    expect(wrapper.find('.counter').html()).toEqual('1');
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

    const wrapper = Enzyme.render(<Root />);

    expect(wrapper.find('.counter').html()).toEqual('1');
    expect(wrapper.find('.foo').html()).toEqual('foo value');
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

    const wrapper = Enzyme.render(<Root />);

    expect(wrapper.find('.counter').html()).toEqual('1');
    expect(wrapper.find('.foo').html()).toEqual('foo value');
    expect(wrapper.find('.a').html()).toEqual('A');
  });

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
      return <Enhanced foo="foo value" />;
    }

    const wrapper = Enzyme.mount(<Root />);

    expect(wrapper.find('.counter').text()).toEqual('0');

    wrapper.find('.increment').simulate('click');

    expect(wrapper.find('.counter').text()).toEqual('1');
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
        foo: props.foo.toUpperCase(),
      })),
      withState('counter', 'setCounter', 0),
    );

    const Enhanced = attach(P)(Base);

    interface RootState {
      foo: string;
    }

    class Root extends React.Component<{}, RootState> {
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

    const wrapper = Enzyme.mount(<Root />);

    // initial foo
    expect(wrapper.find('.foo').text()).toEqual('INITIAL FOO');

    // counter
    expect(wrapper.find('.counter').text()).toEqual('0');
    wrapper.find('.increment').simulate('click');
    expect(wrapper.find('.counter').text()).toEqual('1');

    // updated foo
    wrapper.find('.update-foo').simulate('click');
    expect(wrapper.find('.foo').text()).toEqual('UPDATED FOO');
  });
});
