import accountController from '../controllers/account.controller.js';

export default async function (app, opts) {
  // GET /api/account
  app.get('/api/account', { preHandler: app.authenticate }, async (request, reply) => {
    const result = await accountController.getAccount(app, request.user.id);

    if (result.error) {
      return reply.code(result.code).send({ error: result.error });
    }

    return reply.send(result);
  });

  // PATCH /api/account
  app.patch('/api/account', { preHandler: app.authenticate }, async (request, reply) => {
    return accountController.updateAccount(app, request, reply);
  });

  app.patch('/api/account/password', { preHandler: app.authenticate }, async (request, reply) => {
  return accountController.changePassword(app, request, reply);
  });
}
