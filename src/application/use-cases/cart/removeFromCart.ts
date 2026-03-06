import type { CartRepository } from '@/domain/repositories/CartRepository'

export const createRemoveFromCart = (repository: CartRepository) => {
  return (id: string): void => {
    repository.removeItem(id)
  }
}
