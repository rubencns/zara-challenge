import { describe, it, expect, vi } from 'vitest'
import { createClearCart } from '@/application/use-cases/cart/clearCart'
import type { CartRepository } from '@/domain/repositories/CartRepository'

const createMockRepository = (overrides: Partial<CartRepository> = {}): CartRepository => ({
  getItems: vi.fn(),
  addItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  ...overrides,
})

describe('clearCart', () => {
  it('should call repository.clear', () => {
    const repo = createMockRepository()
    const clearCart = createClearCart(repo)

    clearCart()

    expect(repo.clear).toHaveBeenCalledTimes(1)
  })

  it('should return undefined', () => {
    const repo = createMockRepository()
    const clearCart = createClearCart(repo)

    const result = clearCart()

    expect(result).toBeUndefined()
  })
})
