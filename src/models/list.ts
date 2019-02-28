
import { Story } from './story';

export class List {

  [prop: string]: any;

  id: any;
  urlname: string;
  name: string;
  description: string;
  visibility: boolean;
  size: number;
  isdeletable: boolean;
  createtimestamp: string;
  updatetimestamp: string;

  stories: Story[];

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
