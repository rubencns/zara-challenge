import type { CartItem, CartProduct } from '../entities/CartItem'

export interface CartRepository {
  getItems(): CartItem[]
  addItem(product: CartProduct): CartItem | null
  removeItem(id: string): void
  clear(): void
}
