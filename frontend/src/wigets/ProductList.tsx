import { Link } from 'react-router-dom'
import type { Product } from '../entities/product/types'

type ProductListProps = {
  products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return <div className="loading">Товаров не найдено</div>
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <div className="product-card">
            <h3>{product.title}</h3>
            <p>{product.description?.slice(0, 100)}...</p>
            <p className="price">{product.price} ₽</p>
          </div>
        </Link>
      ))}
    </div>
  )
}