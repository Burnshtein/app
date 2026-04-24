export class ProductService {
  constructor(prisma) {
    this.prisma = prisma
  }

  async getAll() {
    return await this.prisma.product.findMany()
  }

  async getById(id) {
    return await this.prisma.product.findUnique({
      where: { id }
    })
  }
}