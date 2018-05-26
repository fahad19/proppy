/* global describe, test, expect */
import { withObservable } from './withObservable';
import { Observable } from 'rxjs';

describe('proppy :: withObservable', () => {
  test('is a function', () => {
    expect(typeof withObservable).toEqual('function');
  });

  test('subscription', () => {
    expect.assertions(2);

    const P = withObservable(() => new Observable(observer => {
      observer.next({
        foo: 'foo value',
      });
      observer.complete();
    }));
    const p = P();

    expect(p.props).toEqual({});

    p.subscribe(props => {
      expect(props).toEqual({
        foo: 'foo value',
      });
    });
  });
});
