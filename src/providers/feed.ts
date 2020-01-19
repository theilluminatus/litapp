import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

import { FeedItem } from '../models/feeditem';
import { Stories } from './stories';
import { Authors } from './authors';
import { User } from './user';
import { Settings } from './settings';
import { FEED_KEY } from './db';
import { Api } from './shared/api';
import { UX } from './shared/ux';

@Injectable()
export class Feed {
  private ready;
  private timeout = 1000 * 60 * 10;
  private feed;
  private feedtimeout = new Date().getTime() + this.timeout;

  feedbadge = '';

  constructor(
    public api: Api,
    public s: Stories,
    public a: Authors,
    public user: User,
    public settings: Settings,
    public storage: Storage,
    public ux: UX,
  ) {
    this.ready = new Promise((resolve, reject) => {
      Promise.all([this.settings.load(), this.user.onReady()]).then(() => {
        if (!this.settings.allSettings.checkforfeedupdates || this.settings.allSettings.offlineMode || !this.user.isLoggedIn()) {
          resolve();
          return;
        }

        this.feedbadge = '·';

        this.query().subscribe(d => {
          if (d) {
            this.storage.get(FEED_KEY).then(id => {
              for (let i = 0; i < d.length; i += 1) {
                if (id === d[i].id) {
                  this.feedbadge = String(i);
                  break;
                }
              }
              if (this.feedbadge === '') this.feedbadge = '15+';
              resolve();
            });
          } else resolve();
        });
      });
    });
  }

  onReady() {
    return this.ready;
  }

  query(lastid?: number, showloader?: boolean, force = false) {
    if (!force && !lastid && this.feed && new Date().getTime() < this.feedtimeout) {
      return Observable.of(this.feed);
    }

    if (!lastid || !this.feed) {
      this.feed = [];
    }

    let loader;
    if (showloader) {
      loader = this.ux.showLoader();
    }

    const params = {
      chunked: 1,
      limit: 10,
    };

    if (lastid) {
      params['last_id'] = lastid;
    }

    return this.api
      .get(`3/activity/wall?params=${JSON.stringify(params)}`)
      .map((d: any) => {
        if (loader) loader.dismiss();
        if (!d.data) {
          this.ux.showToast();
          console.error('feed.query', [lastid]);
          return [];
        }

        const items = d.data.map(item => {
          const isStory = item.action === 'published-story';
          try {
            return new FeedItem({
              id: item.id,
              timestamp: item.when,
              author: this.a.extractFromFeed(item.who),
              text: isStory ? [] : Array.isArray(item.what) ? item.what : ['their profile'],
              story: !isStory ? undefined : this.s.extractFromFeed(item),
            });
          } catch (error) {
            return new FeedItem(null);
          }
        });

        items.forEach(i => this.feed.push(i));
        this.feedtimeout = new Date().getTime() + this.timeout;
        return items;
      })
      .catch(error => {
        if (loader) loader.dismiss();
        this.ux.showToast();
        console.error('feed.query', [lastid], error);
        return Observable.of([]);
      });
  }
}
