// app/store/slices/productsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../../../entities/product/types'

interface ProductsState {
  products: Product[]
  isLoading: boolean
  error: string | null
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: null
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    }
  }
})

export const { setProducts, setLoading, setError } = productsSlice.actions
export default productsSlice.reducer