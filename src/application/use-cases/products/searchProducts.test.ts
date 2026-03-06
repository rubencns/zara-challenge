import { describe, it, expect, vi } from 'vitest'
import { createSearchProducts } from '@/application/use-cases/products/searchProducts'
import type { ProductRepository } from '@/domain/repositories/ProductRepository'
import type { ProductListItem } from '@/domain/entities/Product'

const mockProducts: ProductListItem[] = [
  { id: '1', name: 'iPhone 15', brand: 'Apple', basePrice: 999, imageUrl: '/img/iphone.png' },
  { id: '2', name: 'Galaxy S24', brand: 'Samsung', basePrice: 899, imageUrl: '/img/galaxy.png' },
]

const createMockRepository = (overrides: Partial<ProductRepository> = {}): ProductRepository => ({
  getAll: vi.fn().mockResolvedValue(mockProducts),
  getById: vi.fn(),
  ...overrides,
})

describe('searchProducts', () => {
  it('should call repository.getAll with default params when none provided', async () => {
    const repo = createMockRepository()
    const searchProducts = createSearchProducts(repo)

    await searchProducts()

    expect(repo.getAll).toHaveBeenCalledWith('', 20)
  })

  it('should pass search and limit to repository.getAll', async () => {
    const repo = createMockRepository()
    const searchProducts = createSearchProducts(repo)

    await searchProducts({ search: 'iPhone', limit: 10 })

    expect(repo.getAll).toHaveBeenCalledWith('iPhone', 10)
  })

  it('should use default limit when only search is provided', async () => {
    const repo = createMockRepository()
    const searchProducts = createSearchProducts(repo)

    await searchProducts({ search: 'Galaxy' })

    expect(repo.getAll).toHaveBeenCalledWith('Galaxy', 20)
  })

  it('should use default search when only limit is provided', async () => {
    const repo = createMockRepository()
    const searchProducts = createSearchProducts(repo)

    await searchProducts({ limit: 5 })

    expect(repo.getAll).toHaveBeenCalledWith('', 5)
  })

  it('should return the products from the repository', async () => {
    const repo = createMockRepository()
    const searchProducts = createSearchProducts(repo)

    const result = await searchProducts()

    expect(result).toEqual(mockProducts)
  })

  it('should return an empty array when repository returns no products', async () => {
    const repo = createMockRepository({ getAll: vi.fn().mockResolvedValue([]) })
    const searchProducts = createSearchProducts(repo)

    const result = await searchProducts()

    expect(result).toEqual([])
  })

  it('should propagate repository errors', async () => {
    const error = new Error('Network error')
    const repo = createMockRepository({ getAll: vi.fn().mockRejectedValue(error) })
    const searchProducts = createSearchProducts(repo)

    await expect(searchProducts()).rejects.toThrow('Network error')
  })
})
