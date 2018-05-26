---
title: Frequently Asked Questions
sidebarPartial: docsSidebar
---

# FAQ

<!-- MarkdownTOC autolink=true bracket=round -->

- [What is the primary feature of Proppy?](#what-is-the-primary-feature-of-proppy)
- [Can I use Proppy with React, Vue.js, and Preact?](#can-i-use-proppy-with-react-vuejs-and-preact)
- [Is Proppy a Redux alternative?](#is-proppy-a-redux-alternative)
- [Can I use RxJS with Proppy?](#can-i-use-rxjs-with-proppy)
- [Is there any cost in performance?](#is-there-any-cost-in-performance)

<!-- /MarkdownTOC -->

## What is the primary feature of Proppy?

It just helps you compose your props, that you can use anywhere later. Nothing more.

## Can I use Proppy with React, Vue.js, and Preact?

Yes! We have integrations for all of them:

* [`proppy-react`](../packages/proppy-react)
* [`proppy-vue`](../packages/proppy-vue)
* [`proppy-preact`](../packages/proppy-preact)

## Is Proppy a Redux alternative?

Not at all. We have an integration package for ease of Redux usage too: [`proppy-redux`](../packages/proppy-redux).

## Can I use RxJS with Proppy?

Absolutely! At the end of the day Proppy only composes props, and allows you to subscribe to them too.

RxJS fits in very nicely here. With [`proppy-rx`](../packages/proppy-rx) package, you have access to incoming props stream as an Observable, and you are in full control of what props get output via returning Obsevable.

## Is there any cost in performance?

When you use Proppy with any rendering library, you end up wrapping your base components with the `attach` higher-order component.

This means every time you use the `attach` higher-order component, you are creating one more stateful component which takes care of creating the Proppy instance internally and keep passing the generated props to the base component.

This layer of abstraction has its costs, because it is adding one more component to your tree. But at the same time, Proppy arms you with functions like `shouldUpdate` which helps you control when new props are passed down to your base component trigerring a re-render.

In the end, it can be considered that the benefits outweigh any performance cost that is introduced because of this additional component in your tree.
