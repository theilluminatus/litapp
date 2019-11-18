import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

import { List } from '../models/list';
import { Story } from '../models/story';
import { Settings } from './settings/settings';
import { Stories } from './stories';
import { User } from './user';
import { Api } from './api/api';
import { LIST_KEY } from './db';

@Injectable()
export class Lists {
  private lists: List[];
  private ready;

  constructor(public api: Api, public s: Stories, public settings: Settings, public user: User, public storage: Storage) {
    this.ready = new Promise((resolve, reject) => {
      Promise.all([this.settings.load(), this.user.onReady(), this.s.onReady(), this.storage.get(LIST_KEY)]).then(res => {
        if (!this.settings.allSettings.cachelists || this.settings.allSettings.offlineMode || !this.user.isLoggedIn()) {
          resolve();
          if (res[3]) {
            this.storage.remove(LIST_KEY);
          }
          return;
        }

        if (res[3]) {
          this.lists = res[3];
        }

        this.query(true).subscribe((lists: any) => {
          let done = 0;
          lists.forEach((l, i) => {
            this.getById(l.urlname, true).subscribe(d => {
              done += 1;
              if (done === lists.length) {
                resolve();
              }
            });
          });
        });
      });
    });
  }

  onReady() {
    return this.ready;
  }

  query(hideLoader?: boolean) {
    if (this.lists) {
      return Observable.of(this.lists);
    }

    let loader;
    if (!hideLoader) {
      loader = this.api.showLoader();
    }

    // https://literotica.com/3/users/3507980/lists
    return this.api
      .get(`3/users/${this.user.getId()}/lists`)
      .map((d: any) => {
        if (loader) loader.dismiss();
        if (d.error) {
          this.api.showToast();
          return [];
        }

        this.lists = d.map(
          l =>
            new List({
              id: l.id,
              urlname: l.urlname,
              name: l.title,
              description: l.description,
              visibility: !l.is_private,
              size: l.stories_count,
              isdeletable: l.is_deletable,
              createtimestamp: l.created_at,
              updatetimestamp: l.updated_at,
              lastPage: -1,
            }),
        );
        this.storage.set(LIST_KEY, this.lists);

        return this.lists;
      })
      .catch(error => {
        if (loader) loader.dismiss();
        this.api.showToast();
        console.error('lists.query', error);
        return Observable.of([]);
      });
  }

  getById(urlname: string, hideLoader?: boolean) {
    const list = this.lists.find(l => l.urlname === urlname);

    if (list.stories) {
      return Observable.of(list);
    }

    let loader;
    if (!hideLoader) {
      loader = this.api.showLoader();
    }

    return Observable.create(observer => {
      const loop = (page: number, partialList: any) => {
        this.getListPage(urlname, loader, Object.assign({}, partialList), page).subscribe(l => {
          if (!l) return;

          let newPartialList = partialList;
          if (!partialList.stories) {
            newPartialList = l;
          } else {
            newPartialList.stories = newPartialList.stories.concat(l.stories);
          }

          if (l.size > newPartialList.stories.length && page < newPartialList.lastPage) {
            const next = page + 1;
            // tslint:disable-next-line: prefer-template
            this.api.updateLoader(Math.round((newPartialList.stories.length / l.size) * 100) + '%');
            loop(next, newPartialList);
          } else {
            this.lists[this.lists.indexOf(list)] = newPartialList;
            this.storage.set(LIST_KEY, this.lists);
            if (loader) loader.dismiss();
            observer.next(newPartialList);
            observer.complete();
          }
        });
      };

      loop(1, list);
    });
  }

