---
title: Introduction
sidebarPartial: docsSidebar
---

# Introduction

<!-- MarkdownTOC autolink=true bracket=round -->

- [What is ProppyJS?](#what-is-proppyjs)
- [Purpose](#purpose)
- [Packages](#packages)
- [Focus](#focus)
- [Inspiration](#inspiration)

<!-- /MarkdownTOC -->

## What is ProppyJS?

ProppyJS is a tiny `1.5kB` JavaScript library for composing props (object that components receive to render themselves).

The generated props can then be used in your favourite components-based UI framework (like React or Vue.js).

## Purpose

The primary purpose of this library is to **lift the state one level above** your UI components. So that your components are always stateless themselves, while you compose your props separately.

This helps keep your components layer functional and small, while giving you the flexibility to test your Components and the behaviour of their props differently as needed.

## Packages

| Package              | Status                                                     | Size    | Description               |
|----------------------|------------------------------------------------------------|---------|---------------------------|
| [proppy]             | [![proppy-status]][proppy-package]                         | `1.5K`  | Core package              |
| [proppy-react]       | [![proppy-react-status]][proppy-react-package]             | `1.0K`  | React integration         |
| [proppy-vue]         | [![proppy-vue-status]][proppy-vue-package]                 | `0.7K`  | Vue.js integration        |
| [proppy-preact]      | [![proppy-preact-status]][proppy-preact-package]           | `1.1K`  | Preact integration        |
| [proppy-redux]       | [![proppy-redux-status]][proppy-redux-package]             | `0.6K`  | Redux integration         |
| [proppy-rx]          | [![proppy-rx-status]][proppy-rx-package]                   | `0.6K`  | RxJS integration          |

[proppy]: ../packages/proppy
[proppy-react]: ../packages/proppy-react
[proppy-vue]: ../packages/proppy-vue
[proppy-preact]: ../packages/proppy-preact
[proppy-redux]: ../packages/proppy-redux
[proppy-rx]: ../packages/proppy-rx
[proppy-frint-react]: ../packages/proppy-frint-react

[proppy-status]: https://img.shields.io/npm/v/proppy.svg
[proppy-react-status]: https://img.shields.io/npm/v/proppy-react.svg
[proppy-vue-status]: https://img.shields.io/npm/v/proppy-vue.svg
[proppy-preact-status]: https://img.shields.io/npm/v/proppy-preact.svg
[proppy-redux-status]: https://img.shields.io/npm/v/proppy-redux.svg
[proppy-rx-status]: https://img.shields.io/npm/v/proppy-rx.svg
[proppy-frint-react-status]: https://img.shields.io/npm/v/proppy-frint-react.svg

[proppy-package]: https://npmjs.com/package/proppy
[proppy-react-package]: https://npmjs.com/package/proppy-react
[proppy-vue-package]: https://npmjs.com/package/proppy-vue
[proppy-preact-package]: https://npmjs.com/package/proppy-preact
[proppy-redux-package]: https://npmjs.com/package/proppy-redux
[proppy-rx-package]: https://npmjs.com/package/proppy-rx
[proppy-frint-react-package]: https://npmjs.com/package/proppy-frint-react

## Focus

There are already many framework-specific utility libraries out there. Proppy is different because it aims to stay agnostic of any specific framework, and maintain a small dependency-free core library.

It supports other frameworks via additional integration packages, which you can use as your application's requirements grow.

Proppy aims to only deal with the data layer, in the form of props composition. Either you want to use them in a ReactJS, Vue.js or a plain JavaScript application is totally up to you.

## Inspiration

Original inspiration for this project has been [`recompose`](https://github.com/acdlite/recompose) and [`frint-props`](https://github.com/frintjs/frint-props).
