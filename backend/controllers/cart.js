export class CartController {
  constructor(cartService) {
    this.cartService = cartService
  }

  async getCart(request, reply) {
    try {
      const userId = request.userId
      return await this.cartService.getCart(userId)
    } catch (err) {
      reply.code(401)
      return { error: err.message }
    }
  }

  async addItem(request, reply) {
    try {
      const userId = request.userId
      const { productId, quantity } = request.body
      const result = await this.cartService.addItem(userId, productId, quantity)
      reply.code(201)
      return { message: 'Товар добавлен в корзину', cartItem: result }
    } catch (err) {
      const status = err.message === 'Товар не найден' ? 404 : 401
      reply.code(status)
      return { error: err.message }
    }
  }

  async updateQuantity(request, reply) {
    try {
      const userId = request.userId
      const id = Number(request.params.id)
      const { quantity } = request.body
      const result = await this.cartService.updateQuantity(userId, id, quantity)
      
      if (result === null) {
        return { message: 'Товар удалён из корзины' }
      }
      return { message: 'Количество обновлено', cartItem: result }
    } catch (err) {
      reply.code(404)
      return { error: err.message }
    }
  }

  async removeItem(request, reply) {
    try {
      const userId = request.userId
      const id = Number(request.params.id)
      await this.cartService.removeItem(userId, id)
      return { message: 'Товар удалён из корзины' }
    } catch (err) {
      reply.code(404)
      return { error: err.message }
    }
  }

  async clearCart(request, reply) {
    try {
      const userId = request.userId
      await this.cartService.clearCart(userId)
      return { message: 'Корзина очищена' }
    } catch (err) {
      reply.code(401)
      return { error: err.message }
    }
  }
}