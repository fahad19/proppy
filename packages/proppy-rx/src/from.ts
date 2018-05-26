import { Proppy } from 'proppy';
import { Observable } from 'rxjs';

export function from(p: Proppy) {
  return new Observable((observer) => {
    return p.subscribe(props => observer.next(props));
  });
}
