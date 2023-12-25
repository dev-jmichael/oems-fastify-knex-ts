import { FastifyReply, FastifyRequest } from 'fastify';
import questionBankService from '../services/questionBankService';
import { CreateQuestionBankRequest } from '../dto/createQuestionBankRequest';
import { successResponse, errorResponse } from '../common/dto/apiResponse';

export const createQuestionBank = async (request: FastifyRequest<{ Body: CreateQuestionBankRequest }>, reply: FastifyReply) => {
    try {
        const { title, createdBy } = request.body;
        const createdQuestionBank = await questionBankService.createQuestionBank(title, createdBy);
        reply.status(201).send(successResponse(201, createdQuestionBank, 'Question bank created.'));
    } catch (error: any) {
        console.log(error)
        reply.status(error.statusCode || 500).send(error);
    }
}

export const getQuestionBank = async (request: FastifyRequest<{ Params: { questionBankId: string } }>, reply: FastifyReply) => {
    try {
        const { questionBankId } = request.params;
        const questionBank = await questionBankService.getQuestionBank(questionBankId);
        reply.status(200).send(successResponse(200, questionBank));
    } catch (error: any) {
        console.log(error)
        reply.status(error.statusCode || 500).send(error);
    }
}

/** 
* TODO: getAllQuestionBanks()
*
* TODO: updateQuestionBankTitle()
*
* TODO: deleteQuestionBank()
*/
