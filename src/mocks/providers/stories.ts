import { Injectable } from '@angular/core';

import { Story } from '../../models/story';
// import { Author } from '../../models/author';

@Injectable()
export class Stories {
  stories: Story[] = [];

  constructor() {
    let stories = [
      {
        "name": "Burt Bear",
        "content": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        "description": "Burt is a Bear.",
        "author": "Author",
        "length": 10,
        "downloaded": true
      },
      {
        "name": "Charlie Cheetah",
        "content": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        "description": "Charlie is a Cheetah.",
        "author": "Author",
        "length": 10,
        "downloaded": false
      },
      {
        "name": "Donald Duck",
        "content": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        "description": "Donald is a Duck.",
        "author": "Author",
        "length": 10,
        "downloaded": true
      },
      {
        "name": "Eva Eagle",
        "content": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        "description": "Eva is an Eagle.",
        "author": "Author",
        "length": 10,
        "downloaded": false
      },
      {
        "name": "Ellie Elephant",
        "content": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        "description": "Ellie is an Elephant.",
        "author": "Author",
        "length": 10,
        "downloaded": true
      },
      {
        "name": "Molly Mouse",
        "content": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        "description": "Molly is a Mouse.",
        "author": "Author",
        "length": 10,
        "downloaded": false
      },
      {
        "name": "Paul Puppy",
        "content": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        "description": "Paul is a Puppy.",
        "author": "Author",
        "length": 10,
        "downloaded": false
      }
    ];

    for (let story of stories) {
      this.stories.push(new Story(story));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.stories;
    }

    return this.stories.filter((story) => {
      for (let key in params) {
        let field = story[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return story;
        } else if (field == params[key]) {
          return story;
        }
      }
      return null;
    });
  }

  getById(id: any) {
    return this.stories[0];
  }

}
