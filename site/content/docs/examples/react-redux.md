---
title: "Example: React + Redux with and without Proppy"
sidebarPartial: docsSidebar
---

# Example: React + Redux with and without Proppy

<!-- MarkdownTOC autolink=true bracket=round -->

- [Without Proppy](#without-proppy)
  - [Store as a provider](#store-as-a-provider)
  - [Connect HoC](#connect-hoc)
- [With Proppy](#with-proppy)
  - [Set store as a provider](#set-store-as-a-provider)
  - [Attach HoC](#attach-hoc)

<!-- /MarkdownTOC -->

A basic example of a React component:

* Showing `counter` coming from Redux store
* An `Increment` button dispatching an action creator
* Re-rendering on state changes only if `counter` is an even number

## Without Proppy

### Store as a provider

```js
// components/Root.js
import React from 'react';
import { Provider } from 'react-redux';

import MyComponent from './MyComponent';

const store = reduxStore;

export default function Root() {
  return (
    <Provider store={store}>
      <MyComponent />
    </Provider>
  )
}
```

### Connect HoC

```js
// components/MyComponent.js
import React from 'react';
import { connect } from 'react-redux';

import { incrementCounter } from '../actions/counter';

class MyComponent extends React.Component {
  // re-render only if `counter` is an even number
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.counter % 2 !== 0) {
      return false;
    }

    return true;
  }

  render() {
    const { counter, increment } = this.props;

    return (
      <div>
        <p>Counter: {counter}</p>

        <button onClick={increment}>
          Increment
        </button>
      </div>
    );
  }
}

function mapState(state) {
  return {
    counter: state.counter.value
  };
}

const mapDispatch = {
  increment: incrementCounter
};

export default connect(mapState, mapDispatch)(MyComponent);
```

## With Proppy

Using `proppy-redux` package:

### Set store as a provider

```js
// components/Root.js
import React from 'react';
import { ProppyProvider } from 'proppy-react';

import MyComponent from './MyComponent';

const providers = {
  store: reduxStore
};

export default function Root() {
  return (
    <ProppyProvider providers={providers}>
      <MyComponent />
    </ProppyProvider>
  )
}
```

### Attach HoC

Apply the `attach` higher-order component:

```js
// components/MyComponent.js
import React from 'react';
import { compose, shouldUpdate } from 'proppy';
import { withStore } from 'proppy-redux';
import { attach } from 'proppy-react';

import { incrementCounter } from '../actions/counter';

const P = compose(
  withStore(
    state => ({ counter: state.counter.value }),
    { increment: incrementCounter }
  ),
  shouldUpdate((prevProps, nextProps) => nextProps.counter % 2 === 0)
);

function MyComponent({ counter, increment }) {
  return (
    <div>
      <p>Counter: {counter}</p>

      <button onClick={increment}>
        Increment
      </button>
    </div>
  );
}

export default attach(P)(MyComponent);
```
