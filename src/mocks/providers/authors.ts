import { Injectable } from '@angular/core';

import { Author } from '../../models/author';
import { defauthors } from '../data';


@Injectable()
export class Authors {

  authors: Author[];

  constructor() {
    this.authors = defauthors;
  }

  query(params?: any) {
    if (!params) {
      return this.authors;
    }

    return this.authors.filter((author) => {
      for (let key in params) {
        let field = author[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return author;
        } else if (field == params[key]) {
          return author;
        }
      }
      return null;
    });
  }

  getById(id: any) {
    return this.authors[0];
  }

  add(author: Author) {
    this.authors.push(author);
  }

  delete(author: Author) {
    this.authors.splice(this.authors.indexOf(author), 1);
  }
}
