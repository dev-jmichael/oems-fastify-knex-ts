export interface PaginatedResponse {
    data: Object;
    pagination: {
        page: number;
        pageSize: number;
        totalPages: number;
        totalCount: number;
    }
}