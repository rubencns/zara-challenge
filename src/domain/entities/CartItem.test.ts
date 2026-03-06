import { describe, it, expect } from 'vitest'
import type { CartItem } from '@/domain/entities/CartItem'
import { calculateTotals } from '@/domain/entities/CartItem'

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

describe('calculateTotals', () => {
  it('should return zero totals for an empty cart', () => {
    const result = calculateTotals([])

    expect(result).toEqual({
      items: [],
      totalPrice: 0,
      totalQuantity: 0,
    })
  })

  it('should calculate totals for a single item', () => {
    const items = [createCartItem('1', 999, 100)]

    const result = calculateTotals(items)

    expect(result.totalPrice).toBe(1099)
    expect(result.totalQuantity).toBe(1)
    expect(result.items).toEqual(items)
  })

  it('should calculate totals for multiple items', () => {
    const items = [createCartItem('1', 999, 100), createCartItem('2', 799, 50), createCartItem('3', 599, 0)]

    const result = calculateTotals(items)

    expect(result.totalPrice).toBe(999 + 100 + 799 + 50 + 599 + 0)
    expect(result.totalQuantity).toBe(3)
  })

  it('should include storage price in total calculation', () => {
    const items = [createCartItem('1', 500, 200)]

    const result = calculateTotals(items)

    expect(result.totalPrice).toBe(700)
  })
})
