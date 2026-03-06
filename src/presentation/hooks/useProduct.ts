import useSWR from 'swr'
import type { Product } from '@/domain/entities/Product'
import { useDependencies } from '../providers/DependencyProvider'

const useProduct = (id: string) => {
  const { getProductDetails } = useDependencies()
  const { data: product, isLoading, error } = useSWR<Product>(`product:${id}`, () => getProductDetails(id))
  return { product, loading: isLoading, error: error instanceof Error ? error.message : null }
}

export default useProduct
