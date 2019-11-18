import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

import { Story } from '../models/story';
import { STORY_KEY } from './db';
import { Authors } from './authors';
import { User } from './user';
import { Globals } from './globals';
import { Api } from './api/api';

const decodeHTML = (s: string) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = s;
  const value = txt.value;
  return value;
};

@Injectable()
export class Stories {
  private stories: Map<number, Story> = new Map<number, Story>();
  private ready;

  constructor(
    public api: Api,
    public a: Authors,
    public user: User,
    public g: Globals,
    public storage: Storage,
    public translate: TranslateService,
  ) {
    this.ready = new Promise((resolve, reject) => {
      this.storage.keys().then(keys => {
        if (keys.length < 1) {
          resolve();
          return;
        }

        const total = keys.length - 1;
        this.storage.forEach((value, key, index) => {
          if (key.indexOf(STORY_KEY) === 0) {
            this.stories.set(value.id, value);
          }
          if (index === total) {
            resolve();
          }
        });
      });
    });
  }

  onReady() {
    return this.ready;
  }

  searchStory(query: string, options: any, page?: number, limit?: number) {
    const filter = {
      q: query,
      ...options,
    };

    if (options.astags) {
      return this.tagsearch(filter, page);
    }
    return this.newsearch(filter, page);
  }

  getSeries(id: any) {
    const filter = [{ property: 'series_id', value: parseInt(id) }];
    return this.search(filter);
  }

  getRelated(id: any) {
    const filter = [{ property: 'related_id', value: parseInt(id) }];
    return this.search(filter);
  }

  getAuthorStories(id: any, page?: number) {
    const filter = [{ property: 'user_id', value: parseInt(id) }, { property: 'type', value: 'story' }];
    return this.search(filter, page, null, null, '1/user-submissions');
  }

  getAuthorFavs(id: any, page?: number) {
    const filter = [{ property: 'user_id', value: parseInt(id) }, { property: 'type', value: 'story' }];
    return this.search(filter, page, null, null, '1/user-favorites');
  }

  getTop(id?: any, page?: number) {
    const filter: any[] = [{ property: 'type', value: 'story' }];

    if (id) {
      filter.push({ property: 'category_id', value: parseInt(id) });
    }

    return this.search(filter, page, null, null, '1/top');
  }

  getNew(id?: any, page?: number) {
    const filter: any[] = [{ property: 'type', value: 'story' }, { property: 'newonly', value: 'yes' }];

    if (id) {
      filter.push({ property: 'category_id', value: parseInt(id) });
    }

    return this.search(filter, page);
  }

  // Get a story by ID
  getById(id: any, force: boolean = false, noLoaderDismiss = false) {
    let cached = this.stories.get(id);
    if (cached && !force) {
      if (cached.length) {
        return Observable.of(cached);
      }
    }

    const filter = [{ property: 'submission_id', value: parseInt(id) }];
    const params = { filter: JSON.stringify(filter).trim() };

    const loader = this.api.showLoader();
    return this.api
      .get('2/submissions/pages', params)
      .map((data: any) => {
        if (loader && !noLoaderDismiss) loader.dismiss();
        if (!data.success) {
          this.api.showToast();
          return null;
        }

        if (!cached) {
          cached = new Story({
            id: data.pages[0].submission_id,
            title: data.pages[0].name,
            url: data.pages[0].url,
            ratingenabled: data.pages[0].allow_vote,
          });
        } else if (force) {
          cached.title = data.pages[0].name;
          cached.url = data.pages[0].url;
          cached.ratingenabled = data.pages[0].allow_vote;
        }

        const tags = !data.pages[0].tags
          ? []
          : data.pages[0].tags.sort((a, b) => b.submission_count - a.submission_count).map(el => el.name);

        cached.series = data.pages[0].series_id;
        cached.lang = data.pages[0].lang;
        cached.length = data.total;
        cached.tags = tags;
        cached.content = data.pages.map(p => p.content);

        this.stories.set(cached.id, cached);
        return cached;
      })
      .catch(error => {
        if (loader) loader.dismiss();
        this.api.showToast();
        console.error('stories.getById', [id], error);
        return Observable.of(null);
      });
  }

  rate(story: Story, rating: number) {
    const filter = [{ property: 'submission_id', value: parseInt(story.id) }];
    const data = new FormData();
    data.append('user_id', this.user.getId());
    data.append('session_id', this.user.getSession());
    data.append('vote', String(rating));
    data.append('filter', JSON.stringify(filter));

    this.api
      .post('2/submissions/vote', data, undefined, true)
      .catch(error => {
        console.error('stories.rate', [story, rating], error);
        return Observable.throw(error);
      })
      .subscribe(data => {
        if (data.success) {
          story.myrating = rating;
        } else if (data.error) {
          this.api.showToast(data.error);
        } else {
          this.api.showToast();
        }
      });
  }

