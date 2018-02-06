import { Injectable } from '@angular/core';

import { List } from '../models/list';
import { Api } from './api/api';

@Injectable()
export class Lists {

  constructor(public api: Api) { }

  query(params?: any) {
    return this.api.get('/lists', params);
  }

  getById(id: any, params?: any) {
    return this.api.get('/lists/'+id, params);
  }

  add(list: List) {
  }

  edit(list: List) {
  }

  delete(list: List) {
  }

}
