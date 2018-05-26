/* global describe, test, expect */
import { createStore, combineReducers } from 'redux';

import { withStore } from './withStore';

describe('proppy-redux :: withStore', () => {
  test('is a function', () => {
    expect(typeof withStore).toEqual('function');
  });

  test('updates', () => {
    // constants
    const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
    const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

    // actions
    function incrementCounter() {
      return {
        type: INCREMENT_COUNTER
      };
    }
    function decrementCounter() {
      return {
        type: DECREMENT_COUNTER
      };
    }
    // reducers
    const INITIAL_STATE = {
      value: 0
    };

    function counterReducer(state = INITIAL_STATE, action) {
      switch (action.type) {
        case INCREMENT_COUNTER:
          return Object.assign({}, {
            value: state.value + 1
          });
        case DECREMENT_COUNTER:
          return Object.assign({}, {
            value: state.value - 1
          });
        default:
          return state;
      }
    }

    const rootReducer = combineReducers({
      counter: counterReducer,
    });

    const store = createStore(rootReducer);

    const P = withStore(
      state => ({ counter: state.counter.value }),
      {
        increment: incrementCounter,
        decrement: decrementCounter,
      },
    );
    const p = P({
      store,
    });

    expect(p.props.counter).toEqual(0);
    expect(typeof p.props.increment).toEqual('function');
    expect(typeof p.props.decrement).toEqual('function');

    p.subscribe(() => {});

    p.props.increment();
    p.props.increment();

    expect(p.props.counter).toEqual(2);

    p.props.decrement();

    expect(p.props.counter).toEqual(1);
  });
});
