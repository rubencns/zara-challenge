import { describe, it, expect, vi } from 'vitest'
import { createGetProductDetails } from '@/application/use-cases/products/getProductDetails'
import type { ProductRepository } from '@/domain/repositories/ProductRepository'
import type { Product } from '@/domain/entities/Product'

const mockProduct: Product = {
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
}

const createMockRepository = (overrides: Partial<ProductRepository> = {}): ProductRepository => ({
  getAll: vi.fn(),
  getById: vi.fn().mockResolvedValue(mockProduct),
  ...overrides,
})

describe('getProductDetails', () => {
  it('should call repository.getById with the provided id', async () => {
    const repo = createMockRepository()
    const getProductDetails = createGetProductDetails(repo)

    await getProductDetails('1')

    expect(repo.getById).toHaveBeenCalledWith('1')
  })

  it('should return the product from the repository', async () => {
    const repo = createMockRepository()
    const getProductDetails = createGetProductDetails(repo)

    const result = await getProductDetails('1')

    expect(result).toEqual(mockProduct)
  })

  it('should propagate repository errors', async () => {
    const error = new Error('Product not found')
    const repo = createMockRepository({ getById: vi.fn().mockRejectedValue(error) })
    const getProductDetails = createGetProductDetails(repo)

    await expect(getProductDetails('999')).rejects.toThrow('Product not found')
  })
})
