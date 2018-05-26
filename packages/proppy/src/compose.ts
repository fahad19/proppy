import { Proppy, ProppyFactory, Providers } from './types';

export function compose(...funcs): ProppyFactory {
  if (funcs.length === 0) {
    throw new Error('Cannot compose without any ProppyJS factories');
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return function (providers: Providers = {}, parent: Proppy|null = null) {
    let f = funcs[0](providers, parent);

    for (let i = 1; i < funcs.length; i++) {
      f = funcs[i](providers, f);
    }

    return f;
  };
}
