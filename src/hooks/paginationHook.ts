import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { DEFAULT_CURRENT_PAGE, DEFAULT_PAGE_SIZE } from "../constants/paginationConstants";
import { PaginationQuery } from '../dto/request/paginationQuery';

export const paginationHook = (request: FastifyRequest< { Querystring: PaginationQuery } >, reply: FastifyReply, done: HookHandlerDoneFunction): void => {
    const currentPage = parseInt(request.query.page) || DEFAULT_CURRENT_PAGE;
    const pageSize = parseInt(request.query.pageSize) || DEFAULT_PAGE_SIZE;
    const offset = (currentPage - 1) * pageSize;
    const sortBy = request.query.sortBy;
    const sortOrder = request.query.sortOrder;

    request.pagination = {
        page: currentPage,
        pageSize: pageSize,
        offset: offset,
        sortBy: sortBy,
        sortOrder: sortOrder
    }

    done();
}