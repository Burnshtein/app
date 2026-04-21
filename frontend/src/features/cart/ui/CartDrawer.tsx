import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../../app/store'
import { removeFromCart, updateQuantity, clearCart } from '../../../app/store/slices/cartSlice'

type CartDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { items, totalQuantity, totalPrice } = useSelector((state: RootState) => state.cart)

  if (!isOpen) return null

  return (
    <div className="cart-drawer" style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '420px',
      height: '100%',
      zIndex: 1000,
      padding: '28px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Шапка */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, letterSpacing: '-0.02em', color: '#1c1c1e' }}>Корзина</h2>
        <button onClick={onClose} className="secondary" style={{ padding: '8px 16px', fontSize: '18px' }}>✕</button>
      </div>

      {items.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#6c6c70', padding: '60px 0', fontSize: '17px' }}>Корзина пуста</p>
      ) : (
        <>
          {/* Список товаров */}
          <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {items.map((item) => (
              <div key={item.product.id} className="cart-item" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px'
              }}>
                {/* Информация */}
                <div style={{ flex: 2 }}>
                  <h4 style={{ marginBottom: '4px' }}>{item.product.title}</h4>
                  <p className="price" style={{ fontSize: '17px', fontWeight: 600 }}>
                    ${item.product.price}
                  </p>
                </div>
                
                {/* Контролы количества */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button 
                    onClick={() => dispatch(updateQuantity({ productId: item.product.id, quantity: item.quantity - 1 }))}
                    className="secondary"
                    style={{ padding: '6px 14px', fontSize: '16px' }}
                  >
                    −
                  </button>
                  <span style={{ minWidth: '28px', textAlign: 'center', fontWeight: 500 }}>{item.quantity}</span>
                  <button 
                    onClick={() => dispatch(updateQuantity({ productId: item.product.id, quantity: item.quantity + 1 }))}
                    className="secondary"
                    style={{ padding: '6px 14px', fontSize: '16px' }}
                  >
                    +
                  </button>
                  <button 
                    onClick={() => dispatch(removeFromCart(item.product.id))}
                    className="secondary"
                    style={{ padding: '6px 12px', fontSize: '14px', borderColor: 'rgba(60, 60, 67, 0.2)' }}
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Итого */}
          <div style={{ 
            borderTop: '0.5px solid rgba(60, 60, 67, 0.1)', 
            paddingTop: '24px', 
            marginTop: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: '#6c6c70' }}>Всего товаров:</span>
              <strong>{totalQuantity}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '20px' }}>
              <span style={{ color: '#6c6c70' }}>Итого:</span>
              <strong style={{ fontSize: '24px', fontWeight: 700 }}>${totalPrice}</strong>
            </div>
            
            <button 
              onClick={() => dispatch(clearCart())}
              className="secondary"
              style={{ width: '100%', marginBottom: '12px', borderColor: 'rgba(60, 60, 67, 0.3)' }}
            >
              Очистить корзину
            </button>
            
            <button style={{ width: '100%' }}>
              Оформить заказ →
            </button>
          </div>
        </>
      )}
    </div>
  )
}