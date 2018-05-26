# proppy-rx

[![npm](https://img.shields.io/npm/v/proppy-rx.svg)](https://www.npmjs.com/package/proppy-rx)

> RxJS integration package for ProppyJS

<!-- MarkdownTOC autolink=true bracket=round -->

- [Guide](#guide)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Interop with RxJS](#interop-with-rxjs)
- [API](#api)
  - [withStream](#withstream)
  - [from](#from)

<!-- /MarkdownTOC -->

---

# Guide

## Installation

With [npm](https://www.npmjs.com/):

```
$ npm install --save proppy rxjs proppy-rx
```

Via [unpkg](https://unpkg.com) CDN:

```html
<script src="https://unpkg.com/proppy@latest/dist/proppy.min.js"></script>
<script src="https://unpkg.com/proppy-rx@latest/dist/proppy-rx.min.js"></script>

<script>
  // available as `window.ProppyRx`
</script>
```

## Usage

With the `withStream` function, you can map an incoming stream of props and return a new stream:

```js
import { compose, withProps } from 'proppy';
import { withStream } from 'proppy-rx';
import { map } from 'rxjs/operators';

const P = compose(
  withProps({ foo: 'foo value' }),
  withStream((props$, providers) => {
    // `props$` is an Observable here

    // let's now return a stream of props here
    return props$.pipe(
      map(props => props),
    );
  }),
);
```

## Interop with RxJS

You can also convert your instance to a props stream using RxJS:

```js
import { from } from 'proppy-rx';

const props$ = from(p);
```


# API

## withStream

> withStream((props$, providers) => props$)

Used for taking an incoming stream of props, and returning a new stream.

## from

> from(p)

Returns an Observable of props.
