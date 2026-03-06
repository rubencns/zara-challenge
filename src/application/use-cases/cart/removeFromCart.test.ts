import { describe, it, expect, vi } from 'vitest'
import { createRemoveFromCart } from '@/application/use-cases/cart/removeFromCart'
import type { CartRepository } from '@/domain/repositories/CartRepository'

const createMockRepository = (overrides: Partial<CartRepository> = {}): CartRepository => ({
  getItems: vi.fn(),
  addItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  ...overrides,
})

describe('removeFromCart', () => {
  it('should call repository.removeItem with the provided id', () => {
    const repo = createMockRepository()
    const removeFromCart = createRemoveFromCart(repo)

    removeFromCart('cart-1')

    expect(repo.removeItem).toHaveBeenCalledWith('cart-1')
    expect(repo.removeItem).toHaveBeenCalledTimes(1)
  })

  it('should return undefined', () => {
    const repo = createMockRepository()
    const removeFromCart = createRemoveFromCart(repo)

    const result = removeFromCart('cart-1')

    expect(result).toBeUndefined()
  })
})
