import { Injectable } from '@angular/core';

import { FeedItem } from '../models/feeditem';
import { Api } from './api/api';

@Injectable()
export class FeedItems {

  constructor(public api: Api) { }

  query(params?: any) {
    return this.api.get('/feed', params);
  }

}
