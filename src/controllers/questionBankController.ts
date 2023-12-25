import { FastifyReply, FastifyRequest } from 'fastify';
import questionBankService from '../services/questionBankService';
import { CreateQuestionBankRequest } from '../dto/createQuestionBankRequest';
import { successResponse, errorResponse } from '../common/dto/apiResponse';
import { QuestionBank } from '../models/questionBank';

export const createQuestionBank = async (request: FastifyRequest<{ Body: CreateQuestionBankRequest }>, reply: FastifyReply) => {
    try {
        const questionBankRequest: CreateQuestionBankRequest = request.body;
        const createdQuestionBank: Omit<QuestionBank, 'question_bank_id'> = await questionBankService.createQuestionBank(questionBankRequest);

        reply.status(201).send(successResponse(201, createdQuestionBank, 'Question bank created.'));
    } catch (error: any) {
        console.log(error)
        reply.status(error.statusCode || 500).send(error);
    }
}

export const getQuestionBank = async (request: FastifyRequest<{ Params: { questionBankId: string } }>, reply: FastifyReply) => {
    try {
        const { questionBankId } = request.params;
        const questionBank: QuestionBank | undefined = await questionBankService.getQuestionBank(questionBankId);
        
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
