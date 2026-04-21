// app/store/slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../../../entities/product/types'

export type CartItem = {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
  totalQuantity: number
  totalPrice: number
}

// Функция для сохранения корзины в localStorage
const saveCartToStorage = (items: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(items))
}

// Функция для загрузки корзины из localStorage
const loadCartFromStorage = (): CartItem[] => {
  const saved = localStorage.getItem('cart')
  return saved ? JSON.parse(saved) : []
}

const calculateTotals = (items: CartItem[]) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  return { totalQuantity, totalPrice }
}

const initialState: CartState = {
  items: loadCartFromStorage(),
  totalQuantity: 0,
  totalPrice: 0
}

// Пересчитываем totals для начального состояния
const { totalQuantity, totalPrice } = calculateTotals(initialState.items)
initialState.totalQuantity = totalQuantity
initialState.totalPrice = totalPrice

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload
      const existingItem = state.items.find(item => item.product.id === product.id)
      
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.items.push({ product, quantity: 1 })
      }
      
      const totals = calculateTotals(state.items)
      state.totalQuantity = totals.totalQuantity
      state.totalPrice = totals.totalPrice
      
      saveCartToStorage(state.items)
    },
    
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload
      state.items = state.items.filter(item => item.product.id !== productId)
      
      const totals = calculateTotals(state.items)
      state.totalQuantity = totals.totalQuantity
      state.totalPrice = totals.totalPrice
      
      saveCartToStorage(state.items)
    },
    
    updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const { productId, quantity } = action.payload
      const item = state.items.find(item => item.product.id === productId)
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(i => i.product.id !== productId)
        } else {
          item.quantity = quantity
        }
      }
      
      const totals = calculateTotals(state.items)
      state.totalQuantity = totals.totalQuantity
      state.totalPrice = totals.totalPrice
      
      saveCartToStorage(state.items)
    },
    
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalPrice = 0
      localStorage.removeItem('cart')
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer