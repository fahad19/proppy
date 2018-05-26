# proppy-vue

[![npm](https://img.shields.io/npm/v/proppy-vue.svg)](https://www.npmjs.com/package/proppy-vue)

> React integration package for ProppyJS

<!-- MarkdownTOC autolink=true bracket=round -->

- [Guide](#guide)
  - [Installation](#installation)
  - [Usage](#usage)
- [API](#api)
  - [attach](#attach)

<!-- /MarkdownTOC -->

---

# Guide

## Installation

With [npm](https://www.npmjs.com/):

```
$ npm install --save proppy vue proppy-vue
```

Via [unpkg](https://unpkg.com) CDN:

```html
<script src="https://unpkg.com/proppy@latest/dist/proppy.min.js"></script>
<script src="https://unpkg.com/proppy-vue@latest/dist/proppy-vue.min.js"></script>

<script>
  // available as `window.ProppyVue`
</script>
```

## Usage

Render your Vue.js app with providers data:

```js
// index.js
import Vue from 'vue';

import MyComponent from './components/MyComponent';

const providers = {
  foo: 'foo value',
};

const app = new Vue({
  provide: {
    proppy: providers,
  },

  render(h) {
    return <MyComponent />;
  },
});
```

Now anywhere from your components tree, you can use the `attach` higher-order component:

```js
// components/MyComponent.js
import { compose, withProps } from 'proppy';
import { attach } from 'proppy-vue';

const P = compose(
  withProps((props, providers) => ({
    foo: providers.foo,
  })),
  withProps({ bar: 'bar value' }),
);

const MyComponent = {
  name: 'MyComponent',

  props: ['foo', 'bar'],

  render(h) {
    const { foo, bar } = this;

    return <p></p>;
  },
};

export default attach(P)(MyComponent);
```

# API

## attach

> attach(P)(Component)

Higher-order component for attaching your Proppy factory to your Component.
