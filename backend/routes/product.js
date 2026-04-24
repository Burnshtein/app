export async function productRoutes(fastify, controller) {
  fastify.get('/products', controller.getAll.bind(controller))
  fastify.get('/products/:id', controller.getById.bind(controller))
}