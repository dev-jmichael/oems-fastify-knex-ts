import { PaginatedResponse } from "../dto/paginatedResponse";
import { QuestionBank } from "../models/questionBank";

export const buildPaginatedResponse = async (
    pageSize: number, 
    page: number, 
    paginatedQuestionBanks: QuestionBank[], 
    totalCount: {
        count: number;
    }[]) => {
    const totalItems = totalCount.length > 0 ? totalCount[0].count : 0;
    const totalPages = Math.ceil(totalItems / pageSize);

    const response: PaginatedResponse = {
        data: paginatedQuestionBanks,
        pagination: {
            page,
            pageSize,
            totalPages,
            totalItems
        }
    }

    return response;
}