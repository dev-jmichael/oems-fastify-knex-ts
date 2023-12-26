import db from "../config/db";
import { QuestionBank } from "../models/questionBank";
import { QuestionBankRepository } from "../repository/questionBankRepository";
import { error } from "../common/dto/apiResponse";
import { CreateQuestionBankRequest } from "../dto/createQuestionBankRequest";
import { StatusCodes } from "http-status-codes";
import { PaginationQuery } from '../dto/paginationQuery';
import { PaginatedResponse } from "../dto/paginatedResponse";
import { DEFAULT_CURRENT_PAGE, DEFAULT_PAGE_SIZE } from "../constants/paginationConstants";
import { Pagination } from "../types/pagination";
import { FastifyRequest } from "fastify";
import { buildPaginatedResponse } from "../utils/paginationUtil";

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

const getPaginatedQuestionBanks = async (pagination: Pagination): Promise<PaginatedResponse> => {
    const { page, pageSize, offset, sortBy, sortOrder  } = pagination;

    const paginatedQuestionBanks = await questionBankRepository.findAllPaginated(pageSize, offset, sortBy, sortOrder);
    const totalCount = await questionBankRepository.count();

    const response = buildPaginatedResponse(pageSize, page, paginatedQuestionBanks, totalCount);
    
    return response;
}

export default {
    createQuestionBank,
    getQuestionBank,
    getPaginatedQuestionBanks
}