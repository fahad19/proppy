---
title: Providers
sidebarPartial: docsSidebar
---

# Providers

Providers are common stateful dependencies for your whole application.

A few examples of such providers include:

* Configuration
* [Redux](https://redux.js.org/) store
* Current theme
* ...more

The providers can be expressed in a single object here:

```js
const providers = {
  store: reduxStore,
  config: {},
  theme: 'light'
};
```

The idea is to share this single `providers` object globally in your application.
