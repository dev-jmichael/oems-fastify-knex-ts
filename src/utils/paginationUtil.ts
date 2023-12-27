import { PaginatedResponse } from "../dto/response/paginatedResponse";

export const buildPaginatedResponse = <T>(
    pageSize: number, 
    page: number, 
    paginatedData: T[], 
    totalCount: {
        count: number;
    }[]) => {
    const totalItems = totalCount.length > 0 ? totalCount[0].count : 0;
    const totalPages = Math.ceil(totalItems / pageSize);

    const response: PaginatedResponse<T> = {
        data: paginatedData,
        pagination: {
            page,
            pageSize,
            totalPages,
            totalItems
        }
    }

    return response;
}