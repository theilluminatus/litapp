import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

import { FeedItem } from '../models/feeditem';
import { Author } from '../models/author';
import { Stories } from './stories';
import { Api } from './api/api';

@Injectable()
export class Feed {

  constructor(
    public api: Api,
    public s: Stories,
    public storage: Storage
  ) { }

  query(lastid?: number, showloader?: boolean) {

    let loader;
    if (showloader)
      loader = this.api.showLoader();

    let params = {
      chunked: 1,
      limit: 15,
      last_id: lastid ? lastid : undefined
    };

    return this.api.get('my/api/activity/wall',params,undefined,2).map((d: any) => {
      
      if (loader) loader.dismiss();
      if (!d.data) {
        this.api.showToast();
        return [];
      }

      return d.data.map(item => {
        return new FeedItem({

          id: item.id,
          timestamp: item.when,
          author: new Author({
            id: item.who.userid,
            name: item.who.username,
            picture: item.who.userpic.currentUserpic,
          }),

          text: (!Array.isArray(item.what) ? [] : item.what),
          story: (Array.isArray(item.what) ? undefined : this.s.extractFromFeed(item))
        });

      });

    }).catch((error) => {
      if (loader) loader.dismiss();
      this.api.showToast();
      return Observable.of([]);
    });
  }

}
