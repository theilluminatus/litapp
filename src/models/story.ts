
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
  content: string;
  description: string;
  author: string;
  length: number;
}
