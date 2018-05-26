/* global describe, test, expect */
import * as Vue from 'vue';
import { mount } from '@vue/test-utils';
import { compose, withState, withProps, map } from 'proppy';

import { attach } from './attach';

describe('proppy-vue :: attach', () => {
  test('is a function', () => {
    expect(typeof attach).toEqual('function');
  });

  test('single render', () => {
    const Base = {
      name: 'Base',

      props: ['counter'],

      render(h) {
        return h(
          'span',
          null,
          `Counter: ${this.counter}`,
        );
      },
    };

    const P = withProps({
      counter: 1,
    });

    const Enhanced = attach(P)(Base);

    const Root = {
      name: 'Root',

      provide: {
        proppy: {},
      },

      render(h) {
        return h(Enhanced, null);
      },
    };

    const wrapper = mount(Root);
    expect(wrapper.find('span').text()).toEqual('Counter: 1');
  });

  test('single render with parent props', () => {
    const Base = {
      name: 'Base',

      props: ['counter', 'foo'],

      render(h) {
        return h(
          'span',
          null,
          `Counter: ${this.counter}, Foo: ${this.foo}`,
        );
      },
    };

    const P = withProps({
      counter: 1,
    });

    const Enhanced = attach(P)(Base);

    const Root = {
      name: 'Root',

      provide: {
        proppy: {},
      },

      render(h) {
        return h(Enhanced, {
          props: {
            foo: 'foo value',
          },
        });
      },
    };

    const wrapper = mount(Root);
    expect(wrapper.find('span').text()).toEqual('Counter: 1, Foo: foo value');
  });

  test('single render while accessing providers', () => {
    const Base = {
      name: 'Base',

      props: ['counter', 'bar'],

      render(h) {
        return h(
          'span',
          null,
          `Counter: ${this.counter}, Bar: ${this.bar}`,
        );
      },
    };

    const P = withProps((props, providers) => {
      return {
        counter: 1,
        bar: providers.bar,
      };
    });

    const Enhanced = attach(P)(Base);

    const Root = {
      name: 'Root',

      provide: {
        proppy: {
          bar: 'bar value',
        },
      },

      render(h) {
        return h(Enhanced, null);
      },
    };

    const wrapper = mount(Root);
    expect(wrapper.find('span').text()).toEqual('Counter: 1, Bar: bar value');
  });

  test('re-renders based on own updates', () => {
    const Base = {
      name: 'Base',

      props: ['counter', 'setCounter'],

      render(h) {
        return h(
          'div',
          null,
          [h(
            'p',
            null,
            ['Counter: ', this.counter]
          ), h(
            'button',
            {
              on: {
                click: () => {
                  return this.setCounter(this.counter + 1);
                }
              }
            },
            ['Increment']
          )]
        );
      },
    };

    const P = withState('counter', 'setCounter', 0);

    const Enhanced = attach(P)(Base);

    const Root = {
      name: 'Root',

      provide: {
        proppy: {},
      },

      render(h) {
        return h(Enhanced, null);
      },
    };

    const wrapper = mount(Root);
    expect(wrapper.find('p').text()).toEqual('Counter: 0');

    wrapper.find('button').trigger('click');
    expect(wrapper.find('p').text()).toEqual('Counter: 1');
  });

  test('re-renders based on parent updates', () => {
    const Base = {
      name: 'Base',

      props: ['counter'],

      render(h) {
        return h(
          'p',
          null,
          ['Counter: ', this.counter]
        );
      },
    };

    const P = withState('counter', 'setCounter', 0);

    const Enhanced = attach(P)(Base);

    const Root = {
      name: 'Root',

      provide: {
        proppy: {},
      },

      data() {
        return {
          counter: 0,
        };
      },

      methods: {
        setCounter(n) {
          this.counter = n;
        },
      },

      render(h) {
        return h(
          'div',
          null,
          [h(
            'button',
            {
              on: {
                click: () => {
                  return this.setCounter(this.counter + 1);
                }
              }
            },
            ['Increment']
          ), h(
            Enhanced,
            {
              attrs: { counter: this.counter }
            },
            []
          )]
        );
      },
    };

    const wrapper = mount(Root);
    expect(wrapper.find('p').text()).toEqual('Counter: 0');

    wrapper.find('button').trigger('click');
    expect(wrapper.find('p').text()).toEqual('Counter: 1');
  });
});
