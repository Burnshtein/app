export async function getUserIdFromToken(request, reply, fastify) {
  try {
    const token = request.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      reply.code(401)
      throw new Error('Нет токена')
    }
    const decoded = fastify.jwt.verify(token)
    return decoded.userId
  } catch (err) {
    reply.code(401)
    throw new Error('Неверный токен')
  }
}