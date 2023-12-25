import Fastify, { FastifyInstance } from 'fastify'
import questionBankRoutes from './routes/questionBankRoutes';
import { createQuestionBankSchema, getQuestionBankSchema } from './routes/validation/questionBankValidator';

const buildServer = () => {
    const server: FastifyInstance = Fastify({ 
        logger: { //disable logger in production
          transport: {
            target: 'pino-pretty',
          },
        },
    });
      
    //Plugins
    server.register(questionBankRoutes, { prefix: '/api/v1' });
    
    //Validation schemas
    server.addSchema(createQuestionBankSchema);
    server.addSchema(getQuestionBankSchema);

    return server;
}

export default buildServer;
