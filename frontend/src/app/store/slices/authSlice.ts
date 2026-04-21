// app/store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { storage } from '../../../shared/lib/localStorage'
import type { User } from '../../../entities/user/types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: storage.getUser(),
  token: storage.getToken(),
  isAuthenticated: !!storage.getToken(),
  isLoading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.error = null
      storage.setToken(action.payload.token)
      storage.setUser(action.payload.user)
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      storage.clear()
    }
  }
})

export const { setLoading, setError, loginSuccess, logout } = authSlice.actions
export default authSlice.reducer