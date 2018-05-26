import { ProppyFactory, create } from 'proppy';
import { of } from 'rxjs';

import { from } from './from';

const defaultOptions = {
  replace: false,
};

export function withStream(fn, givenOptions = {}): ProppyFactory {
  const options = {
    ...defaultOptions,
    ...givenOptions,
  };

  return create({
    initialize() {
      const parent$ = this.parent
        ? from(this.parent)
        : of({});

      this._$ = fn(parent$);
    },

    didSubscribe() {
      this._s = this._$.subscribe(props => {
        this.set(props, options.replace);
      });
    },

    willDestroy() {
      this._s.unsubscribe();
    },
  });
}
