import { Pipe } from '@angular/core';

@Pipe({
  name: 'reverse',
  pure: false
})
export class ReverseArrayPipe {
  transform (values) {
    if (values) {
      return values.slice().reverse();
    }
  }
}
