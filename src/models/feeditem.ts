import { Author } from './author';
import { Story } from './story';

export class FeedItem {
  constructor(fields: any) {
    // Quick and dirty extend/assign fields to this model
    for (const f in fields) {
      // @ts-ignore
      this[f] = fields[f];
    }
  }
}

export interface FeedItem {
  [prop: string]: any;

  id: number;
  author: Author;
  story: Story;
  text: string[];
  timestamp: string;
}
