// widgets/Header/Header.tsx
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAuth } from '../../features/auth/model/useAuth'
import { CartIcon } from '../../features/cart/ui/CartIcon'
import { CartDrawer } from '../../features/cart/ui/CartDrawer'
import { useState } from 'react'
import type { RootState } from '../../app/store'

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { logout, isAuthenticated, user } = useAuth()
  const { totalQuantity } = useSelector((state: RootState) => state.cart)

  return (
    <>
      <header className="header">
        <div className="header-content">
          <nav>
            <Link to="/">Главная</Link>
            <Link to="/catalog">Каталог</Link>
          </nav>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {/* КНОПКА КОРЗИНЫ */}
            <div className="cart-icon" onClick={() => setIsCartOpen(true)}>
              🛒
              {totalQuantity > 0 && (
                <span className="cart-badge">{totalQuantity}</span>
              )}
            </div>
            
            {isAuthenticated ? (
              <>
                <span>Привет, {user?.username}!</span>
                <button onClick={logout} style={{ background: 'none', color: '#0071e3', padding: 0 }}>
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Войти</Link>
                <Link to="/register">Регистрация</Link>
              </>
            )}
          </div>
        </div>
      </header>
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}