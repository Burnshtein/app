export class AuthController {
  constructor(authService) {
    this.authService = authService
  }

  async register(request, reply) {
    try {
      const { email, password, username } = request.body
      const result = await this.authService.register(email, password, username)
      return result
    } catch (err) {
      reply.code(400)
      return { message: err.message }
    }
  }

  async login(request, reply) {
    try {
      const { email, password } = request.body
      const result = await this.authService.login(email, password)
      return result
    } catch (err) {
      reply.code(401)
      return { message: err.message }
    }
  }

  async logout() {
    return { success: true }
  }

  async getMe(request, reply) {
    try {
      const userId = request.userId
      const user = await this.authService.getMe(userId)
      return { user }
    } catch (err) {
      reply.code(401)
      return { message: err.message }
    }
  }
}