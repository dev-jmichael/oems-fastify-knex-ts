import { FastifyReply, FastifyRequest } from 'fastify';
import questionBankService from '../services/questionBankService';
import { CreateQuestionBankRequest } from '../dto/createQuestionBankRequest';
import { success } from '../common/dto/apiResponse';
import { StatusCodes } from 'http-status-codes';

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

/** 
* TODO: getAllQuestionBanks()
*
* TODO: updateQuestionBankTitle()
*
* TODO: deleteQuestionBank()
*/
