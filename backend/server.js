import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { PrismaClient } from '@prisma/client'

import { ProductService } from './services/products.js'
import { AuthService } from './services/auth.js'
import { CartService } from './services/cart.js'

import { ProductController } from './controllers/products.js'
import { AuthController } from './controllers/auth.js'
import { CartController } from './controllers/cart.js'

import { productRoutes } from './routes/products.js'
import { authRoutes } from './routes/auth.js'
import { cartRoutes } from './routes/cart.js'

const fastify = Fastify({ logger: true })
const prisma = new PrismaClient()

await fastify.register(cors, { origin: true })

fastify.register(jwt, {
  secret: 'my-super-secret-key-change-me-in-production'
})

fastify.decorate('prisma', prisma)

fastify.decorate('authenticateUser', async (request, reply) => {
  try {
    const token = request.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      reply.code(401)
      throw new Error('Нет токена')
    }
    const decoded = fastify.jwt.verify(token)
    request.userId = decoded.userId
  } catch (err) {
    reply.code(401)
    throw new Error('Неверный токен')
  }
})

const productService = new ProductService(prisma)
const authService = new AuthService(prisma, fastify.jwt)
const cartService = new CartService(prisma)

const productController = new ProductController(productService)
const authController = new AuthController(authService)
const cartController = new CartController(cartService)

// ========== РЕГИСТРАЦИЯ МАРШРУТОВ ==========
await productRoutes(fastify, productController)
await authRoutes(fastify, authController)
await cartRoutes(fastify, cartController)

const start = async () => {
  try {
    await prisma.$connect()
    console.log('✅ База данных подключена')
    
    await fastify.listen({ port: 3001, host: '0.0.0.0' })
    console.log('🛍️ Сервер запущен на http://localhost:3001')
    console.log('📦 GET /products - список товаров')
    console.log('🔐 POST /auth/login - вход')
    console.log('📝 POST /auth/register - регистрация')
    console.log('🛒 GET /cart - корзина (требует токен)')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()