import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'

type CartIconProps = {
  onClick: () => void
}

export function CartIcon({ onClick }: CartIconProps) {
  const { totalQuantity } = useSelector((state: RootState) => state.cart)

  return (
    <button className="cart-icon" onClick={onClick}>
      🛒
      {totalQuantity > 0 && (
        <span className="cart-badge">
          {totalQuantity}
        </span>
      )}
    </button>
  )
}