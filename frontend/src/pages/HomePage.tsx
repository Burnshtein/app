// pages/HomePage/HomePage.tsx
import { Link } from 'react-router-dom'
import { Header } from '../wigets/Header/Header'

export function HomePage() {
  return (
    <div>
      <Header />
      
      <div className="hero">
        <h1>Добро пожаловать в магазин.</h1>
        <p>Лучшие товары по лучшим ценам.</p>
        <Link to="/catalog">
          <button>Смотреть каталог →</button>
        </Link>
      </div>
    </div>
  )
}