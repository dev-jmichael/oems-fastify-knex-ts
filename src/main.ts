import Fastify, { FastifyInstance } from 'fastify'
import questionBankRoutes from './routes/questionBankRoutes';
import { createQuestionBankSchema, getQuestionBankSchema } from './routes/validation/questionBankValidator';
import fastify from 'fastify';

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

const start = async () => {
  try {
    await server.listen({ 
      port: 3000,
      host: '127.0.0.1' 
    })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
