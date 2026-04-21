import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../features/auth/model/useAuth'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login({ email, password })
  }

  return (
    <div className="container">
      <div className="form">
        <h2>Вход</h2>
        
        {error && <div className="error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Загрузка...' : 'Войти →'}
          </button>
        </form>
        
        <p style={{ 
          textAlign: 'center', 
          marginTop: '24px', 
          color: '#6c6c70',
          fontSize: '15px'
        }}>
          Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
        </p>
      </div>
    </div>
  )
}