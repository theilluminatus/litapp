
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
  name: string;
  description: string;
  stories: Story[] = [];
}
