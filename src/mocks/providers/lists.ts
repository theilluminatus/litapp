import { Injectable } from '@angular/core';

import { List } from '../../models/list';
import { deflists } from '../data';

@Injectable()
export class Lists {
  lists: List[];

  constructor() {
    this.lists = deflists;
  }

  query(params?: any) {
    if (!params) {
      return this.lists;
    }

    return this.lists.filter(list => {
      for (const key in params) {
        const field = list[key];
        if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return list;
        }
        if (field === params[key]) {
          return list;
        }
      }
      return null;
    });
  }

  getById(id: any) {
    return this.lists[0];
  }

  add(list: List) {
    this.lists.push(list);
  }

  edit(list: List) {
    this.lists.push(list);
  }

  delete(list: List) {
    this.lists.splice(this.lists.indexOf(list), 1);
  }
}