  getListPage(urlname: string, loader: any, list: any, i: number = 1) {
    const params = {
      page: i,
      sort: 'dateadd',
    };

    return this.api
      .get(`3/users/${this.user.getId()}/lists/${urlname}`, { params: JSON.stringify(params) })
      .map((d: any) => {
        if (!d.works.data) {
          this.api.showToast();
          return null;
        }

        let newList = list;
        if (!list) {
          newList = new List({
            id: d.list.id,
            urlname: d.list.urlname,
            name: d.list.title,
            description: d.list.description,
            visibility: !d.list.is_private,
            size: d.list.stories_count,
            isdeletable: d.list.is_deletable,
            createtimestamp: d.list.created_at,
            updatetimestamp: d.list.updated_at,
          });
        }

        // Update page numbers (work around for "inconsistent story count" bug)
        newList.lastPage = d.works.meta.last_page;

        newList.stories = d.works.data.map(story => this.s.extactFromList(story));

        return newList;
      })
      .catch(error => {
        if (loader) loader.dismiss();
        this.api.showToast();
        console.error('lists.getListPage', [urlname, list, i], error);
        return Observable.of(null);
      });
  }

  addStory(list: List, story: Story) {
    return this.api
      .put(`3/stories/${story.id}/lists/${list.id}`, {})
      .map((res: any) => {
        if (!res.success) this.api.showToast();
        return res.success;
      })
      .catch(error => {
        this.api.showToast();
        console.error('lists.addStory', [list, story], error);
        return Observable.of(false);
      })
      .subscribe(d => {
        if (d) {
          if (!list.stories) list['stories'] = [];
          list.stories.push(story);
          list.size += 1;
          this.storage.set(LIST_KEY, this.lists);
        }
      });
  }

  removeStory(list: List, story: Story) {
    return this.api
      .delete(`3/stories/${story.id}/lists/${list.id}`)
      .map((res: any) => {
        if (!res.success) this.api.showToast();
        return res.success;
      })
      .catch(error => {
        this.api.showToast();
        console.error('lists.removeStory', [list, story], error);
        return Observable.of(false);
      })
      .subscribe(d => {
        if (d) {
          if (!list.stories) return;
          list.stories.forEach((s, i) => {
            if (s.id === story.id) {
              list.stories.splice(i, 1);
            }
          });
          list.size -= 1;
          this.storage.set(LIST_KEY, this.lists);
        }
      });
  }

  add(list: List) {
    const data = {
      title: list.name,
      description: list.description,
      isPrivate: list.visibility ? 0 : 1,
    };

    return this.api
      .post(`3/users/${this.user.getId()}/lists`, data, undefined, false)
      .map((res: any) => {
        if (!res.success) {
          this.api.showToast();
          return false;
        }

        this.lists.push(
          new List({
            id: res.list.id,
            urlname: res.list.urlname,
            name: res.list.title,
            description: res.list.description,
            visibility: !res.list.is_private,
            size: res.list.stories_count,
            isdeletable: res.list.is_deletable,
            createtimestamp: res.list.created_at,
          }),
        );
        this.storage.set(LIST_KEY, this.lists);

        return true;
      })
      .catch(error => {
        this.api.showToast();
        console.error('lists.add', [list], error);
        return Observable.of(false);
      });
  }

  edit(list: List) {
    const data = {
      title: list.name,
      description: list.description,
      isPrivate: list.visibility ? 0 : 1,
    };

    return this.api
      .patch(`3/lists/${list.id}`, data)
      .map((res: any) => {
        if (!res.success) {
          this.api.showToast(res.error);
          return false;
        }

        this.lists.forEach(l => {
          if (l.id === list.id) {
            l.name = res.list.title;
            l.description = res.list.description;
            l.visibility = !res.list.is_private;
          }
        });
        this.storage.set(LIST_KEY, this.lists);

        return true;
      })
      .catch(error => {
        this.api.showToast();
        console.error('lists.edit', [list], error);
        return Observable.of(false);
      });
  }

  delete(list: List) {
    return this.api
      .delete(`3/lists/${list.id}`)
      .map((res: any) => {
        if (!res.success) {
          this.api.showToast(res.error);
          return false;
        }

        this.lists.forEach((l, i) => {
          if (l.urlname === list.urlname) {
            this.lists.splice(i, 1);
          }
        });
        this.storage.set(LIST_KEY, this.lists);

        return true;
      })
      .catch(error => {
        this.api.showToast();
        console.error('lists.delete', [list], error);
        return Observable.of(false);
      });
  }

  refresh() {
    this.storage.remove(LIST_KEY);
    this.lists = null;
    return this.query();
  }
}
