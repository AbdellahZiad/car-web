import {PageableModel} from './PageableModel';

export class ListRequestModel {
  filter: any;
  pageable: PageableModel;

  constructor() {
    this.filter = {};
    this.pageable = new PageableModel();
  }
}


export class UsersListRequestModel {
  filter: string;
  pageable: PageableModel;
}


