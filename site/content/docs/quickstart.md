---
title: Quick start
sidebarPartial: docsSidebar
---

# Quick start

<!-- MarkdownTOC autolink=true bracket=round -->

- [Installation](#installation)
- [Basics](#basics)
  - [Factories](#factories)
  - [Instances](#instances)
  - [Subscription](#subscription)
  - [Destroy](#destroy)
- [Dynamic props](#dynamic-props)
- [Composition](#composition)
- [Providers](#providers)
- [Rendering with React](#rendering-with-react)
  - [Set providers](#set-providers)
  - [Attach factory](#attach-factory)

<!-- /MarkdownTOC -->

## Installation

Let's first install the package with [`npm`](https://www.npmjs.com/):

```
$ npm install --save proppy
```

## Basics

### Factories

For the simplicity of this example, we can start with `withProps` function from [`proppy`](../packages/proppy) first:

```js
import { withProps } from 'proppy';

const P = withProps({ counter: 1 });
```

### Instances

Now we can get an instance from our factory funciton by calling it:

```js
const p = P();
```

To access the props synchronously:

```js
console.log(p.props); // { counter: 1 }
```

### Subscription

Given the nature of our instance having static props, if we subscribe to it, it will emit the props only once:

```js
const unsubscribe = p.subscribe(props => console.log(props));
// { counter: 1 }
```

To unsubscribe, just call the returned function:

```js
unsubscribe();
```

### Destroy

To cancel all listeners and clear the internal state, just call:

```js
p.destroy();
```

## Dynamic props

There are times when your props require a bit of interactivity. Imagine your component wants to render the current state of `counter`, but also want to be able to update the value?

We can achieve that using the `withState` function for example:

```js
import { withState } from 'proppy';

// withState(stateName, setterName, initialState)
const P = withState('counter', 'setCounter', 0);

const p = P();
```

Initially, the instance will only show you the default initial state for `counter`:

```js
console.log(p.props);
// { counter: 0, setCounter: Function }
```

But we can update it too:

```js
p.props.setCounter(5);

console.log(p.props);
// { counter: 5, setCounter: Function }
```

If you subscribed to the instance, it will keep emitting the new props every time a change occurs:

```js
p.subscribe(props => console.log(props));
// { counter: 0, setCounter: Function }
// { counter: 5, setCounter: Function }
```

## Composition

Proppy also ships with a handy `compose` function which allows you to compose multiple factories into a single one:

```js
import { compose, withProps, withState } from 'proppy';

const P = compose(
  withProps({ foo: 'foo value' }),
  withProps({ bar: 'bar value' }),
  withState('counter', 'setCounter', 0)
);
```

Once you create an instance, all the props from those factories will be accessible in a single object:

```js
const p = P();

console.log(p.props);
// {
//   foo: 'foo value',
//   bar: 'bar value',
//   counter: 0,
//   setCounter: Function
// }
```

## Providers

Providers are application-wide dependencies that all Proppy instances can access anywhere.

They are useful especially when you want to maintain them in a single place, but you want Components from anywhere to access them at will.

Imagine setting your application's name, in a providers object like this:

```js
const myProviders = {
  appName: 'My Super Awesome App!'
};
```

Now when composing your props with Proppy, you want to be able to access them:

```js
import { compose, withProps } from 'proppy';

const P = compose(
  withProps({ foo: 'foo value' }),

  // `withProps` can also generate props using a function
  withprops((props, providers) => {
    return {
      name: providers.appname
    };
  })
);

// pass `myProviders` when calling the factory
const p = P(myProviders);
```

Your Proppy instance now has these props:

```js
console.log(p.props);
// {
//   foo: 'foo value',
//   name: 'My Super Awesome App!'
// }
```

##  Rendering with React

Proppy integrates with React via [`proppy-react`](../packages/proppy-react) package.

You can install it with `npm` first:

```
$ npm install --save react proppy-react
```

### Set providers

Then we need to set our custom providers in our root React component:

```js
// components/Root.js
import React from 'react';
import { ProppyProvider } from 'proppy-react';

import Counter from './Counter';

const myProviders = {};

export default function Root() {
  return (
    <ProppyProvider providers={myProviders}>
      <Counter />
    </ProppyProvider>
  );
}
```

### Attach factory

Now from anywhere in our components tree, we can use the `attach` higher-order component to connect your Proppy factory to React component:

```js
// components/Counter.js
import React from 'react';
import { attach } from 'proppy-react';
import { compose, withProps, withState } from 'proppy';

const P = compose(
  withProps({ foo: 'foo value' }),
  withState('counter', 'setCounter', 0),
);

function Counter(props) {
  const { foo, counter, setCounter } = props;

  return (
    <div>
      <p>Foo: {foo}</p>

      <p>Counter: {counter}</p>

      <button onClick={() => setCounter(counter + 1)}>
        Increment
      </button>
    </div>
  );
}

export default attach(P)(Counter);
```

You can do the same with Vue.js and Preact too via [`proppy-vue`](../packages/proppy-vue) and [`proppy-preact`](../packages/proppy-preact) packages respectively.
