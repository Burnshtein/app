export async function cartRoutes(fastify, controller) {
  fastify.get('/cart', { preHandler: [fastify.authenticateUser] }, controller.getCart.bind(controller))
  fastify.post('/cart', { preHandler: [fastify.authenticateUser] }, controller.addItem.bind(controller))
  fastify.put('/cart/:id', { preHandler: [fastify.authenticateUser] }, controller.updateQuantity.bind(controller))
  fastify.delete('/cart/:id', { preHandler: [fastify.authenticateUser] }, controller.removeItem.bind(controller))
  fastify.delete('/cart', { preHandler: [fastify.authenticateUser] }, controller.clearCart.bind(controller))
}