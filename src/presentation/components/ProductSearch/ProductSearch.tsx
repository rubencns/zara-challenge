'use client'

import ProductGrid from '@/presentation/components/ProductGrid/ProductGrid'
import ProductCard from '@/presentation/components/ProductCard/ProductCard'
import SearchInput from '@/presentation/components/SearchInput/SearchInput'
import Loading from '@/presentation/components/Loading/Loading'
import useProducts from '@/presentation/hooks/useProducts'
import type { ProductListItem } from '@/domain/entities/Product'
import style from './ProductSearch.module.css'

interface Props {
  initialProducts: ProductListItem[]
}

const ProductSearch = ({ initialProducts }: Props) => {
  const { products, loading, error, search, onSearch } = useProducts(initialProducts)

  return (
    <>
      <section className={style.searchContainer}>
        <SearchInput search={search} onSearch={onSearch} />
        <p className="body-extra-small">{products.length} results</p>
      </section>
      {loading ? (
        <Loading />
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ProductGrid>
          {products.map((product, index) => (
            <ProductCard key={`${product.id}-${index}`} product={product} />
          ))}
        </ProductGrid>
      )}
    </>
  )
}

export default ProductSearch
