import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { List } from '../models/list';
import { Api } from './api/api';

@Injectable()
export class Lists {

  private lists: List[];

  constructor(public api: Api) {

    // get lists

  }

  query(force?: boolean) {
    if (!force)
      return Observable.of(this.lists);

    return this.api.get('/lists');
  }

  getById(id: any, force?: boolean) {
    if (!force)
      return Observable.of(this.lists.filter((l) => l.id == id));

    return this.api.get('/lists/'+id);
  }

  add(list: List) {
  }

  edit(list: List) {
  }

  delete(list: List) {
  }

}
