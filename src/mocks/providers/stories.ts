import { Injectable } from '@angular/core';

import { Story } from '../../models/story';
// import { Author } from '../../models/author';

@Injectable()
export class Stories {
  stories: Story[] = [];

  constructor() {
    let stories = [
      {
        "title": "Burt Bear",
        "content": "",
        "description": "Burt is a Bear.",
        "author": "Author",
        "length": 10,
        "downloaded": true
      },
      {
        "title": "Charlie Cheetah",
        "content": "",
        "description": "Charlie is a Cheetah.",
        "author": "Author",
        "length": 10,
        "downloaded": false
      },
      {
        "title": "Donald Duck",
        "content": "",
        "description": "Donald is a Duck.",
        "author": "Author",
        "length": 10,
        "downloaded": true
      },
      {
        "title": "Eva Eagle",
        "content": "",
        "description": "Eva is an Eagle.",
        "author": "Author",
        "length": 10,
        "downloaded": false
      },
      {
        "title": "Ellie Elephant",
        "content": "",
        "description": "Ellie is an Elephant.",
        "author": "Author",
        "length": 10,
        "downloaded": true
      },
      {
        "title": "Molly Mouse",
        "content": "",
        "description": "Molly is a Mouse.",
        "author": "Author",
        "length": 10,
        "downloaded": false
      },
      {
        "title": "Paul Puppy",
        "content": "",
        "description": "Paul is a Puppy.",
        "author": "Author",
        "length": 10,
        "downloaded": false
      }
    ];

    let exampleContent = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.\n\n";

    for (let story of stories) {
      Array(20).fill(0).forEach(() => {story.content += exampleContent});
      this.stories.push(new Story(story));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.stories.slice();
    }

    return this.stories.slice().filter((story) => {
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
