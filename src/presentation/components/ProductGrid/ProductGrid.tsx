import { ReactNode } from 'react'
import style from './ProductGrid.module.css'

interface Props {
  children: ReactNode
}

const ProductGrid = (props: Props) => {
  const { children } = props

  return <section className={style.productGrid}>{children}</section>
}

export default ProductGrid
