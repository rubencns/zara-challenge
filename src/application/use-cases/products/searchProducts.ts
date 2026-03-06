import type { ProductRepository } from '@/domain/repositories/ProductRepository'
import type { ProductListItem } from '@/domain/entities/Product'

const DEFAULT_LIMIT = 20

export interface SearchProductsParams {
  search?: string
  limit?: number
}

export const createSearchProducts = (repository: ProductRepository) => {
  return async (params: SearchProductsParams = {}): Promise<ProductListItem[]> => {
    const { search = '', limit = DEFAULT_LIMIT } = params
    return repository.getAll(search, limit)
  }
}
