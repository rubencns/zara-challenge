import Image from 'next/image'
import Link from 'next/link'
import type { ProductListItem } from '@/domain/entities/Product'
import style from './ProductCard.module.css'

interface Props {
  product: ProductListItem
}

const ProductCard = (props: Props) => {
  const { product } = props

  return (
    <article className={style.productCard}>
      <Link href={`/details/${product.id}`}>
        <div className={style.productCardImageContainer}>
          <Image
            className={style.productCardImage}
            src={product.imageUrl}
            alt={`${product.brand} ${product.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
        <footer className={style.productCardFooter}>
          <div className={style.productCardInfo}>
            <p className="label light">{product.brand}</p>
            <p className="body-extra-small">{product.name}</p>
          </div>
          <p className="body-extra-small">{product.basePrice} EUR</p>
        </footer>
      </Link>
    </article>
  )
}

export default ProductCard
