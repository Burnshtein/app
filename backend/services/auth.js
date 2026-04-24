import bcrypt from 'bcrypt'

export class AuthService {
  constructor(prisma, jwt) {
    this.prisma = prisma
    this.jwt = jwt
  }

  async register(email, password, username) {
    const existing = await this.prisma.user.findUnique({
      where: { email }
    })
    
    if (existing) {
      throw new Error('Пользователь с таким email уже существует')
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,  
        username: username || email.split('@')[0]
      }
    })
    
    const token = this.jwt.sign({ userId: newUser.id, email: newUser.email })
    const { password: _, ...userWithoutPassword } = newUser
    
    return { user: userWithoutPassword, token }
  }

  async login(email, password) {
    const user = await this.prisma.user.findUnique({
      where: { email }
    })
    
    if (!user) {
      throw new Error('Неверный email или пароль')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
      throw new Error('Неверный email или пароль')
    }
    
    const token = this.jwt.sign({ userId: user.id, email: user.email })
    const { password: _, ...userWithoutPassword } = user
    
    return { user: userWithoutPassword, token }
  }

  async getMe(userId) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    })
    
    if (!user) {
      throw new Error('Пользователь не найден')
    }
    
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }
}