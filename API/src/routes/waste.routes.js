import {
  createWasteType,
  getAllWasteTypes,
  getWasteTypeById
} from '../controllers/waste.controller.js';

export default async function wasteRoutes(fastify, opts) {
  fastify.get('/waste-types', getAllWasteTypes);
  fastify.get('/waste-types/:id', getWasteTypeById);

  fastify.post('/waste-types', {
  preHandler: [
    fastify.authenticate,
    async function (request, reply) {
      if (request.user.role !== 'admin') {
        return reply.code(403).send({ message: 'Access denied: only admin can create waste types' });
      }
    }
  ],
  schema: {
    body: {
      type: 'object',
      required: ['name', 'category', 'base_price'],
      properties: {
        name: { type: 'string' },
        category: { type: 'string' },
        base_price: { type: 'number' }
      }
    }
  }
}, createWasteType);
}
