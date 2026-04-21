// entities/user/api.ts
import { axiosInstance } from "../../shared/axiosInstance"
import type { LoginCredentials, RegisterData, AuthResponse, User } from './types'

export const userApi = {
  login: (credentials: LoginCredentials) =>
    axiosInstance.post<AuthResponse>('/auth/login', credentials),
  
  register: (data: RegisterData) =>
    axiosInstance.post<AuthResponse>('/auth/register', data),
  
  logout: () =>
    axiosInstance.post('/auth/logout'),
  
  getProfile: () =>
    axiosInstance.get<User>('/auth/me'),
}