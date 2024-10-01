export interface PageOutput {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  content: any[];
  number: number;
  sort: Sort[];
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}

interface Pageable {
  offset: number;
  sort: Sort[];
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}

interface Sort {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}
