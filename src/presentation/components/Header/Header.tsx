'use client'

import CartButton from '@/presentation/components/CartButton/CartButton'
import LogoIcon from '@/assets/svgs/logo.svg'
import style from './Header.module.css'
import Link from 'next/link'
import { useCart } from '@/presentation/context/CartContext'

interface Props {
  hasCart?: boolean
}

const Header = (props: Props) => {
  const { hasCart = true } = props

  const { totalQuantity } = useCart()

  return (
    <header className={style.header}>
      <Link href="/" aria-label="Go to home page">
        <LogoIcon aria-hidden="true" />
      </Link>
      {hasCart && <CartButton href="/cart" amount={totalQuantity} />}
    </header>
  )
}

export default Header
