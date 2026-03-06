'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import style from './ProductDetailsClient.module.css'
import ChevronLeftIcon from '@/assets/svgs/chevron-left.svg'
import Button from '@/presentation/components/Button/Button'
import ProductStorageSelector from '@/presentation/components/ProductStorageSelector/ProductStorageSelector'
import ProductColorPicker from '@/presentation/components/ProductColorPicker/ProductColorPicker'
import useProductSelection from '@/presentation/hooks/useProductSelection'
import ProductSpecifications from '@/presentation/components/ProductSpecifications/ProductSpecifications'
import ProductCard from '@/presentation/components/ProductCard/ProductCard'
import ProductRow from '@/presentation/components/ProductRow/ProductRow'
import { useCart } from '@/presentation/context/CartContext'
import type { Product } from '@/domain/entities/Product'

interface Props {
  product: Product
}

const ProductDetailsClient = ({ product }: Props) => {
  const { storageSelected, colorSelected, handleStorageChange, handleColorChange, totalPrice } =
    useProductSelection(product)
  const router = useRouter()
  const { add } = useCart()

  const handleAddToCart = () => {
    if (!storageSelected || !colorSelected) return

    add({
      ...product,
      storageSelected,
      colorSelected,
    })
    router.push('/cart')
  }

  const isStorageAndColorSelected = storageSelected && colorSelected
  const priceText = storageSelected ? `${totalPrice} EUR` : `From ${product.basePrice} EUR`

  return (
    <>
      <header className={style.productDetailsHeader}>
        <button type="button" onClick={() => router.back()} className={style.headerBackLink} aria-label="Go back">
          <ChevronLeftIcon aria-hidden="true" />
          <span className="body-extra-small">Back</span>
        </button>
      </header>
      <div className={style.productDetailsContainer}>
        <section className={style.productDetails}>
          <div className={style.productCardImageContainer}>
            <Image
              className={style.productCardImage}
              src={colorSelected?.imageUrl ?? product.colorOptions[0].imageUrl}
              alt={`${product.brand} ${product.name}`}
              priority
              fill
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          <div className={style.productDetailsInfo}>
            <section className={style.productDetailsInfoContainer}>
              <h1>{product.name}</h1>
              <p className="text-large">{priceText}</p>
            </section>
            <section className={style.productDetailsSelectorContainer}>
              <p className="body-medium">Storage ¿how much space do you need?</p>
              <ProductStorageSelector
                options={product.storageOptions.map((option) => option.capacity)}
                selected={storageSelected?.capacity ?? ''}
                onChange={handleStorageChange}
              />
              <p className="body-medium">Color. Pick your favourite.</p>
              <ProductColorPicker
                options={product.colorOptions.map((option) => ({
                  name: option.name,
                  color: option.hexCode,
                }))}
                selected={colorSelected?.name ?? ''}
                onChange={handleColorChange}
              />
            </section>
            <Button onClick={handleAddToCart} disabled={!isStorageAndColorSelected}>
              Add to cart
            </Button>
          </div>
        </section>
        <section className={style.productSpecifications}>
          <h2>Specifications</h2>
          <ProductSpecifications product={product} />
        </section>
        <section className={style.productSimilarItems}>
          <h2>Similar items</h2>
          <ProductRow>
            {product.similarProducts.map((similarProduct, index) => (
              <ProductCard key={`${similarProduct.id}-${index}`} product={similarProduct} />
            ))}
          </ProductRow>
        </section>
      </div>
    </>
  )
}

export default ProductDetailsClient
