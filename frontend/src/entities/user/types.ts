// entities/user/types.ts
export type User = {
  id: number
  email: string
  username: string
}

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterData = {
  email: string
  username: string
  password: string
}

export type AuthResponse = {
  token: string
  user: User
}