// entities/product/api.ts
import { axiosInstance } from "../../shared/axiosInstance"
import type { Product } from './types'

export const productApi = {
  getAll: () =>
    axiosInstance.get<Product[]>('/products'),
  
  getById: (id: number) =>
    axiosInstance.get<Product>(`/products/${id}`),
}