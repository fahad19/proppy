---
title: Factory & Instance
sidebarPartial: docsSidebar
---

# Factory & Instance

<!-- MarkdownTOC autolink=true bracket=round -->

- [Factory](#factory)
- [Instance](#instance)

<!-- /MarkdownTOC -->

## Factory

Proppy factories are functions that return you the Proppy instance.

The factories optionally accept a common `providers` object which can be used by the instances as they see fit.

In the example below, `P` is a factory:

```js
const P = function (providers = {}) {
  return instance;
}
```

We will learn about the API of the instance below:

## Instance

Proppy instances allow you to access the props both synchronously, as well as asynchronously via subscription:

```js
const p = P();

// current props (synchronous)
console.log(p.props);

// subscription (asynchronous)
// will emit as many times the props get updated
const unsubscribe = p.subscribe(props => console.log(props));
unsubscribe();

// destroy
// all listeners are unsubscribed and internal state is cleared
p.destroy();
```

The library itself is unopinionated how you implement your factories and instances yourself. But it comes with a handy [`create`](../packages/proppy#create) function that helps you to create your own instances quickly.

It's best if you read the [quick start](../quickstart) guide next.
