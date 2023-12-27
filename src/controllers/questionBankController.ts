import { FastifyReply, FastifyRequest } from 'fastify';
import questionBankService from '../services/questionBankService';
import { CreateQuestionBankRequest } from '../dto/request/createQuestionBankRequest';
import { success } from '../common/dto/apiResponse';
import { StatusCodes } from 'http-status-codes';
import { PaginationQuery } from '../dto/request/paginationQuery';
import { Pagination } from '../types/pagination';

export const createQuestionBank = async (request: FastifyRequest<{ Body: CreateQuestionBankRequest }>, reply: FastifyReply) => {
    try {
        const questionBankRequest = request.body;
        const createdQuestionBank = await questionBankService.createQuestionBank(questionBankRequest);

        reply.status(StatusCodes.CREATED).send(success(StatusCodes.CREATED, createdQuestionBank, 'Question bank created.'));
    } catch (error: any) {
        console.log(error)
        reply.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
}

export const getQuestionBank = async (request: FastifyRequest<{ Params: { questionBankId: string } }>, reply: FastifyReply) => {
    try {
        const { questionBankId } = request.params;
        const questionBank = await questionBankService.getQuestionBank(questionBankId);

        reply.status(StatusCodes.OK).send(success(StatusCodes.OK, questionBank));
    } catch (error: any) {
        console.log(error)
        reply.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
}

export const getPaginatedQuestionBanks = async (request: FastifyRequest<{ Querystring: PaginationQuery }>, reply: FastifyReply) => {
    try {
        const paginationQuery = request.pagination;
        const paginatedQuestionBanks = await questionBankService.getPaginatedQuestionBanks(paginationQuery);

        reply.status(StatusCodes.OK).send(success(StatusCodes.OK, paginatedQuestionBanks));
    } catch (error: any) {
        console.log(error)
        reply.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
}

/** 
* TODO: getAllQuestionBanks()
*
* TODO: updateQuestionBankTitle()
*
* TODO: deleteQuestionBank()
*/
