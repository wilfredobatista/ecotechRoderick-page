import fp from 'fastify-plugin';
import jwt from 'jsonwebtoken';

export default fp(async function (app, opts) {
  // Decorar request con `user`
  app.decorateRequest('user', null);

  // Middleware de autenticación
  app.decorate('authenticate', async function (request, reply) {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.code(401).send({ error: 'Token no enviado' });
    }

    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      request.user = decoded; // << Aquí se guarda el usuario
    } catch (err) {
      console.error('❌ JWT Error:', err);
      return reply.code(401).send({ error: 'Token inválido o expirado' });
    }
  });
});
