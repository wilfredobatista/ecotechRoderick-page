import { loginUser, registerUser } from '../controllers/auth.controller.js';

export default async function (app, opts) {
  app.post('/login', async (request, reply) => {
    const result = await loginUser(app, request.body);

    if (result.error) {
      return reply.code(result.code).send({ error: result.error });
    }

    return reply.send(result);
  });

  app.post('/register', { preHandler: app.authenticate }, async (request, reply) => {
    const result = await registerUser(app, request, reply);

    if (result.error) return reply.code(result.code).send({ error: result.error });
    return reply.send(result);
  });

}
