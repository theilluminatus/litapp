import { Injectable } from '@angular/core';

import { Story } from '../models/story';
import { Api } from './api/api';

@Injectable()
export class Stories {

  constructor(public api: Api) { }

  query(params?: any) {
    return this.api.get('/stories', params);
  }

  getById(id: any, params?: any) {
    return this.api.get('/stories/'+id, params);
  }

}
