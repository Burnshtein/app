// features/auth/model/useAuth.ts
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginSuccess, setLoading, setError, logout } from '../../../app/store/slices/authSlice'
import { userApi } from '../../../entities/user/api'
import type { LoginCredentials, RegisterData } from '../../../entities/user/types'
import type { AppDispatch, RootState } from '../../../app/store'
import { clearCart } from '../../../app/store/slices/cartSlice'

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { isAuthenticated, isLoading, error, user } = useSelector((state: RootState) => state.auth)

  const login = async (credentials: LoginCredentials) => {
    dispatch(setLoading(true))
    try {
      const response = await userApi.login(credentials)
      dispatch(loginSuccess({ user: response.data.user, token: response.data.token }))
      navigate('/catalog')
    } catch (err: any) {
      dispatch(setError(err.response?.data?.message || 'Ошибка входа'))
    } finally {
      dispatch(setLoading(false))
    }
  }

const register = async (data: RegisterData) => {
  dispatch(setLoading(true))
  try {
    const response = await userApi.register(data)
    dispatch(loginSuccess({ user: response.data.user, token: response.data.token }))
    navigate('/catalog')
  } catch (err: any) {
    dispatch(setError(err.response?.data?.message || 'Ошибка регистрации'))
  } finally {
    dispatch(setLoading(false))
  }
}

// useAuth.ts
const logoutUser = async () => {
  try {
    // await userApi.logout()
  } catch (err) {
    console.error(err)
  } finally {
    dispatch(logout())      // очищаем auth
    dispatch(clearCart())   // ← очищаем корзину!
    navigate('/login')
  }
}

  return { login, register, logout: logoutUser, isAuthenticated, isLoading, error, user }
}