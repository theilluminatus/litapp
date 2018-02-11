import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

import { LISTS_KEY } from './db';
import { List } from '../models/list';
import { Story } from '../models/story';
import { Author } from '../models/author';
import { Api } from './api/api';

@Injectable()
export class Lists {

  private lists: List[];
  private nextupdate;

  constructor(public api: Api, public storage: Storage) {
    this.refreshTimeout();
    // TODO: get cached lists from db
  }

  query(force?: boolean) {
    if (!force && this.lists && (new Date).getTime()<this.nextupdate)
      return Observable.of(this.lists);

    let loader = this.api.showLoader();
    this.refreshTimeout();
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

      this.persistLists(this.lists);
      return this.lists;

    }).catch((error) => {
      if (loader) loader.dismiss();
      this.api.showToast();
      return Observable.of([]);
    });
  }

  getById(urlname: string, force?: boolean) {
    let list = this.lists.find((l) => l.urlname == urlname);

    if (!force && list.stories && (new Date).getTime()<this.nextupdate)
      return Observable.of(list);

    let loader = this.api.showLoader();
    this.refreshTimeout();
    return this.api.get('my/api/lists/'+urlname,undefined,undefined,2).map((d: any) => {

      if (loader) loader.dismiss();
        if (!d.submissions) {
        this.api.showToast();
        return [];
      }

      list.stories = d.submissions.map(s => {
        return new Story({
          id: s.id,
          title: s.name,
          timestamp: s.timestamp_published,
          rating: s.rate,
          viewcount: s.view_count,
          url: s.url,
          tags: !s.tags ? [] : s.tags.map((t) => t.tag),
          ishot: s.is_hot == "no" ? false : true,
          isnew: s.is_new == "no" ? false : true,
          iswriterspick: s.writers_pick == "no" ? false : true,
          iscontestwinner: s.contest_winner == "no" ? false : true,
          commentsenabled: s.enable_comments,
          ratingenabled: s.allow_vote,
          author: new Author({
            id: s.author.userid,
            name: s.author.username,
            picture: s.author.userpic.currentUserpic,
          })
        })
      });

      this.persistList(list);
      return list;

    }).catch((error) => {
      if (loader) loader.dismiss();
      this.api.showToast();
      return Observable.of(null);
    });
  }

  private persistLists(lists: List[]) {
    // TODO: cache lists to db
  }

  private persistList(list: List) {
    // TODO: cache list to db
  }

  private refreshTimeout() {
    this.nextupdate = (new Date).getTime() + 1000*60*60;
  }

  add(list: List) {
  }

  edit(list: List) {
  }

  delete(list: List) {
  }

}
