import { describe, it, expect, vi } from 'vitest'
import { createGetCart } from '@/application/use-cases/cart/getCart'
import type { CartRepository } from '@/domain/repositories/CartRepository'
import type { CartItem } from '@/domain/entities/CartItem'

const createCartItem = (id: string, basePrice: number, storagePrice: number): CartItem => ({
  id,
  product: {
    id: `product-${id}`,
    brand: 'Apple',
    name: `Product ${id}`,
    description: 'Test product',
    basePrice,
    rating: 4.5,
    specs: {
      screen: '6.1"',
      resolution: '2556x1179',
      processor: 'A16 Bionic',
      mainCamera: '48MP',
      selfieCamera: '12MP',
      battery: '3877mAh',
      os: 'iOS 17',
      screenRefreshRate: '60Hz',
    },
    colorOptions: [{ name: 'Black', hexCode: '#000000', imageUrl: '/img/black.png' }],
    storageOptions: [{ capacity: '128GB', price: storagePrice }],
    similarProducts: [],
    storageSelected: { capacity: '128GB', price: storagePrice },
    colorSelected: { name: 'Black', hexCode: '#000000', imageUrl: '/img/black.png' },
  },
})

const createMockRepository = (overrides: Partial<CartRepository> = {}): CartRepository => ({
  getItems: vi.fn().mockReturnValue([]),
  addItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  ...overrides,
})

describe('getCart', () => {
  it('should call repository.getItems', () => {
    const repo = createMockRepository()
    const getCart = createGetCart(repo)

    getCart()

    expect(repo.getItems).toHaveBeenCalled()
  })

  it('should return a CartState with calculated totals', () => {
    const items = [createCartItem('1', 999, 100), createCartItem('2', 799, 50)]
    const repo = createMockRepository({ getItems: vi.fn().mockReturnValue(items) })
    const getCart = createGetCart(repo)

    const result = getCart()

    expect(result).toEqual({
      items,
      totalPrice: 1948,
      totalQuantity: 2,
    })
  })

  it('should return empty cart state when no items', () => {
    const repo = createMockRepository()
    const getCart = createGetCart(repo)

    const result = getCart()

    expect(result).toEqual({
      items: [],
      totalPrice: 0,
      totalQuantity: 0,
    })
  })
})
