import { SortOrder } from "../types/sortOrder";

export interface PaginationQuery {
    page: string;
    pageSize: string;
    sortBy: string;
    sortOrder: SortOrder;
}