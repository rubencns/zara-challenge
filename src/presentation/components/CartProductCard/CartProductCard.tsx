import Image from 'next/image'
import style from './CartProductCard.module.css'
import type { CartItem } from '@/domain/entities/CartItem'

interface Props {
  cartItem: CartItem
  onRemove: (cartItemId: string) => void
}

const CartProductCard = (props: Props) => {
  const { cartItem, onRemove } = props

  const { product } = cartItem

  return (
    <article className={style.cartProduct}>
      <div className={style.cartProductImageContainer}>
        <Image
          src={product.colorSelected.imageUrl}
          alt={`${product.brand} ${product.name} in ${product.colorSelected.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 262px"
        />
      </div>
      <div className={style.cartProductDetails}>
        <div className={style.cartProductDetailsInfo}>
          <p className="body-extra-small">{product.name}</p>
          <p className="body-extra-small">
            {product.storageSelected.capacity} | {product.colorSelected.name}
          </p>
          <p className={`body-extra-small ${style.price}`}>{product.basePrice + product.storageSelected.price} EUR</p>
        </div>
        <button
          type="button"
          className={style.cartProductRemove}
          aria-label={`Remove ${product.name} from cart`}
          onClick={() => onRemove(cartItem.id)}
        >
          Remove
        </button>
      </div>
    </article>
  )
}

export default CartProductCard
