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

  onReady(): boolean {
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
              const sortedList = list.sort((a, b) => (b.downloadedtimestamp as number) - (a.downloadedtimestamp as number));
              resolve(sortedList);
            });
          }
        });
      });
    });
  }

  getStories(): Story[] {
    return this.history.slice();
  }

  getIds(): string[] {
    return this.history.map(story => story.id);
  }

  persist(): Promise<void> {
    return this.storage.set(HISTORY_KEY, this.getIds());
  }

  add(story: Story): Promise<void> {
    const index = this.getIds().indexOf(story.id);
    if (index > -1) {
      this.history.splice(index, 1);
    }

    this.history.push(story);
    return this.persist();
  }

  remove(story: Story, deleteDownloaded?: boolean): Promise<void[]> {
    const index = this.getIds().indexOf(story.id);
    const promises = [];
    if (index > -1) {
      this.history.splice(index, 1);
      promises.push(this.persist());
    }
    if (!story.downloaded || deleteDownloaded) {
      promises.push(this.stories.remove(story));
    }
    return Promise.all(promises);
  }

  reset(): void {
    this.history = [];
    this.storage.set(HISTORY_KEY, []);
    this.stories.removeAll();
  }

  clean(): Promise<void> {
    const maxNumberOfStories = 100;
    return new Promise(resolve => {
      const toRemove = this.history.slice(0, Math.max(this.history.length - maxNumberOfStories, 0));

      if (toRemove.length < 1) {
        resolve();
      } else {
        toRemove.forEach((story, index) => {
          this.remove(story);
        });
        resolve();
      }
    });
  }
}