  downloadSeries(series: Story[]) {
    this.api.showLoader();
    return new Promise(resolve => {
      const loop = (index: number) => {
        if (index >= series.length) {
          this.api.hideLoader();
          resolve();
          return;
        }
        if (!series[index].cached) {
          this.getById(series[index].id, false, true).subscribe(s => {
            if (s) {
              this.download(s);
            } else {
              this.translate.get(['SERIES_DOWNLOAD_ERROR']).subscribe(values => {
                this.api.showToast(values.SERIES_DOWNLOAD_ERROR);
              });
              this.api.hideLoader();
              return;
            }
            // tslint:disable-next-line: prefer-template
            this.api.updateLoader(Math.round(index + (1 / series.length) * 100) + '%');
            loop(index + 1);
          });
          return;
        }
        this.download(series[index]);
        // tslint:disable-next-line: prefer-template
        this.api.updateLoader(Math.round(index + (1 / series.length) * 100) + '%');
        loop(index + 1);
      };

      loop(0);
    });
  }

  // helper for similar requests
  private search(filter: any, page?: number, sort?: string, urlIndex?: number, path?: string) {
    const params = {
      page: page ? page : 1,
      filter: JSON.stringify(filter),
    };

    let loader;
    if (!page || page < 2) {
      loader = this.api.showLoader();
    }

    return this.api
      .get(path ? path : '1/submissions', params, null, urlIndex)
      .map((data: any) => {
        if (loader) loader.dismiss();

        if (!data.success && !data.submissions) {
          if (!data.hasOwnProperty('total')) {
            this.api.showToast();
          }
          return [[], 0];
        }

        return [!data.submissions ? [] : data.submissions.map(story => this.extractFromSearch(story)), data.total];
      })
      .catch(error => {
        if (loader) loader.dismiss();
        this.api.showToast();
        console.error('stories.search', [filter, page, sort], error);
        return Observable.of([[], 0]);
      });
  }

  // api 3 used on search panel for keyword and tag search
  private newsearch(filter: any, page?: number, urlIndex?: number, path?: string, tags = false) {
    if (!tags) {
      if (filter.category) {
        filter.categories = filter.category.map(c => parseInt(c));
      }
      delete filter.category;
    } else if (Array.isArray(filter.category)) {
      filter.category = parseInt(filter.category[0]);
    }

    const params = {
      params: JSON.stringify({
        page: page ? page : 1,
        ...filter,
      }),
    };

    let loader;
    if (!page || page < 2) {
      loader = this.api.showLoader();
    }

    return this.api
      .get(path ? path : '3/search/stories', params, null, urlIndex)
      .map((data: any) => {
        if (loader) loader.dismiss();

        // tag portals uses new api but level 1 structure of old api :'(
        const stories = tags ? data.submissions : data.data;
        const total = tags ? data.meta.submissions_count : data.meta.total;

        if (!stories) {
          if (!total) {
            this.api.showToast();
          }
          return [[], 0];
        }

        return [stories.map(story => this.extractFromNewSearch(story)), total];
      })
      .catch(error => {
        if (loader) loader.dismiss();
        this.api.showToast();
        console.error('stories.newsearch', [filter, page, tags], error);
        return Observable.of([[], 0]);
      });
  }

  private tagsearch(filter: any, page?: number, urlIndex?: number, path?: string) {
    const lookup = { params: JSON.stringify({ tags: filter.q.split(',').map(t => t.trim()) }) };
    delete filter.q;

    if (!page || page < 2) {
      this.api.showLoader();
    }

    // first lookup tag ids
    return (
      this.api
        .get(path ? path : '3/tagsportal/by-name', lookup, null, urlIndex)
        .map((data: any) => {
          return data.map(t => t.id);
        })

        // then lookup results
        .mergeMap(ids => {
          const params = {
            tags: ids,
            sort_by: filter.sort,
            ...filter,
          };
          return this.newsearch(params, page, 0, '3/tagsportal/stories', true);
        })
    );
  }

  download(story: Story) {
    story.downloaded = true;
    story.downloadedtimestamp = new Date();
    story.cached = true;
    this.storage.set(`${STORY_KEY}_${story.id}`, story);
  }

