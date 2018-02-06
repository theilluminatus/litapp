import { Injectable } from '@angular/core';

import { List } from '../../models/list';

@Injectable()
export class Lists {
  lists: List[] = [];

  constructor() {
    let lists = [
      {
        "name": "Favourites",
        "description": "heart."
      },
      {
        "name": "ToRead",
        "description": "Waiting."
      },
      {
        "name": "Read",
        "description": "All stories."
      },
    ];

    for (let list of lists) {
      this.lists.push(new List(list));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.lists;
    }

    return this.lists.filter((list) => {
      for (let key in params) {
        let field = list[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return list;
        } else if (field == params[key]) {
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
