import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

import { Stories } from './stories';
import { HISTORY_KEY, STORY_KEY } from './db';
import { Story } from '../models/story';

@Injectable()
export class History {
  private ready;
  private history: Story[] = []; // ordered from old to new

  constructor(public stories: Stories, public storage: Storage) {
    this.ready = new Promise((resolve, reject) => {
      Promise.all([this.stories.onReady()]).then(() => {
        this.storage.get(HISTORY_KEY).then(idList => {
          let loadedIndex = 0;
          if (idList) {
            const temp = [];
            idList.forEach((id, index) => {
              this.stories.getById(id).subscribe(story => {
                if (story) {
                  temp[index] = story;
                }

                loadedIndex += 1;
                if (loadedIndex === idList.length) {
                  this.history = temp;
                  this.clean().then(() => resolve());
                }
              });
            });
          } else {
            this.history = [];
            resolve();
          }
        });
      });
    });
  }

  onReady() {
    return this.ready;
  }

  // ordered by downloaded time
  getDownloadStories(): Promise<Story[]> {
    return new Promise(resolve => {
      this.storage.length().then(allStorageLength => {
        const idsList = [];
        this.storage.forEach((value, key, index) => {
          if (key.indexOf(STORY_KEY) > -1) {
            if (value.downloaded) {
              idsList.push(value.id);
            }
          }
          if (index >= allStorageLength) {
            // All ids were gathered
            Observable.forkJoin(idsList.map(id => this.stories.getById(id))).subscribe(list => {
              const sortedList = list.sort((a, b) => b.downloadedtimestamp - a.downloadedtimestamp);
              resolve(sortedList);
            });
          }
        });
      });
    });
  }

  getStories() {
    return this.history.slice();
  }

  getIds() {
    return this.history.map(story => story.id);
  }

  persist() {
    return this.storage.set(HISTORY_KEY, this.getIds());
  }

  add(story: Story) {
    const index = this.getIds().indexOf(story.id);
    if (index > -1) {
      this.history.splice(index, 1);
    }

    this.history.push(story);
    return this.persist();
  }

  remove(story: Story) {
    const index = this.getIds().indexOf(story.id);
    if (index > -1) {
      this.history.splice(index, 1);
      this.stories.remove(story);
      return this.persist();
    }
  }

  reset() {
    this.history = [];
    this.storage.set(HISTORY_KEY, []);
    this.stories.removeAll();
  }

  clean() {
    const maxNumberOfStories = 50;
    return new Promise(resolve => {
      const toRemove = this.history.filter((story, i) => {
        if (i > maxNumberOfStories - 1) {
          return story;
        }
      });

      if (toRemove.length < 1) {
        resolve();
      } else {
        toRemove.forEach((story, index) => {
          if (!story.downloaded) {
            this.remove(story);
          }

          if (index >= toRemove.length - 1) {
            resolve();
          }
        });
      }
    });
  }
}
