import useSWR from 'swr'
import { useState } from 'react'
import type { ProductListItem } from '@/domain/entities/Product'
import { useDependencies } from '../providers/DependencyProvider'
import useDebounce from './useDebounce'

const useProducts = (initialProducts: ProductListItem[] = []) => {
  const { searchProducts } = useDependencies()
  const [search, onSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const {
    data: products = [],
    isLoading,
    error,
  } = useSWR<ProductListItem[]>(`products:${debouncedSearch}`, () => searchProducts({ search: debouncedSearch }), {
    fallbackData: debouncedSearch === '' ? initialProducts : undefined,
  })

  return { products, loading: isLoading, error: error instanceof Error ? error.message : null, search, onSearch }
}

export default useProducts
