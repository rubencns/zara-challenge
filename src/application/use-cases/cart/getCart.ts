import type { CartRepository } from '@/domain/repositories/CartRepository'
import type { CartState } from '@/domain/entities/CartItem'
import { calculateTotals } from '@/domain/entities/CartItem'

export const createGetCart = (repository: CartRepository) => {
  return (): CartState => {
    const items = repository.getItems()
    return calculateTotals(items)
  }
}
