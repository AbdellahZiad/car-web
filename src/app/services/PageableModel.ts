export class PageableModel {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
  sort: SortModel;
  constructor(){
    this.offset = null;
    this.pageNumber =0;
    this.pageSize = 20;
    this.paged = null;
    this.unpaged = null;
    this.sort = new SortModel();
  }

}

export class SortModel {
  sorted: boolean;
  unsorted: boolean;
  sort:string;
  direction:any
  constructor(){
    this.sorted = null;
    this.unsorted = null;
    this.sort = 'id';
    this.direction = 'asc'
  }
}

