export interface PaginatedResponse {
    data: Object;
    pagination: {
        page: number;
        pageSize: number;
        totalPages: number;
        totalItems: number;
    }
}