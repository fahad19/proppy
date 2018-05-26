# proppy-react

[![npm](https://img.shields.io/npm/v/proppy-react.svg)](https://www.npmjs.com/package/proppy-react)

> React integration package for ProppyJS

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
$ npm install --save proppy react proppy-react
```

Via [unpkg](https://unpkg.com) CDN:

```html
<script src="https://unpkg.com/proppy@latest/dist/proppy.min.js"></script>
<script src="https://unpkg.com/proppy-react@latest/dist/proppy-react.min.js"></script>

<script>
  // available as `window.ProppyReact`
</script>
```

## Usage

First, setup your root component with providers data:

```js
// components/Root.js
import React from 'react';
import { ProppyProvider } from 'proppy-react';

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
import React from 'react';
import { compose, withProps } from 'proppy';
import { attach } from 'proppy-react';

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

For setting providers at React's context-level.

**Example:**

```js
import React from 'react';
import { ProppyProvider } from 'proppy-react';

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
