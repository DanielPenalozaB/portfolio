
export interface ApiResponse<T> {
  data: T;
  meta: Meta;
}

export interface Meta {
  pagination?: Pagination;
}

export interface Pagination {
  page:      number;
  pageSize:  number;
  pageCount: number;
  total:     number;
}