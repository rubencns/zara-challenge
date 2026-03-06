import type { ProductRepository } from '@/domain/repositories/ProductRepository'
import type { Product, ProductListItem } from '@/domain/entities/Product'
import { httpClient } from '../http/httpClient'

export const createApiProductRepository = (): ProductRepository => ({
  async getAll(search = '', limit = 20): Promise<ProductListItem[]> {
    return httpClient.get<ProductListItem[]>('/products', {
      search,
      limit: limit.toString(),
    })
  },

  async getById(id: string): Promise<Product> {
    return httpClient.get<Product>(`/products/${id}`)
  },
})
