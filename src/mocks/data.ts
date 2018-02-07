
import { Story } from '../models/story';
import { Author } from '../models/author';
import { List } from '../models/list';
import { FeedItem } from '../models/feeditem';


// > STORIES

function fillContent(): string {
  let content = "";
  let exampleContent = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.\n\n";

  Array(15).fill(0).forEach(() => {content += exampleContent});
  return content;
}

let defstories: Story[] = [
  new Story({
    "id": 0,
    "title": "Burt Bear",
    "content": fillContent(),
    "description": "Burt is a Bear.",
    "length": 10,
    "rating": 4.24,
    "downloaded": true
  }),
  new Story({
    "id": 1,
    "title": "Charlie Cheetah",
    "content": fillContent(),
    "description": "Charlie is a Cheetah.",
    "length": 15,
    "rating": 4.14,
    "downloaded": false
  }),
  new Story({
    "id": 2,
    "title": "Donald Duck",
    "content": fillContent(),
    "description": "Donald is a Duck.",
    "length": 30,
    "rating": 3.15,
    "downloaded": true
  }),
  new Story({
    "id": 3,
    "title": "Eva Eagle",
    "content": fillContent(),
    "description": "Eva is an Eagle.",
    "length": 45,
    "rating": 3.98,
    "downloaded": false
  }),
  new Story({
    "id": 4,
    "title": "Ellie Elephant",
    "content": fillContent(),
    "description": "Ellie is an Elephant.",
    "length": 12,
    "rating": 2.50,
    "downloaded": true
  }),
  new Story({
    "id": 5,
    "title": "Molly Mouse",
    "content": fillContent(),
    "description": "Molly is a Mouse.",
    "length": 45,
    "rating": 4.60,
    "downloaded": false
  }),
  new Story({
    "id": 6,
    "title": "Paul Puppy",
    "content": fillContent(),
    "description": "Paul is a Puppy.",
    "length": 18,
    "rating": 4.75,
    "downloaded": false
  })
];


// > AUTHORS

let defauthors: Author[] = [
  new Author({
    "id": 0,
    "name": "John",
    "picture": "assets/img/speakers/bear.jpg",
    "bio": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    "following": true,
    "stories": [ defstories[0], defstories[1], defstories[2] ],
    "favs": [ defstories[4], defstories[5] ]
  }),
  new Author({
    "id": 1,
    "name": "Bert",
    "picture": "assets/img/speakers/elephant.jpg",
    "bio": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    "following": false,
    "stories": [ defstories[4], defstories[5] ],
    "favs": [ defstories[6] ]
  }),
  new Author({
    "id": 2,
    "name": "Megan",
    "picture": "assets/img/speakers/eagle.jpg",
    "bio": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    "following": true,
    "stories": [ defstories[6] ],
    "favs": []
  })
];


// > LISTS

let deflists: List[] = [
  new List({
    "id": 0,
    "name": "Favourites",
    "description": "heart.",
    "stories": defstories
  }),
  new List({
    "id": 1,
    "name": "ToRead",
    "description": "Waiting.",
    "stories": [defstories[0], defstories[2], defstories[4]]
  }),
  new List({
    "id": 2,
    "name": "Read",
    "description": "All stories.",
    "stories": []
  })
];


// > FEED

let deffeeditems: FeedItem[] = [
  new FeedItem({
    "author": defauthors[0],
    "subject": "author",
    "text": "edited their bio.",
    "timestamp": "31/12/2017"
  }),
  new FeedItem({
    "author": defauthors[0],
    "subject": "story",
    "story": defstories[0],
    "text": "published a new story.",
    "timestamp": "30/12/2017"
  }),
  new FeedItem({
    "author": defauthors[2],
    "subject": "story",
    "story": defstories[1],
    "text": "published a new story.",
    "timestamp": "29/12/2017"
  }),
  new FeedItem({
    "author": defauthors[1],
    "subject": "author",
    "text": "changed their relationship status.",
    "timestamp": "28/12/2017"
  }),
  new FeedItem({
    "author": defauthors[2],
    "subject": "author",
    "text": "changed their birthday.",
    "timestamp": "27/12/2017"
  }),
  new FeedItem({
    "author": defauthors[1],
    "subject": "story",
    "story": defstories[2],
    "text": "published a new story.",
    "timestamp": "10/12/2017"
  }),
  new FeedItem({
    "author": defauthors[2],
    "subject": "author",
    "text": "edited their bio.",
    "timestamp": "9/12/2017"
  })
];


// > FILL EXTRAS

defstories[0].author = defauthors[0];
defstories[0].lists = deflists;

defstories[1].author = defauthors[1];
defstories[1].lists = [deflists[0]];

defstories[2].author = defauthors[1];
defstories[2].lists = [deflists[1],deflists[2]];

defstories[3].author = defauthors[2];
defstories[3].lists = [deflists[0],deflists[1]];

defstories[4].author = defauthors[2];
defstories[4].lists = [deflists[0],deflists[2]];

defstories[5].author = defauthors[1];
defstories[5].lists = [deflists[0]];

defstories[6].author = defauthors[0];
defstories[6].lists = [];


// > EXPORTS

export { defstories, defauthors, deflists, deffeeditems };
