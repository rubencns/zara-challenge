import type { Product, ProductListItem } from '../entities/Product'

export interface ProductRepository {
  getAll(search?: string, limit?: number): Promise<ProductListItem[]>
  getById(id: string): Promise<Product>
}
