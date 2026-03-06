import type { ProductRepository } from '@/domain/repositories/ProductRepository'
import type { Product } from '@/domain/entities/Product'

export const createGetProductDetails = (repository: ProductRepository) => {
  return async (id: string): Promise<Product> => {
    return repository.getById(id)
  }
}
