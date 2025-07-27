export default async function (app, opts) {
  app.get('/api/me', { preHandler: app.authenticate }, async (request, reply) => {
    return {
      message: "Authenticated access",
      user: request.user
    };
  });
}
