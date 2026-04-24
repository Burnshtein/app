export class CartService {
  constructor(prisma) {
    this.prisma = prisma
  }

  async getCart(userId) {
    const cartItems = await this.prisma.cartItem.findMany({
      where: { userId },
      include: { product: true }
    })
    
    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    
    return { cart: cartItems, total }
  }

  async addItem(userId, productId, quantity) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId }
    })
    
    if (!product) {
      throw new Error('Товар не найден')
    }
    
    const existingItem = await this.prisma.cartItem.findFirst({
      where: { userId, productId }
    })
    
    if (existingItem) {
      return await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      })
    } else {
      return await this.prisma.cartItem.create({
        data: { userId, productId, quantity }
      })
    }
  }

  async updateQuantity(userId, itemId, quantity) {
    const cartItem = await this.prisma.cartItem.findFirst({
      where: { id: itemId, userId }
    })
    
    if (!cartItem) {
      throw new Error('Товар в корзине не найден')
    }
    
    if (quantity <= 0) {
      await this.prisma.cartItem.delete({ where: { id: itemId } })
      return null
    }
    
    return await this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity }
    })
  }

  async removeItem(userId, itemId) {
    const cartItem = await this.prisma.cartItem.findFirst({
      where: { id: itemId, userId }
    })
    
    if (!cartItem) {
      throw new Error('Товар в корзине не найден')
    }
    
    await this.prisma.cartItem.delete({ where: { id: itemId } })
    return true
  }

  async clearCart(userId) {
    await this.prisma.cartItem.deleteMany({
      where: { userId }
    })
    return true
  }
}