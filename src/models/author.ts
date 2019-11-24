import { Story } from './story';

export class Author {
  constructor(fields: any) {
    // Quick and dirty extend/assign fields to this model
    for (const f in fields) {
      // @ts-ignore
      this[f] = fields[f];
    }
  }
}

export interface Author {
  [prop: string]: any;

  id: any;
  name: string;
  picture: string;
  bio: string;
  updatetimestamp: number;
  jointimestamp: number;
  storycount: number;
  following: boolean;
  stories: Story[];
  favs: Story[];
}
