import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

import { Story } from '../models/story';
import { Author } from '../models/author';
import { STORY_KEY } from './db';
import { Api } from './api/api';

@Injectable()
export class Stories {
  
  private stories: Map<number,Story> = new Map<number,Story>();

  constructor(public api: Api, public storage: Storage) {
    this.storage.forEach((value, key, index) => {
      if (key.indexOf(STORY_KEY) == 0)
        this.stories.set(value.id, value)
    })
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


  // Get a story by ID
  getById(id: any) {

    let cached = this.stories.get(id);
    if (cached) {
      if (cached.length)
        return Observable.of(cached);
    } else {
      // TODO: remove when all downloaded stories are retrieve from db before history page is loaded
      console.error("asking for story detail without having default cached at providers/stories getById");
      return Observable.of(null);
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
    let params = {
      storyid: story.id,
      user_id: 0, // TODO: check if user_id is necessary
      session_id: 0, // TODO: send session_id to vote
      "filter": JSON.stringify(filter).trim()
    };

    this.api.post('2/submissions/vote', params)
      .catch((error) => {
        return Observable.throw(error);
      }).subscribe((data) => {
        if (!data.success)
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

      return [!data.submissions ? [] : data.submissions.map((story) => {
        if (this.stories.get(story.id)) {
          return this.stories.get(story.id);
        }

        let newStory = this.extractFromSearch(story);
        this.stories.set(newStory.id, newStory);
        return newStory;

      }), data.total];

    }).catch((error) => {
      if (loader) loader.dismiss();
      this.api.showToast();
      return Observable.of([[],0]);
    });
  }



  download(story: Story) {
    this.storage.set(STORY_KEY+"_"+story.id, story);
  }

  removeDownload(story: Story) {
    story.downloaded = false;
    this.storage.remove(STORY_KEY+"_"+story.id);
  }



  extractFromFeed(item) {
    let cached = this.stories.get(item.what.id);
    if (cached)
      return cached;

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
      author: new Author({
        id: item.who.userid,
        name: item.who.username,
        picture: item.who.userpic.currentUserpic,
      })
    });

    this.stories.set(story.id, story);
    return story;
  }

  extactFromList(item) {
    let cached = this.stories.get(item.id);
    if (cached)
      return cached;

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
      author: new Author({
        id: item.author.userid,
        name: item.author.username,
        picture: item.author.userpic.currentUserpic,
      })
    });

    this.stories.set(story.id, story);
    return story;
  }

  extractFromSearch(story) {
    return new Story({
      id: story.id,
      title: story.name,
      description: story.description,
      category: story.category.name,
      lang: story.lang,
      timestamp: story.timestamp_published,
      rating: story.rate,
      viewcount: story.view_count,
      url: story.url,
      ishot: story.is_hot == "no" ? false : true,
      isnew: story.is_new == "no" ? false : true,
      iswriterspick: story.writers_pick == "no" ? false : true,
      iscontestwinner: story.contest_winner == "no" ? false : true,
      commentsenabled: story.enable_comments > 0 ? true : false,
      ratingenabled: story.allow_vote > 0 ? true : false,
      author: new Author({
        id: story.user.id,
        name: story.user.username,
        picture: story.user.userpic,
      })
    });
  }

}
