import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

import { FeedItem } from '../models/feeditem';
import { Story } from '../models/story';
import { Author } from '../models/author';
import { Api } from './api/api';

@Injectable()
export class Feed {

  constructor(public api: Api, public storage: Storage) { }

  query(lastid?: number, hide?: boolean) {

    let loader;
    if (!hide)
      loader = this.api.showLoader();

    let params = {
      chunked: 1,
      limit: 15,
      last_id: lastid ? lastid : undefined
    };

    return this.api.get('my/api/activity/wall',params,undefined,2).map((d: any) => {
      
      if (loader) loader.dismiss();

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

          story: (Array.isArray(item.what) ? undefined : new Story({
            id: item.what.id,
            title: item.what.name,
            description: item.what.description,
            timestamp: item.what.timestamp_published,
            rating: item.what.rate,
            viewcount: item.what.view_count,
            url: item.what.url,
            tags: !item.what.tags ? [] : item.what.tags.map((t) => t.tag),
            ishot: item.what.is_hot == "no" ? false : true,
            isnew: item.what.is_new == "no" ? false : true,
            iswriterspick: item.what.writers_pick == "no" ? false : true,
            iscontestwinner: item.what.contest_winner == "no" ? false : true,
            commentsenabled: item.what.enable_comments,
            ratingenabled: item.what.allow_vote,
            author: new Author({
              id: item.who.userid,
              name: item.who.username,
              picture: item.who.userpic.currentUserpic,
            })
          }))

        });

      });

    });
  }

}
