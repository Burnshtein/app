export async function authRoutes(fastify, controller) {
  fastify.post('/auth/register', controller.register.bind(controller))
  fastify.post('/auth/login', controller.login.bind(controller))
  fastify.post('/auth/logout', controller.logout.bind(controller))
  fastify.get('/auth/me', { preHandler: [fastify.authenticateUser] }, controller.getMe.bind(controller))
}