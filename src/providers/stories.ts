import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

import { Story } from '../models/story';
import { STORY_KEY } from './db';
import { Authors } from './authors';
import { User } from './user';
import { Api } from './api/api';

@Injectable()
export class Stories {
  
  private stories: Map<number,Story> = new Map<number,Story>();
  private ready;

  constructor(
    public api: Api,
    public a: Authors,
    public user: User,
    public storage: Storage
  ) {

    this.ready = new Promise((resolve, reject) => {
      this.storage.keys().then((keys) => {
        if (keys.length < 1) {
          resolve();
          return;
        }

        let total = keys.length -1;
        this.storage.forEach((value, key, index) => {
          if (key.indexOf(STORY_KEY) == 0)
            this.stories.set(value.id, value);
          if (index == total)
            resolve();
        });

      });
    });
  }

  onReady() {
    return this.ready;
  }


  searchStory(query: string, sort: string, page?: number, limit?: number) {
    let filter = [
      {"property": "q", "value": query},
      {"property": "type", "value": "story"}
    ];
    return this.search(filter, page, sort, 1);
  }

  getSeries(id: any) {
    let filter = [
      {"property": "series_id", "value": parseInt(id)}
    ];
    return this.search(filter);
  }

  getRelated(id: any) {
    let filter = [
      {"property": "related_id", "value": parseInt(id)}
    ];
    return this.search(filter);
  }

  getAuthorStories(id: any, page?: number) {
    let filter = [
      {"property": "user_id", "value": parseInt(id)},
      {"property": "type", "value": "story"}
    ];
    return this.search(filter, page, null, null, '1/user-submissions');
  }

  getAuthorFavs(id: any, page?: number) {
   let filter = [
      {"property": "user_id", "value": parseInt(id)},
      {"property": "type", "value": "story"}
    ];
    return this.search(filter, page, null, null, '1/user-favorites');
  }

  getTop(id?: any, page?: number) {
    let filter: any[] = [
      {"property": "type", "value": "story"}
    ];

    if (id)
      filter.push({"property": "category_id", "value": parseInt(id)});

    return this.search(filter, page, null, null, '1/top');
  }


  // Get a story by ID
  getById(id: any) {

    let cached = this.stories.get(id);
    if (cached) {
      if (cached.length)
        return Observable.of(cached);
    }

    let filter = [{"property": "submission_id", "value": parseInt(id)}];
    let params = { "filter": JSON.stringify(filter).trim() };

    let loader = this.api.showLoader();
    return this.api.get('2/submissions/pages', params).map((data: any) => {
      if (loader) loader.dismiss();
      if (!data.success) {
        this.api.showToast();
        return null;
      }

      if (!cached)
        cached = new Story({
          id: data.pages[0].submission_id,
          title: data.pages[0].name,
          url: data.pages[0].url,
          ratingenabled: data.pages[0].allow_vote
        });

      let tags = !data.pages[0].tags ? [] : data.pages[0].tags
        .sort((a,b) => b.submission_count - a.submission_count )
        .map((el) => el.name);

      cached.series = data.pages[0].series_id;
      cached.lang = data.pages[0].lang;
      cached.length = data.total;
      cached.tags = tags;
      cached.content = data.pages.map((p) => p.content);

      this.stories.set(cached.id, cached);
      return cached;

    }).catch((error) => {
      if (loader) loader.dismiss();
      this.api.showToast();
      return Observable.of(null);
    });
  }


  rate(story: Story, rating: number) {

    let filter = [{"property": "submission_id", "value": parseInt(story.id)}];
    let data = new FormData();
    data.append("user_id", this.user.getId());
    data.append("session_id", this.user.getSession());
    data.append("vote", String(rating));
    data.append("filter", JSON.stringify(filter));

    this.api.post('2/submissions/vote', data, undefined, true)
      .catch((error) => {
        return Observable.throw(error);
      }).subscribe((data) => {
        
        if (data.success)
          story.myrating = rating;
        else if (data.error)
          this.api.showToast(data.error);
        else
          this.api.showToast();

      });
  }



  // helper for similar requests
  private search(filter: any, page?: number, sort?: string, urlIndex?: number, path?: string) {
    let params = { 
      "page": page ? page : 1,
      "filter": JSON.stringify(filter)
    };

    let loader;
    if (!page || page < 2)
      loader = this.api.showLoader();

    return this.api.get(path ? path : '1/submissions', params, null, urlIndex).map((data: any) => {
      if (loader) loader.dismiss();

      if (!data.success && !data.submissions) {
        if (!data.hasOwnProperty('total'))
          this.api.showToast();
        return [[],0];
      }

      return [!data.submissions ? [] : data.submissions.map((story) => 
        this.extractFromSearch(story)
      ), data.total];

    }).catch((error) => {
      if (loader) loader.dismiss();
      this.api.showToast();
      return Observable.of([[],0]);
    });
  }


  download(story: Story) {
    story.downloaded = true;
    story.cached = true;
    this.storage.set(STORY_KEY+"_"+story.id, story);
  }

  undownload(story: Story) {
    story.downloaded = false;
    if (story.cached)
      this.storage.set(STORY_KEY+"_"+story.id, story);
    else
      this.storage.remove(STORY_KEY+"_"+story.id);
  }

  cache(story: Story) {
    story.cached = true;
    this.storage.set(STORY_KEY+"_"+story.id, story);
  }

  uncache(story: Story) {
    story.cached = false;
    story.downloaded = false;
    this.storage.remove(STORY_KEY+"_"+story.id);
  }



  extractFromFeed(item) {
    let cached = this.stories.get(item.what.id);
    if (cached)
      return cached;

    let author = this.a.extractFromFeed(item.who);
    let story = new Story({
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
      author: author
    });

    this.stories.set(story.id, story);
    return story;
  }

  extactFromList(item) {
    let cached = this.stories.get(item.id);
    if (cached)
      return cached;

    let author = this.a.extractFromFeed(item.author);
    let story = new Story({
      id: item.id,
      title: item.name,
      timestamp: item.timestamp_published,
      rating: item.rate,
      viewcount: item.view_count,
      url: item.url,
      tags: !item.tags ? [] : item.tags.map((t) => t.tag),
      ishot: item.is_hot == "no" ? false : true,
      isnew: item.is_new == "no" ? false : true,
      iswriterspick: item.writers_pick == "no" ? false : true,
      iscontestwinner: item.contest_winner == "no" ? false : true,
      commentsenabled: item.enable_comments,
      ratingenabled: item.allow_vote,
      author: author
    });

    this.stories.set(story.id, story);
    return story;
  }

  extractFromSearch(item) {
    let cached = this.stories.get(item.id);
    if (cached)
      return cached;

    let author = this.a.extractFromSearch(item.user);
    let story = new Story({
      id: item.id,
      title: item.name,
      description: item.description,
      category: item.category.name,
      lang: item.lang,
      timestamp: item.timestamp_published,
      rating: item.rate,
      viewcount: item.view_count,
      url: item.url,
      ishot: item.is_hot == "no" ? false : true,
      isnew: item.is_new == "no" ? false : true,
      iswriterspick: item.writers_pick == "no" ? false : true,
      iscontestwinner: item.contest_winner == "no" ? false : true,
      commentsenabled: item.enable_comments > 0 ? true : false,
      ratingenabled: item.allow_vote > 0 ? true : false,
      author: author
    });

    this.stories.set(story.id, story);
    return story;
  }

}
