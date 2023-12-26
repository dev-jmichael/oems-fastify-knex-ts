import db from "../config/db";
import { QuestionBank } from "../models/questionBank";
import { QuestionBankRepository } from "../repository/questionBankRepository";
import { error } from "../common/dto/apiResponse";
import { CreateQuestionBankRequest } from "../dto/createQuestionBankRequest";
import { StatusCodes } from "http-status-codes";
import { PaginationQuery } from "../dto/paginationQuery";
import { PaginatedResponse } from "../dto/paginatedResponse";
import { DEFAULT_CURRENT_PAGE, DEFAULT_PAGE_SIZE } from "../constants/paginationConstants";

const questionBankRepository = new QuestionBankRepository(db);

const createQuestionBank = async (questionBankRequest: CreateQuestionBankRequest): Promise<QuestionBank> => {
    const questionBank: Omit<QuestionBank, 'question_bank_id' | 'created_at'> = { ...questionBankRequest }

    const createdQuestionBank = await questionBankRepository.save(questionBank)

    return createdQuestionBank;
}

const getQuestionBank = async (questionBankId: string): Promise<QuestionBank> => {
    const foundQuestionBank = await questionBankRepository.findById(questionBankId);
    
    if (!foundQuestionBank) {
        throw error(
            StatusCodes.NOT_FOUND, 
            'Resource Not Found', 
            'The requested resource does not exist.', 
            'RESOURCE_NOT_FOUND'
        );
    }
    
    return foundQuestionBank;
}

const getPaginatedQuestionBanks = async (paginationQuery: PaginationQuery): Promise<PaginatedResponse> => {
    const currentPage = parseInt(paginationQuery.page) || DEFAULT_CURRENT_PAGE;
    const pageSize = parseInt(paginationQuery.pageCount) || DEFAULT_PAGE_SIZE;
    const offset = (currentPage - 1) * pageSize;
    const sortBy = paginationQuery.sortBy;
    const sortOrder = paginationQuery.sortOrder;

    const paginatedQuestionBanks = await questionBankRepository.findAllPaginated(pageSize, offset, sortBy, sortOrder);

    const totalCountArr = await questionBankRepository.count();
    const totalItems = totalCountArr.length > 0 ? totalCountArr[0].count : 0;
    const totalPages = Math.ceil(totalItems / pageSize);

    const response: PaginatedResponse = {
        data: paginatedQuestionBanks,
        pagination: {
            currentPage,
            pageSize,
            totalPages,
            totalItems
        }
    }

    return response;
}

export default {
    createQuestionBank,
    getQuestionBank,
    getPaginatedQuestionBanks
}