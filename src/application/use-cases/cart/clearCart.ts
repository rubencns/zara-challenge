import type { CartRepository } from '@/domain/repositories/CartRepository'

export const createClearCart = (repository: CartRepository) => {
  return (): void => {
    repository.clear()
  }
}
