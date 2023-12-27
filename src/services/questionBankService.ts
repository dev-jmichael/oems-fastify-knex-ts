import db from "../config/db";
import { QuestionBank, toDto, toEntity } from "../models/questionBank";
import { QuestionBankRepository } from "../repository/questionBankRepository";
import { error } from "../common/dto/apiResponse";
import { CreateQuestionBankRequest } from "../dto/request/createQuestionBankRequest";
import { StatusCodes } from "http-status-codes";
import { PaginatedResponse } from "../dto/response/paginatedResponse";
import { Pagination } from "../types/pagination";
import { buildPaginatedResponse } from "../utils/paginationUtil";
import { QuestionBankResponse } from '../dto/response/questionBankResponse';

const questionBankRepository = new QuestionBankRepository(db);

const createQuestionBank = async (questionBankRequest: CreateQuestionBankRequest): Promise<QuestionBankResponse> => {
    const questionBank = toEntity(questionBankRequest)

    const createdQuestionBank = await questionBankRepository.save(questionBank)
    
    return toDto(createdQuestionBank);
}

const getQuestionBank = async (questionBankId: string): Promise<QuestionBankResponse> => {
    const foundQuestionBank = await questionBankRepository.findById(questionBankId);
    
    if (!foundQuestionBank) {
        throw error(
            StatusCodes.NOT_FOUND, 
            'Resource Not Found', 
            'The requested resource does not exist.', 
            'RESOURCE_NOT_FOUND'
        );
    }
    
    return toDto(foundQuestionBank);
}

const getPaginatedQuestionBanks = async (pagination: Pagination): Promise<PaginatedResponse<QuestionBankResponse>> => {
    const { page, pageSize, offset, sortBy, sortOrder  } = pagination;

    const paginatedQuestionBanks = await questionBankRepository.findAllPaginated(pageSize, offset, sortBy, sortOrder);
    const totalCount = await questionBankRepository.count();

    const questionBankResponse: QuestionBankResponse[] = paginatedQuestionBanks.map(questionBank => toDto(questionBank));
   
    return buildPaginatedResponse(pageSize, page, questionBankResponse, totalCount);
}

export default {
    createQuestionBank,
    getQuestionBank,
    getPaginatedQuestionBanks
}