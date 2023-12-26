export interface PaginatedResponse {
    data: Object;
    pagination: {
        currentPage: number;
        pageSize: number;
        totalPages: number;
        totalItems: number;
    }
}