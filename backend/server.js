import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

const fastify = Fastify({ logger: true })

// CORS
await fastify.register(cors, {
  origin: true
})

// JWT
fastify.register(jwt, {
  secret: 'my-super-secret-key-change-me-in-production'
})

// ========== ТОВАРЫ ==========
const products = [
  { id: 1, title: 'Кроссовки Nike Air', price: 8990, description: 'Стильные и удобные кроссовки для повседневной носки' },
  { id: 2, title: 'Футболка хлопок', price: 1990, description: 'Мягкая хлопковая футболка, дышащая' },
  { id: 3, title: 'Джинсы классические', price: 3990, description: 'Классические джинсы прямого кроя' },
  { id: 4, title: 'Кепка black', price: 990, description: 'Черная кепка из натурального хлопка' }
]

fastify.get('/products', async () => {
  return products
})

fastify.get('/products/:id', async (request, reply) => {
  const id = Number(request.params.id)
  const product = products.find(p => p.id === id)
  if (!product) {
    reply.code(404)
    return { error: 'Товар не найден' }
  }
  return product
})

// ========== КОРЗИНА ==========
let cart = []
let nextCartId = 1

fastify.get('/cart', async () => {
  const cartWithProducts = cart.map(item => {
    const product = products.find(p => p.id === item.productId)
    return {
      id: item.id,
      product: product,
      quantity: item.quantity
    }
  })
  return { cart: cartWithProducts }
})

fastify.post('/cart', async (request, reply) => {
  const { productId, quantity } = request.body
  const product = products.find(p => p.id === productId)
  
  if (!product) {
    reply.code(404)
    return { error: 'Товар не найден' }
  }
  
  const existingItem = cart.find(item => item.productId === productId)
  
  if (existingItem) {
    existingItem.quantity += quantity
    return { message: 'Количество обновлено', cartItem: existingItem }
  } else {
    const newItem = { id: nextCartId++, productId, quantity }
    cart.push(newItem)
    reply.code(201)
    return { message: 'Товар добавлен', cartItem: newItem }
  }
})

fastify.put('/cart/:id', async (request, reply) => {
  const id = Number(request.params.id)
  const { quantity } = request.body
  const cartItem = cart.find(item => item.id === id)
  
  if (!cartItem) {
    reply.code(404)
    return { error: 'Товар в корзине не найден' }
  }
  
  cartItem.quantity = quantity
  return { message: 'Количество обновлено', cartItem }
})

fastify.delete('/cart/:id', async (request, reply) => {
  const id = Number(request.params.id)
  const index = cart.findIndex(item => item.id === id)
  if (index === -1) {
    reply.code(404)
    return { error: 'Товар не найден' }
  }
  cart.splice(index, 1)
  return { message: 'Товар удалён' }
})

fastify.delete('/cart', async () => {
  cart = []
  return { message: 'Корзина очищена' }
})

// ========== АВТОРИЗАЦИЯ ==========
let users = [
  { id: 1, email: 'test@test.com', password: '123', username: 'Тестовый пользователь' }
]
let nextUserId = 2

fastify.post('/auth/register', async (request, reply) => {
  const { email, password, username } = request.body
  
  console.log('Регистрация:', { email, username })
  
  const existing = users.find(u => u.email === email)
  if (existing) {
    reply.code(400)
    return { message: 'Пользователь с таким email уже существует' }
  }
  
  const newUser = {
    id: nextUserId++,
    email,
    password,
    username: username || email.split('@')[0]
  }
  users.push(newUser)
  
  const token = fastify.jwt.sign({ userId: newUser.id, email: newUser.email })
  const { password: _, ...userWithoutPassword } = newUser
  
  console.log('Пользователь создан:', userWithoutPassword)
  
  return { user: userWithoutPassword, token: token }
})

fastify.post('/auth/login', async (request, reply) => {
  const { email, password } = request.body
  
  console.log('Попытка входа:', email)
  
  const user = users.find(u => u.email === email && u.password === password)
  
  if (!user) {
    reply.code(401)
    return { message: 'Неверный email или пароль' }
  }
  
  const token = fastify.jwt.sign({ userId: user.id, email: user.email })
  const { password: _, ...userWithoutPassword } = user
  
  console.log('Успешный вход:', userWithoutPassword.username)
  
  return { user: userWithoutPassword, token: token }
})

fastify.post('/auth/logout', async () => {
  return { success: true }
})

fastify.get('/auth/me', async (request, reply) => {
  try {
    const token = request.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      reply.code(401)
      return { message: 'Нет токена' }
    }
    const decoded = fastify.jwt.verify(token)
    const user = users.find(u => u.id === decoded.userId)
    if (!user) {
      reply.code(401)
      return { message: 'Пользователь не найден' }
    }
    const { password: _, ...userWithoutPassword } = user
    return { user: userWithoutPassword }
  } catch (err) {
    reply.code(401)
    return { message: 'Неверный токен' }
  }
})

// ========== ЗАПУСК ==========
const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' })
    console.log('🛍️ Сервер запущен на http://localhost:3001')
    console.log('📦 GET /products - список товаров')
    console.log('🔐 POST /auth/login - вход')
    console.log('📝 POST /auth/register - регистрация')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()