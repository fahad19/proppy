# proppy

[![npm](https://img.shields.io/npm/v/proppy.svg)](https://www.npmjs.com/package/proppy)

> Functional props composition for components

<!-- MarkdownTOC autolink=true bracket=round -->

- [Guide](#guide)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Single functions](#single-functions)
    - [Composition](#composition)
    - [Providers](#providers)
    - [Subscription](#subscription)
- [API](#api)
  - [withProps](#withprops)
  - [withState](#withstate)
  - [compose](#compose)
  - [withReducer](#withreducer)
  - [withHandlers](#withhandlers)
  - [withStateHandlers](#withstatehandlers)
  - [withObservable](#withobservable)
  - [withTimer](#withtimer)
  - [onChange](#onchange)
  - [map](#map)
  - [shouldUpdate](#shouldupdate)
  - [didSubscribe](#didsubscribe)
  - [willDestroy](#willdestroy)
  - [emit](#emit)
  - [handleReceivedProps](#handlereceivedprops)
  - [create](#create)

<!-- /MarkdownTOC -->

---

# Guide

## Installation

With [npm](https://www.npmjs.com/):

```
$ npm install --save proppy
```

Via [unpkg](https://unpkg.com) CDN:

```html
<script src="https://unpkg.com/proppy@latest/dist/proppy.min.js"></script>

<script>
  // available as `window.Proppy`
</script>
```

## Usage

### Single functions

Let's first import a function of our choice:

```js
import { withState } from 'proppy';
```

Now we can create our factory:

```js
const P = withState('counter', 'setCounter', 0);
```

The factory function can now be called to get the instance:

```js
const p = P();
```

Accessing props:

```js
console.log(p.props);
// { counter: 0, setCounter: Function }

p.props.setCounter(5);

console.log(p.props.counter);
// 5
```

Destroying the instance:

```js
p.destroy();
```

### Composition

You can also compose multiple factories together using the `compose` function:

```js
import { compose, withProps, withState } from 'proppy';

const P = compose(
  withProps({ foo: 'foo value' }),
  withState('counter', 'setCounter', 0),
  withState('age', 'setAge', 20),
);
```

You can now get your instance by calling the returned function:

```js
const p = P();

console.log(p.props);
// {
//   foo: 'foo value',
//
//   counter: 0,
//   setCounter: Function,
//
//   age: 20,
//   setAge: Function
// }
```

### Providers

Providers are values which are made accessible to instances.

When we call our factory function to get the instance, we can optionally pass an object that will contain all our providers:

```js
import { compose, withProps } from 'proppy';

const P = compose(
  // value already known
  withprops({
    foo: 'foo value',
  }),

  // value will be obtained from providers
  withProps((props, providers) => ({
    // `props` is `{ foo: 'foo value' }` here
    bar: providers.bar,
  }),
);
```

Now we can pass the `providers` object when calling `P`:

```js
const p = P({
  bar: 'bar value',
});

console.log(p.props);
// {
//   foo: 'foo value',
//   bar: 'bar value',
// }
```

### Subscription

Subscribing to props changes:

```js
const unsubscribe = p.subscribe(props => console.log(props));
```

To Unsubscribe:

```js
unsubscribe();
```

# API

## withProps

> withProps(props)

> withProps((currentProps, providers) => props)

Used for generating initial props.

**Examples:**

Directly passing the props object:

```js
const P = withProps({ foo: 'foo value' });
```

Returning the props from a function:

```js
const P = withProps((currentProps, providers) => {
  return {
    foo: 'foo value'
  };
});
```

## withState

> withState(stateName, setterName, initialState)

Used for state management.

**Examples:**

```js
const P = withState('counter', 'setCounter', 0);
```

## compose

> compose(...factories)

Used for composing multiple factories into a single one.

**Examples:**

```js
const P = compose(
  withProps({ foo: 'foo value '}),
  withprops({ bar: 'bar value' }),
  withState('counter', 'setCounter', 0),
);
```

## withReducer

> withReducer(stateName, dispatcherNAme, reducer, initialState)

For generating props via reducer functions.

**Arguments:**

1. `stateName` (`String`): Name of the prop where state will be set
1. `dispatcherName` (`String`): Name of the prop for setting dispatch function
1. `reducer` (`Function`): Accepting `(state, action)`, and returning new state
1. `initialState` (`Any`): Initial state to begin with

**Example:**

```js
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 };
    case 'DECREMENT':
      return { value: state.value - 1 };
    default:
      return state;
  }
}

const P = withReducer('counter', 'dispatch', reducer, { value: 0 });
const p = P();

p.dispatch({ type: 'INCREMENT' });
console.log(p.props.counter) // { value: 1 }
```

You can also pass functions to `dispatch`:

```js
p.dispatch(function (props, providers) {
  return { type: 'INCREMENT' };
});
```

## withHandlers

> withHandlers(handlers)

Used for handling side-effects.

**Examples:**

Basic handler:

```js
const P = withHandlers({
  handleFoo: (props, providers) => () => console.log('handling foo!')
});
```

A better example with composition:

```js
const P = compose(
  withState('counter', 'setCounter', 0),
  withHandlers({
    incrementBy: (props, providers) => (n) => {
      props.setCounter(props.counter + n);
    },
  }),
);

const p = P();

p.incrementBy(1);
console.log(p.props.counter); // 1
```

## withStateHandlers

> withStateHandlers(initialState, handlers)

Used for state management via handlers.

**Examples:**

```js
const P = withStateHandlers(
  // initial state
  {
    counter: 0,
  },

  // handlers
  {
    incrementBy: (props, providers) => (n) => {
      // return new state
      return {
        counter: props.counter + n,
      };
    }
  }
);

const p = P();
p.incrementBy(5);
p.incrementBy(5);
console.log(p.props.counter); // 10
```

## withObservable

> withObservable((props, providers) => props$)

Used for returning an Observable of props.

**Examples:**

```js
import { of } from 'rxjs';

const P = withObservable((props, providers) => {
  return of({
    foo: 'foo value',
  });
});
```

For advanced usage, look into [`proppy-rx`](/docs/packages/proppy-rx) package, where you can also access incoming props as an Observable.

## withTimer

> withTimer(timer, props)

> withTimer(timer, (props, providers) => props)

Sets props after timer has elapsed.

**Examples:**

```js
// prop `foo` is set after 1 second
const P = withTimer(1000, { foo: 'foo value' });
```

Accessing current props and providers:

```js
const P = withTimer(100, (props, providers) => ({
  foo: 'foo value',
}));
```

## onChange

> onChange(propName, (prop, providers) => props)

> onChange(
>   (prevProps, nextProps) => true,
>   (props, providers) => props
> )

> onChange(
>   propName,
>   (props, providers, cb) => void
> )

Detect a change in props, and return new props.

**Examples:**

Change `foo`, when `counter` changes:

```js
const P = compose(
  withProps({ foo: 'initial foo value' })
  withState('counter', 'setCounter', 0),
  onChange('counter', (props, providers) => ({
    foo: `changed foo with counter ${props.counter}`
  }))
);

const p = P();
console.log(p.props.foo); // `initial foo value`

p.props.setCounter(10);
console.log(p.props.foo); // `changed foo with counter 10`
```

Detecting complex changes:

```js
const P = compose(
  withState('counter', 'setCounter', 0),
  onChange(
    // detect
    (prevProps, nextProps) => true,

    // return props
    (props, providers) => props
  )
);
```

Returning async props:

```js
const P = compose(
  withState('counter', 'setCounter', 0),
  onChange(
    // detect
    (prevProps, nextProps) => true,

    // return props by callback
    (props, providers, cb) => {
      cb(props);
    }
  )
);
```

## map

> map((props, providers) => props)

Used for mapping incoming props to returned props.

**Examples:**

```js
const P = compose(
  withProps({ foo: 'foo value' }),
  map(props => ({ foo: props.foo.toUpperCase() })),
);
```

## shouldUpdate

> shouldUpdate((prevProps, nextProps, providers) => true)

Used for limiting the events

**Examples:**

```js
const P = compose(
  withState('counter', 'setCounter', 0),
  shouldUpdate((prevProps, nextProps) => {
    // emit further only if counter is an even number
    return nextProps.counter % 2 === 0;
  });
);
```

## didSubscribe

> didSubscribe((props, providers) => {})

For handling side-effects upon first subscription.

**Examples:**

```js
const P = didSubscribe((props, providers) => {
  // do something

  // optionally return a function
  // that will be called when instance is destroyed
  return () => {};
})
```

## willDestroy

> willDestroy((props, providers) => {})

For handling side-effects when instance is destroyed.

## emit

> emit((cb, props, providers) => {})

For emitting new props after subscription.

**Examples:**

```js
const P = emit((cb, props, providers) => {
  cb({ foo: 'foo value' });

  // optionally return a function
  // that will be called when instance is destroyed
  return () => {};
});
```

## handleReceivedProps

> handleReceivedProps(true|false)

> handleReceivedProps((receivedProps) => {})

Accept props coming from parent instances.

## create

> create(options)

Convenience function for creating your own functions, that can return factories.

All the other functions in this library are built by using this `create` function internally.

**Arguments:**

* `options.initialize` (`Function`)
* `options.didSubscribe` (`Function`)
* `options.willDestroy` (`Function`)
* `options.handleReceivedProps` (`Boolean`|`Function`)

**Examples:**

A producer of props:

```js
function withFoo() {
  return create({
    initialize() {
      // has access to:
      //   - this.props
      //   - this.providers

      this.set({
        foo: 'foo value',
      });
    }
  });
}
```

A mapper of props:

```js
function capitalizeFoo() {
  return create({
    handleReceivedProps(receivedProps) {
      this.set({
        ...receivedProps,
        foo: typeof receivedProps.foo !== 'undefined'
          ? receivedProps.foo.toUpperCase()
          : undefined,
      })
    }
  });
}
```
