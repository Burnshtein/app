import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from '../wigets/Header/Header'
import { addToCart } from '../app/store/slices/cartSlice'
import { productApi } from '../entities/product/api'
import type { Product } from '../entities/product/types'
import type { AppDispatch } from '../app/store'
import { RootState } from '../app/store'

export function ProductPage() {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Проверяем, есть ли товар уже в корзине
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const isInCart = product ? cartItems.some(item => item.product.id === product.id) : false

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const response = await productApi.getById(Number(id))
        setProduct(response.data)
      } catch (err) {
        setError('Товар не найден')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) return (
    <div>
      <Header />
      <div className="container">
        <div className="loading" style={{ marginTop: '80px' }}>Загрузка товара...</div>
      </div>
    </div>
  )

  if (error || !product) return (
    <div>
      <Header />
      <div className="container">
        <div className="error" style={{ marginTop: '80px' }}>{error || 'Товар не найден'}</div>
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link to="/catalog" style={{ color: '#3a6ea5' }}>← Вернуться в каталог</Link>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <Header />
      <div className="container" style={{ padding: '60px 0' }}>
        <Link to="/catalog" style={{ 
          display: 'inline-block', 
          marginBottom: '40px',
          color: '#3a6ea5',
          textDecoration: 'none'
        }}>
          ← Назад к каталогу
        </Link>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '60px',
          alignItems: 'start'
        }}>
          {/* Левая колонка — заглушка под фото */}
          <div style={{
            background: 'linear-gradient(135deg, #f5f5f7 0%, #ffffff 100%)',
            borderRadius: '32px',
            padding: '60px',
            textAlign: 'center',
            border: '1px solid rgba(60, 60, 67, 0.06)',
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '120px', opacity: 0.8 }}>📦</span>
          </div>
          
          {/* Правая колонка — информация */}
          <div>
            <h1 className="page-title" style={{ marginTop: 0, marginBottom: '16px' }}>
              {product.title}
            </h1>
            
            <div className="price" style={{ 
              fontSize: '48px', 
              marginBottom: '32px',
              borderBottom: '0.5px solid rgba(60, 60, 67, 0.1)',
              paddingBottom: '24px'
            }}>
              ${product.price}
            </div>
            
            <p style={{ 
              color: '#6c6c70', 
              lineHeight: 1.6, 
              fontSize: '17px',
              marginBottom: '32px'
            }}>
              {product.description}
            </p>
            
            <button 
              onClick={() => dispatch(addToCart(product))}
              disabled={isInCart}
              style={{ 
                width: '100%', 
                marginBottom: '16px',
                opacity: isInCart ? 0.7 : 1
              }}
            >
              {isInCart ? '✓ Уже в корзине' : 'Добавить в корзину →'}
            </button>
            
            <button 
              className="secondary"
              onClick={() => window.location.href = '/catalog'}
              style={{ width: '100%' }}
            >
              Продолжить покупки
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}