'use client'

import Button from '@/presentation/components/Button/Button'
import style from './page.module.css'
import { useCart } from '@/presentation/context/CartContext'
import { useRouter } from 'next/navigation'
import CartProductCard from '@/presentation/components/CartProductCard/CartProductCard'

const Cart = () => {
  const { items, totalQuantity, totalPrice, remove, clear } = useCart()
  const router = useRouter()

  const goHome = () => router.push('/')
  const handlePay = () => {
    clear()
    goHome()
  }

  return (
    <main className={style.cart}>
      <div className={style.cartHeader}>
        <h1>Cart ({totalQuantity})</h1>
      </div>
      <div className={style.cartMain}>
        {items.map((item) => (
          <CartProductCard key={item.id} cartItem={item} onRemove={remove} />
        ))}
      </div>
      <footer className={style.cartFooter}>
        <Button variant="secondary" onClick={goHome} fitContent>
          Continue Shopping
        </Button>
        <div className={style.cartFooterRight}>
          <div className={style.cartFooterTotal}>
            <p className="body-small">Total</p>
            <p className="body-small">{totalPrice} EUR</p>
          </div>
          <Button onClick={handlePay} fitContent>
            Pay
          </Button>
        </div>
      </footer>
      <footer className={style.cartFooterMobile} aria-hidden="true">
        <div className={style.cartFooterTotal}>
          <p className="body-small">Total</p>
          <p className="body-small">{totalPrice} EUR</p>
        </div>
        <div className={style.cartFooterButtons}>
          <Button variant="secondary" onClick={goHome}>
            Continue Shopping
          </Button>
          <Button onClick={handlePay}>Pay</Button>
        </div>
      </footer>
    </main>
  )
}

export default Cart