  undownload(story: Story) {
    story.downloaded = false;
    story.downloadedtimestamp = null;
    if (story.cached) {
      this.storage.set(`${STORY_KEY}_${story.id}`, story);
    } else {
      this.storage.remove(`${STORY_KEY}_${story.id}`);
    }
  }

  cache(story: Story) {
    story.cached = true;
    this.storage.set(`${STORY_KEY}_${story.id}`, story);
  }

  uncache(story: Story) {
    story.cached = false;
    this.undownload(story);
  }

  uncacheAll(excludeDownloaded?: boolean) {
    this.stories.forEach(story => {
      if (!excludeDownloaded || !story.downloaded) {
        this.uncache(story);
      }
    });
  }

  extractFromFeed(item) {
    const cached = this.stories.get(item.what.id);
    if (cached) {
      return cached;
    }

    const author = this.a.extractFromFeed(item.who);
    const story = new Story({
      author,
      id: item.what.id.toString(),
      title: item.what.title,
      description: item.what.description,
      category: decodeHTML(item.what.category_info.name),
      categoryID: item.what.category,
      lang: this.g.getLanguage(item.what.language),
      timestamp: item.when,
      rating: item.what.rate_all,
      viewcount: item.what.view_count,
      url: item.what.url,
      tags: !item.what.tags ? [] : item.what.tags.map(t => t.tag),
      ishot: item.what.is_hot,
      isnew: item.what.is_new,
      iswriterspick: item.what.writers_pick,
      iscontestwinner: item.what.contest_winner,
      commentsenabled: item.what.enable_comments,
      ratingenabled: item.what.allow_vote,
    });

    this.stories.set(story.id, story);
    return story;
  }

  extactFromList(item) {
    const cached = this.stories.get(item.id);
    if (cached) {
      return cached;
    }

    const author = this.a.extractFromFeed(item.author);
    const story = new Story({
      author,
      id: item.id.toString(),
      title: item.title,
      description: item.description,
      category: decodeHTML(item.category_info.name),
      categoryID: item.category,
      lang: this.g.getLanguage(item.language),
      timestamp: Math.round(Date.parse(item.date_added) / 1000),
      rating: item.rate_all,
      viewcount: item.view_count,
      url: item.url,
      tags: !item.tags ? [] : item.tags.map(t => t.tag),
      ishot: item.is_hot,
      isnew: item.is_new,
      iswriterspick: item.writers_pick,
      iscontestwinner: item.contest_winner,
      commentsenabled: item.enable_comments > 0 ? true : false,
      ratingenabled: item.allow_vote,
    });

    this.stories.set(story.id, story);
    return story;
  }

  extractFromSearch(item) {
    const cached = this.stories.get(item.id);
    if (cached) {
      return cached;
    }

    const author = this.a.extractFromSearch(item.user);
    const story = new Story({
      author,
      id: item.id.toString(),
      title: item.name,
      description: item.description,
      category: item.category.name,
      categoryID: item.category.id,
      lang: item.lang,
      timestamp: item.timestamp_published,
      rating: item.rate,
      viewcount: item.view_count,
      url: item.url,
      ishot: item.is_hot === 'no' ? false : true,
      isnew: item.is_new === 'no' ? false : true,
      iswriterspick: item.writers_pick === 'no' ? false : true,
      iscontestwinner: item.contest_winner === 'no' ? false : true,
      commentsenabled: item.enable_comments > 0 ? true : false,
      ratingenabled: item.allow_vote > 0 ? true : false,
    });

    this.stories.set(story.id, story);
    return story;
  }

  extractFromNewSearch(item) {
    const cached = this.stories.get(item.id);
    if (cached) {
      return cached;
    }

    const timestampParts = item.date_approve.split('/');

    const author = this.a.extractFromNewSearch(item.author);
    const story = new Story({
      author,
      id: item.id.toString(),
      title: item.title,
      description: item.description,
      category: decodeHTML(item.category_info.name),
      categoryID: item.category,
      lang: this.g.getLanguage(item.language),
      timestamp: Math.round(Date.parse(`${timestampParts[2]}-${timestampParts[0]}-${timestampParts[1]}T00:00:00`) / 1000),
      rating: item.rate_all,
      viewcount: item.view_count,
      url: item.url,
      ishot: item.is_hot,
      isnew: item.is_new,
      iswriterspick: item.writers_pick,
      iscontestwinner: item.contest_winner > 0 ? true : false,
      commentsenabled: item.enable_comments > 0 ? true : false,
      ratingenabled: item.allow_vote > 0 ? true : false,
    });

    this.stories.set(story.id, story);
    return story;
  }
}
