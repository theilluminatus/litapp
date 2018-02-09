
import { Author } from './author';
import { List } from './list';

export class Story {

  constructor(fields: any) {
    // Quick and dirty extend/assign fields to this model
    for (const f in fields) {
      // @ts-ignore
      this[f] = fields[f];
    }
  }

}

export interface Story {
  [prop: string]: any;

  id: any;
  title: string;
  content: any;
  description: string;
  rating: number;
  category: string;
  tags: string[];
  timestamp: string;
  author: Author;
  url: string;
  length: number;
  currentpage: number;
  viewcount: number;
  lists: List[];
  comments: {
    user: string,
    text: string,
    timestamp: string
  }[];
}
