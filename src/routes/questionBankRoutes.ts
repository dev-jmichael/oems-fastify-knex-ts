import { FastifyInstance } from 'fastify';
import { createQuestionBank, getQuestionBank, getPaginatedQuestionBanks } from '../controllers/questionBankController';
import { paginationHook } from '../hooks/paginationHook';

export default async (fastify: FastifyInstance) => {
    fastify.post('/question-banks', {
        schema: {
            body: { $ref: 'createQuestionBankSchema#' }
        },
        handler: createQuestionBank
    });
    fastify.get('/question-banks/:questionBankId', {
        schema: {
            params: { $ref: 'getQuestionBankSchema#' }
        },
        handler: getQuestionBank
    });
    fastify.get('/question-banks', { preHandler: paginationHook }, getPaginatedQuestionBanks);
}
