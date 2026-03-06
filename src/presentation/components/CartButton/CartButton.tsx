import BagIcon from '@/assets/svgs/bag.svg'
import BagFilledIcon from '@/assets/svgs/bag-filled.svg'
import Link from 'next/link'
import style from './CartButton.module.css'

interface Props {
  href: string
  amount: number
}

const CartButton = (props: Props) => {
  const { href, amount } = props

  return (
    <Link
      href={href}
      aria-label={`View shopping cart, ${amount} item${amount !== 1 ? 's' : ''}`}
      className={style.cartButton}
    >
      {amount > 0 ? <BagFilledIcon aria-hidden="true" /> : <BagIcon aria-hidden="true" />}
      <span>{amount}</span>
    </Link>
  )
}

export default CartButton
