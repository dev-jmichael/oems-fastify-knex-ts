import { FastifyRequest } from 'fastify';
import { SortOrder } from './sortOrder';

export interface Pagination {
    page: number;
    pageSize: number;
    offset: number;
    sortBy: string;
    sortOrder: SortOrder
}

declare module 'fastify' {
    interface FastifyRequest {
        pagination: Pagination;
    }
}