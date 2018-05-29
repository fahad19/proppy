---
title: API
sidebarPartial: docsSidebar
---

# API

<!-- MarkdownTOC autolink=true bracket=round -->

- [Factory creators](#factory-creators)
- [Provider components](#provider-components)
- [Higher-order components](#higher-order-components)

<!-- /MarkdownTOC -->

API documentation for all the packages can be found in their own pages:

* [proppy]
* [proppy-react]
* [proppy-vue]
* [proppy-preact]
* [proppy-redux]
* [proppy-rx]

## Factory creators

These functions allow you to compose your factory:

```js
import { compose, withProps, withState } from 'proppy';

const myProviders = {};

// factory
const P = compose(
  withProps({ foo: 'foo value' }),
  withState('counter', 'setCounter', 0)
);

// instance
const p = P(myProviders);

console.log(p.props);
// {
//   foo: 'foo value',
//   counter: 0,
//   setCounter: Function
// }
```

| Function                                                        | Package            |                             |
|-----------------------------------------------------------------|--------------------|-----------------------------|
| [compose](../packages/proppy#compose)                           | [proppy]           | Composes multiple factories |
| [withProps](../packages/proppy#withprops)                       | [proppy]           | Synchronous props           |
| [withState](../packages/proppy#withstate)                       | [proppy]           | State with setter           |
| [withReducer](../packages/proppy#withreducer)                   | [proppy]           | Props via reducer functions |
| [withHandlers](../packages/proppy#withhandlers)                 | [proppy]           | Handlers for side effects   |
| [withStateHandlers](../packages/proppy#withstatehandlers)       | [proppy]           | State with handlers         |
| [withObservable](../packages/proppy#withobservable)             | [proppy]           | Props via Observable        |
| [withTimer](../packages/proppy#withtimer)                       | [proppy]           | Scheduled async props       |
| [emit](../packages/proppy#emit)                                 | [proppy]           | Emit props asynchronously   |
| [map](../packages/proppy#map)                                   | [proppy]           | Map props                   |
| [shouldUpdate](../packages/proppy#shouldupdate)                 | [proppy]           | [Lifecycle]                 |
| [didSubscribe](../packages/proppy#didsubscribe)                 | [proppy]           | [Lifecycle]                 |
| [willDestroy](../packages/proppy#willdestroy)                   | [proppy]           | [Lifecycle]                 |
| [handleReceivedProps](../packages/proppy#handlereceivedprops)   | [proppy]           | [Lifecycle]                 |
| [create](../packages/proppy#create)                             | [proppy]           | Creates factory generators  |
| [withStore](../packages/proppy-redux#withstore)                 | [proppy-redux]     | Redux integration           |
| [withStream](../packages/proppy-rx#withstream)                  | [proppy-rx]        | RxJS integration            |

## Provider components

These components help set application-wide providers.

```js
// components/Root.js
import React from 'react';
import { ProppyProvider } from 'proppy-react';

const myProviders = {};

export default function Root() {
  return (
    <ProppyProvider providers={myProviders}>
      <MyOtherComponent />
    </ProppyProvider>
  );
}
```

Vue.js doesn't require this since you can use their provide/inject API. See [proppy-vue](../packages/proppy-vue) for more info.

| Component                                                       | Package            |                           |
|-----------------------------------------------------------------|--------------------|---------------------------|
| [ProppyProvider](../packages/proppy-react#proppyprovider)       | [proppy-react]     | React.js integration      |
| [ProppyProvider](../packages/proppy-preact#proppyprovider)      | [proppy-preact]    | Preact integration        |

## Higher-order components

These functions are used to connect your ProppyJS factory to your Components:

<div class="tabs for-snippet is-boxed">
  <ul>
    <li class="is-active">
      <a href="#hoc-react">
        <span>React</span>
      </a>
    </li>
    <li>
      <a href="#hoc-preact">
        <span>Preact</span>
      </a>
    </li>
    <li>
      <a href="#hoc-vue">
        <span>Vue.js</span>
      </a>
    </li>
  </ul>
</div>

<div class="snippet-contents">

<pre id="hoc-react" class="language-js">
```
import React from 'react';
import { compose, withProps, withState } from 'proppy';
import { attach } from 'proppy-react';

const P = compose(
  withProps({ foo: 'foo value' }),
  withState('counter', 'setCounter', 0)
);

function MyComponent({ foo, counter, setCounter }) {
  return (
    <div>
      <p>Counter: {counter}</p>

      <button onClick={() => setCounter(counter + 1)}>
        Increment
      </button>
    </div>
  );
}

export default attach(P)(MyComponent);
```
</pre>

<pre id="hoc-preact" class="language-js">
```
import { h } from 'preact';
import { compose, withProps, withState } from 'proppy';
import { attach } from 'proppy-preact';

const P = compose(
  withProps({ foo: 'foo value' }),
  withState('counter', 'setCounter', 0)
);

function MyComponent({ foo, counter, setCounter }) {
  return (
    <div>
      <p>Counter: {counter}</p>

      <button onClick={() => setCounter(counter + 1)}>
        Increment
      </button>
    </div>
  );
}

export default attach(P)(MyComponent);
```
</pre>

<pre id="hoc-vue" class="language-js">
```
import { compose, withProps, withState } from 'proppy';
import { attach } from 'proppy-vue';

const P = compose(
  withProps({ foo: 'foo value' }),
  withState('counter', 'setCounter', 0)
);

const MyComponent = {
  props: ['foo', 'counter', 'setCounter'],

  render(h) {
    return (
      <div>
        <p>Counter: {counter}</p>

        <button onClick={() => setCounter(counter + 1)}>
          Increment
        </button>
      </div>
    );
  }
};

export default attach(P)(MyComponent);
```
</pre>

</div>

| HoC                                                             | Package            |                           |
|-----------------------------------------------------------------|--------------------|---------------------------|
| [attach](../packages/proppy-react#attach)                       | [proppy-react]     | React.js integration      |
| [attach](../packages/proppy-vue#attach)                         | [proppy-vue]       | Vue.js integration        |
| [attach](../packages/proppy-preact#attach)                      | [proppy-preact]    | Preact integration        |

[proppy]: ../packages/proppy#api
[proppy-react]: ../packages/proppy-react#api
[proppy-vue]: ../packages/proppy-vue#api
[proppy-preact]: ../packages/proppy-preact#api
[proppy-redux]: ../packages/proppy-redux#api
[proppy-rx]: ../packages/proppy-rx#api
[proppy-frint-react]: ../packages/proppy-frint-react#api

[Lifecycle]: ../lifecycle
