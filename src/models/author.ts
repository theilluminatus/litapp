
import { Story } from './story';

export class Author {

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

  constructor(fields: any) {
    // Quick and dirty extend/assign fields to this model
    for (const f in fields) {
      if (typeof fields[f] !== 'function') {
        // @ts-ignore
        this[f] = fields[f];
      }
    }
  }

}
