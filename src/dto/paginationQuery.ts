import { SortOrder } from "../types/sortOrder";

export interface PaginationQuery {
    page: string;
    pageCount: string;
    sortBy: string;
    sortOrder: SortOrder;
}