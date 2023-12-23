import { FastifyInstance } from 'fastify';
import { createQuestionBank, getQuestionBank } from '../controllers/questionBankController';

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
}
