import type { CartRepository } from '@/domain/repositories/CartRepository'
import type { CartItem, CartProduct } from '@/domain/entities/CartItem'

export const createAddToCart = (repository: CartRepository) => {
  return (product: CartProduct): CartItem | null => {
    return repository.addItem(product)
  }
}
