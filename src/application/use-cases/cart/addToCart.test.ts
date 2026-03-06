import { describe, it, expect, vi } from 'vitest'
import { createAddToCart } from '@/application/use-cases/cart/addToCart'
import type { CartRepository } from '@/domain/repositories/CartRepository'
import type { CartItem, CartProduct } from '@/domain/entities/CartItem'

const mockCartProduct: CartProduct = {
  id: '1',
  brand: 'Apple',
  name: 'iPhone 15',
  description: 'Latest iPhone model',
  basePrice: 999,
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
  storageOptions: [{ capacity: '128GB', price: 0 }],
  similarProducts: [],
  storageSelected: { capacity: '128GB', price: 0 },
  colorSelected: { name: 'Black', hexCode: '#000000', imageUrl: '/img/black.png' },
}

const mockCartItem: CartItem = {
  id: 'cart-1',
  product: mockCartProduct,
}

const createMockRepository = (overrides: Partial<CartRepository> = {}): CartRepository => ({
  getItems: vi.fn(),
  addItem: vi.fn().mockReturnValue(mockCartItem),
  removeItem: vi.fn(),
  clear: vi.fn(),
  ...overrides,
})

describe('addToCart', () => {
  it('should call repository.addItem with the product', () => {
    const repo = createMockRepository()
    const addToCart = createAddToCart(repo)

    addToCart(mockCartProduct)

    expect(repo.addItem).toHaveBeenCalledWith(mockCartProduct)
    expect(repo.addItem).toHaveBeenCalledTimes(1)
  })

  it('should return the cart item from the repository', () => {
    const repo = createMockRepository()
    const addToCart = createAddToCart(repo)

    const result = addToCart(mockCartProduct)

    expect(result).toEqual(mockCartItem)
  })

  it('should return null when repository returns null (duplicate item)', () => {
    const repo = createMockRepository({ addItem: vi.fn().mockReturnValue(null) })
    const addToCart = createAddToCart(repo)

    const result = addToCart(mockCartProduct)

    expect(result).toBeNull()
  })
})
