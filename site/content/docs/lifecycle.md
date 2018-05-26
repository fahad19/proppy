---
title: Lifecycle
sidebarPartial: docsSidebar
---

# Lifecycle

<!-- MarkdownTOC autolink=true bracket=round -->

- [withProps](#withprops)
- [didSubscribe](#didsubscribe)
- [handleReceivedProps](#handlereceivedprops)
- [shouldUpdate](#shouldupdate)
- [willDestroy](#willdestroy)

<!-- /MarkdownTOC -->

The core [`proppy`](../packages/proppy) package also ships with handy lifecycle functions that you can compose your props with.

Here's a small table listing equivalent lifecycle functions compared to that of React and Vue.js:

| Proppy                | React / Preact              | Vue.js          |
|-----------------------|-----------------------------|-----------------|
| [withProps]           | `constructor`               | `beforeCreate`  |
| [didSubscribe]        | `componentDidMount`         | `mounted`       |
| [handleReceivedProps] | `componentWillReceiveProps` |                 |
| [shouldUpdate]        | `shouldComponentUpdate`     |                 |
| [willDestroy]         | `componentWillUnmount`      | `beforeDestroy` |

[withProps]: ../packages/proppy#withprops
[didSubscribe]: ../packages/proppy#didsubscribe
[handleReceivedProps]: ../packages/proppy#handlereceivedprops
[shouldUpdate]: ../packages/proppy#shouldupdate
[willDestroy]: ../packages/proppy#willdestroy

## withProps

Will be called when Component is initialized, and meant to be used for **synchronous operations** only.

```js
import { compose, withProps } from 'proppy';

const P = compose(
  withProps({ foo: 'initial value of foo' }),
  withProps((props, providers) => {
    return { bar: 'initial value of bar' };
  })
);
```

If you are using React, this will be executed during server-side rendering as well.

## didSubscribe

Executes as soon as the first subscription to the Proppy instance has taken place.

```js
import { compose, withState, didSubscribe } from 'proppy';

const P = compose(
  withState('counter', 'setCounter', 0),
  didSubscribe((props, providers) => {
    // set `counter` to 5 immediately
    props.setCounter(5);

    // optionally return a function
    // that will be called when instance is destroyed
    return () => {};
  })
);
```

If you can using React, this will not be called during server-side rendering.

This is a good place to fetch something from the server for example.

## handleReceivedProps

When you compose with multiple Proppy factories, you have a choice on how to pass props coming from previous factory to the next one.

```js
import { compose, withProps, handleReceivedProps } from 'proppy';

const P = compose(
  withProps({ foo: 'foo value' }),

  // everything above this line is ignored now
  handleReceivedProps(false),

  withProps({ bar: 'bar value' })
);

const p = P();
console.log(p.props);
// {
//   bar: 'bar value'
// }
```

By default, all props are passed to the next factory.

## shouldUpdate

This lifecycle function can be used to control whether or not to emit the props to subscribers.

Imagine you want to emit props further only if the `counter` value is an even number:

```js
import { compose, withState, shouldUpdate } from 'proppy';

const P = compose(
  withState('counter', 'setCounter', 0),
  shouldUpdate((prevProps, nextProps) => {
    if (nextProps.counter % 2 === 0) {
      return true;
    }

    // returning false will stop emitting the props further
    return false;
  })
);
```

## willDestroy

Will be called right before the Proppy instance is destroyed.

```js
import { compose, withProps, willDestroy } from 'proppy';

const P = compose(
  withProps({ foo: 'foo value' }),
  willDestroy((props, providers) => {
    console.log('about to be destroyed!');
  })
);
```
