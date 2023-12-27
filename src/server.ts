import Fastify, { FastifyInstance } from 'fastify'
import questionBankRoutes from './routes/questionBankRoutes';
import { createQuestionBankSchema, getQuestionBankSchema } from './routes/validation/questionBankValidator';
import { paginationHook } from './hooks/paginationHook';
import fastifyCors from '@fastify/cors';

const buildServer = () => {
    const server: FastifyInstance = Fastify({ 
        logger: { //disable logger in production
          transport: {
            target: 'pino-pretty',
          },
        },
    });
      
    //Plugins
    server.register(fastifyCors, { origin: 'http://localhost:5173' })
    server.register(questionBankRoutes, { prefix: '/api/v1' });
    
    //Validation schemas
    server.addSchema(createQuestionBankSchema);
    server.addSchema(getQuestionBankSchema);

    //Hooks
    server.addHook('preHandler', paginationHook);

    return server;
}

export default buildServer;
