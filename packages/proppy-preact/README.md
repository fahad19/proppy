# proppy-preact

[![npm](https://img.shields.io/npm/v/proppy-preact.svg)](https://www.npmjs.com/package/proppy-preact)

> Preact integration package for ProppyJS

<!-- MarkdownTOC autolink=true bracket=round -->

- [Guide](#guide)
  - [Installation](#installation)
  - [Usage](#usage)
- [API](#api)
  - [ProppyProvider](#proppyprovider)
  - [attach](#attach)

<!-- /MarkdownTOC -->

---

# Guide

## Installation

With [npm](https://www.npmjs.com/):

```
$ npm install --save proppy preact proppy-preact
```

Via [unpkg](https://unpkg.com) CDN:

```html
<script src="https://unpkg.com/proppy@latest/dist/proppy.min.js"></script>
<script src="https://unpkg.com/proppy-preact@latest/dist/proppy-preact.min.js"></script>

<script>
  // available as `window.ProppyPreact`
</script>
```

## Usage

First, setup your root component with providers data:

```js
// components/Root.js
import { h } from 'preact';
import { ProppyProvider } from 'proppy-preact';

import MyComponent from './MyComponent';

const providers = {
  foo: 'foo value',
};

export default function Root() {
  return (
    <ProppyProvider providers={providers}>
      <MyComponent />
    </ProppyProvider>
  );
}
```

Now anywhere from your components tree, you can use the `attach` higher-order component:

```js
// components/MyComponent.js
import { h } from 'preact';
import { compose, withProps } from 'proppy';
import { attach } from 'proppy-preact';

const P = compose(
  withProps((props, providers) => ({
    foo: providers.foo,
  })),
  withProps({ bar: 'bar value' }),
);

function MyComponent(props) {
  const { foo, bar } = props;

  return <p></p>;
}

export default attach(P)(MyComponent);
```

# API

## ProppyProvider

For setting providers at Preact's context-level.

**Example:**

```js
import { h } from 'preact';
import { ProppyProvider } from 'proppy-preact';

export default function Root() {
  return (
    <ProppyProvider providers={providers}>
      <SomeOtherComponent />
    </ProppyProvider>
  );
}
```

## attach

> attach(P)(Component)

Higher-order component for attaching your Proppy factory to your Component.
