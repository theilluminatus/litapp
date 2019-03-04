import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { List } from '../models/list';
import { Story } from '../models/story';
import { Settings } from './settings/settings';
import { Stories } from './stories';
import { User } from './user';
import { Api } from './api/api';

@Injectable()
export class Lists {

  private lists: List[];
  private ready;

  constructor(
    public api: Api,
    public s: Stories,
    public settings: Settings,
    public user: User
  ) {

    this.ready = new Promise((resolve, reject) => {

      Promise.all([
        this.settings.load(),
        this.user.onReady(),
        this.s.onReady()
      ]).then(() => {

        if (!this.settings.allSettings.loadalllistsonstart || !this.user.isLoggedIn()) {
          resolve();
          return;
        }

        this.query(true).subscribe((lists: any) => {
          let done = 0;
          lists.forEach((l, i) => {
            this.getById(l.urlname, true).subscribe((d) => {
              done++;
              if (done == lists.length)
                resolve();
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
    if (this.lists)
      return Observable.of(this.lists);

    let loader;
    if (!hideLoader)
      loader = this.api.showLoader();

      // https://literotica.com/3/users/3507980/lists
    return this.api.get('3/users/'+ this.user.getId()+ '/lists').map((d: any) => {

      if (loader) loader.dismiss();
      if (d.error) {
        this.api.showToast();
        return [];
      }

      this.lists = d.map(l => new List({
        id: l.id,
        urlname: l.urlname,
        name: l.title,
        description: l.description,
        visibility: !l.is_private,
        size: l.stories_count,
        isdeletable: l.is_deletable,
        createtimestamp: l.created_at,
        updatetimestamp: l.updated_at
      }));

      return this.lists;

    }).catch((error) => {
      if (loader) loader.dismiss();
      this.api.showToast();
      console.error(error);
      return Observable.of([]);
    });
  }

  getById(urlname: string, hideLoader?: boolean) {
    let list = this.lists.find((l) => l.urlname == urlname);

    if (list.stories)
      return Observable.of(list);

    let loader;
    if (!hideLoader)
      loader = this.api.showLoader();

    return this.api.get('3/users/'+ this.user.getId()+ '/lists/'+urlname).map((d: any) => {

      if (loader) loader.dismiss();
        if (!d.works.data) {
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
          isdeletable: d.list.is_deletable,
          createtimestamp: d.list.created_at,
          updatetimestamp: d.list.updated_at
        });

      list.stories = d.works.data.map(story =>
        this.s.extactFromList(story)
      );

      return list;

    }).catch((error) => {
      if (loader) loader.dismiss();
      this.api.showToast();
      console.error(error);
      return Observable.of(null);
    });
  }

  addStory(list: List, story: Story) {

    return this.api.put('3/stories/'+story.id+'/lists/'+list.id, {}).map((res: any) => {
      if (!res.success) this.api.showToast();
      return res.success;
    }).catch((error) => {
      this.api.showToast();
      console.error(error);
      return Observable.of(false);
    }).subscribe(d => {
      if (d) {
        
        if (!list.stories) list['stories'] = [];
        list.stories.push(story);
        list.size++;

      }
    });

  }

  removeStory(list: List, story: Story) {

    return this.api.delete('3/stories/'+story.id+'/lists/'+list.id).map((res: any) => {
      if (!res.success) this.api.showToast();
      return res.success;
    }).catch((error) => {
      this.api.showToast();
      console.error(error);
      return Observable.of(false);
    }).subscribe(d => {
      if (d) {
        
        if (!list.stories) return;
        list.stories.forEach((s,i) => {
          if (s.id == story.id)
            list.stories.splice(i,1);
        })
        list.size--;

      }
    });
  }

  add(list: List) {

    let data = {
      title: list.name,
      description: list.description,
      isPrivate: list.visibility ? 0 : 1
    };

    return this.api.post('3/users/'+this.user.getId()+'/lists', data, undefined, false).map((res: any) => {

      if (!res.success) {
        this.api.showToast();
        return false;
      }

      this.lists.push(new List({
        id: res.list.id,
        urlname: res.list.urlname,
        name: res.list.title,
        description: res.list.description,
        visibility: !res.list.is_private,
        size: res.list.stories_count,
        isdeletable: res.list.is_deletable,
        createtimestamp: res.list.created_at
      }));

      return true;
    }).catch((error) => {
      this.api.showToast();
      console.error(error);
      return Observable.of(false);
    });
  }


  edit(list: List) {

    let data = {
      title: list.name,
      description: list.description,
      isPrivate: list.visibility ? 0 : 1
    };

    return this.api.patch('3/lists/'+list.id, data).map((res: any) => {

      if (!res.success) {
        this.api.showToast(res.error);
        return false;
      }

      this.lists.forEach((l) => {
        if (l.id == list.id) {
          l.name = res.list.title;
          l.description = res.list.description;
          l.visibility = !res.list.is_private;
        }
      });

      return true;
    }).catch((error) => {
      this.api.showToast();
      console.error(error);
      return Observable.of(false);
    });
  }


  delete(list: List) {

    return this.api.delete('3/lists/'+list.id).map((res: any) => {
      if (!res.success) {
        this.api.showToast(res.error);
        return false;
      }

      this.lists.forEach((l,i) => {
        if (l.urlname == list.urlname)
          this.lists.splice(i,1);
      });

      return true;
    }).catch((error) => {
      this.api.showToast();
      console.error(error);
      return Observable.of(false);
    });
  }

}
