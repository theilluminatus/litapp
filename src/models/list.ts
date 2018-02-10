
import { Story } from './story';

export class List {

  constructor(fields: any) {
    // Quick and dirty extend/assign fields to this model
    for (const f in fields) {
      // @ts-ignore
      this[f] = fields[f];
    }
  }

}

export interface List {
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
}
