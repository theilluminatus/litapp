import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { List } from '../models/list';
import { Story } from '../models/story';
import { Author } from '../models/author';
import { Stories } from './stories';
import { Api } from './api/api';

@Injectable()
export class Lists {

  private lists: List[];

  constructor(public api: Api, public s: Stories) { }


  query(force?: boolean) {
    if (!force && this.lists)
      return Observable.of(this.lists);

    let loader = this.api.showLoader();
    return this.api.get('my/api/lists',undefined,undefined,2).map((d: any) => {

      if (loader) loader.dismiss();
      if (!d.lists) {
        this.api.showToast();
        return [];
      }

      this.lists = d.lists.map(l => new List({
        id: l.id,
        urlname: l.urlname,
        name: l.title,
        description: l.description,
        visibility: !l.is_private,
        size: l.items_count,
        isdeletable: l.is_deleteable,
        createtimestamp: l.created_at,
        updatetimestamp: l.updated_at
      }));

      return this.lists;

    }).catch((error) => {
      if (loader) loader.dismiss();
      this.api.showToast();
      return Observable.of([]);
    });
  }

  getById(urlname: string, force?: boolean) {
    let list = this.lists.find((l) => l.urlname == urlname);

    if (!force && list.stories)
      return Observable.of(list);

    let loader = this.api.showLoader();
    return this.api.get('my/api/lists/'+urlname,undefined,undefined,2).map((d: any) => {

      if (loader) loader.dismiss();
        if (!d.submissions) {
        this.api.showToast();
        return null;
      }

      if (!list)
        list = new List({
          id: d.list.id,
          urlname: d.list.urlname,
          name: d.list.title,
          description: d.list.description,
          visibility: !d.list.is_private,
          size: d.list.items_count,
          isdeletable: d.list.is_deleteable,
          createtimestamp: d.list.created_at,
          updatetimestamp: d.list.updated_at
        });

      list.stories = d.submissions.map(story =>
        this.s.extactFromList(story)
      );

      return list;

    }).catch((error) => {
      if (loader) loader.dismiss();
      this.api.showToast();
      return Observable.of(null);
    });
  }


  add(list: List) {
  }

  edit(list: List) {
  }

  delete(list: List) {
  }

}
