export interface PaginationType {
  arrOfCurrButtons: string[];
  currentPage: number;
  limit: number;
}

export type FormatPaginationParams = Omit<
  PaginationType,
  'arrOfCurrButtons'
> & {
  totalCount: number;
};

export interface PaginationTableType {
  currentPage: number;
  totalPage: number;
}
