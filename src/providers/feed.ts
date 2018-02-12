import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

import { FeedItem } from '../models/feeditem';
import { Stories } from './stories';
import { Authors } from './authors';
import { User } from './user';
import { Settings } from './settings/settings';
import { FEED_KEY } from './db';
import { Api } from './api/api';

@Injectable()
export class Feed {

  private ready;
  private timeout = 1000*60*10;
  private feed;
  private feedtimeout = (new Date()).getTime() + this.timeout;

  feedbadge = "";

  constructor(
    public api: Api,
    public s: Stories,
    public a: Authors,
    public user: User,
    public settings: Settings,
    public storage: Storage
  ) {

    this.ready = new Promise((resolve, reject) => {

      Promise.all([
        this.settings.load(),
        this.user.onReady()
      ]).then(() => {

        if (!this.settings.allSettings.checkforfeedupdates) {
          resolve();
          return;
        }

        this.query().subscribe((d) => {

          if (d && this.user.isLoggedIn())
            this.storage.get(FEED_KEY).then((id) => {
              for (let i=0; i<d.length; i++) {
                if (id == d[i].id) {
                  this.feedbadge = String(i);
                  break;
                }
              }
              if (this.feedbadge == "") this.feedbadge = "15+";
              resolve();
            });

          else resolve();
        });

      });
    });

  }

  onReady() {
    return this.ready;
  }

  query(lastid?: number, showloader?: boolean) {

    if ( !lastid && this.feed && (new Date).getTime() < this.feedtimeout)
      return Observable.of(this.feed);

    if (!lastid || !this.feed)
      this.feed = [];

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

      let items = d.data.map(item => {
        return new FeedItem({
          id: item.id,
          timestamp: item.when,
          author: this.a.extractFromFeed(item.who),
          text: (!Array.isArray(item.what) ? [] : item.what),
          story: (Array.isArray(item.what) ? undefined : this.s.extractFromFeed(item))
        });
      });

      items.forEach(i => this.feed.push(i));
      this.feedtimeout = (new Date).getTime() + this.timeout;
      return items;

    }).catch((error) => {
      if (loader) loader.dismiss();
      this.api.showToast();
      return Observable.of([]);
    });
  }

}
