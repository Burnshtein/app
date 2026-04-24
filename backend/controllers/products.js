export class ProductController {
  constructor(productService) {
    this.productService = productService
  }

  async getAll(request, reply) {
    const products = await this.productService.getAll()
    return products
  }

  async getById(request, reply) {
    const id = Number(request.params.id)
    const product = await this.productService.getById(id)
    
    if (!product) {
      reply.code(404)
      return { error: 'Товар не найден' }
    }
    
    return product
  }
}