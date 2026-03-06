import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createApiProductRepository } from './ApiProductRepository'

const mockGet = vi.fn()

vi.mock('../http/httpClient', () => ({
  httpClient: {
    get: (...args: unknown[]) => mockGet(...args),
  },
}))

describe('ApiProductRepository', () => {
  let repo: ReturnType<typeof createApiProductRepository>

  beforeEach(() => {
    mockGet.mockReset()
    repo = createApiProductRepository()
  })

  describe('getAll', () => {
    it('should call httpClient.get with correct path and params', async () => {
      mockGet.mockResolvedValue([])

      await repo.getAll('iphone', 10)

      expect(mockGet).toHaveBeenCalledWith('/products', {
        search: 'iphone',
        limit: '10',
      })
    })

    it('should use default values when no arguments are provided', async () => {
      mockGet.mockResolvedValue([])

      await repo.getAll()

      expect(mockGet).toHaveBeenCalledWith('/products', {
        search: '',
        limit: '20',
      })
    })

    it('should return the product list from the API', async () => {
      const mockProducts = [
        { id: '1', name: 'iPhone 15', brand: 'Apple', basePrice: 999, imageUrl: '/img.jpg' },
        { id: '2', name: 'Galaxy S24', brand: 'Samsung', basePrice: 899, imageUrl: '/img2.jpg' },
      ]
      mockGet.mockResolvedValue(mockProducts)

      const result = await repo.getAll('', 20)

      expect(result).toEqual(mockProducts)
    })

    it('should propagate errors from httpClient', async () => {
      mockGet.mockRejectedValue(new Error('HTTP error: Internal Server Error'))

      await expect(repo.getAll()).rejects.toThrow('HTTP error: Internal Server Error')
    })
  })

  describe('getById', () => {
    it('should call httpClient.get with the correct path', async () => {
      mockGet.mockResolvedValue({})

      await repo.getById('abc-123')

      expect(mockGet).toHaveBeenCalledWith('/products/abc-123')
    })

    it('should return the product detail from the API', async () => {
      const mockProduct = {
        id: 'abc-123',
        brand: 'Apple',
        name: 'iPhone 15',
        description: 'A great phone',
        basePrice: 999,
        rating: 4.5,
        specs: {
          screen: '6.1"',
          resolution: '2556x1179',
          processor: 'A16 Bionic',
          mainCamera: '48MP',
          selfieCamera: '12MP',
          battery: '3349mAh',
          os: 'iOS 17',
          screenRefreshRate: '60Hz',
        },
        colorOptions: [{ name: 'Black', hexCode: '#000', imageUrl: '/black.jpg' }],
        storageOptions: [{ capacity: '128GB', price: 999 }],
        similarProducts: [],
      }
      mockGet.mockResolvedValue(mockProduct)

      const result = await repo.getById('abc-123')

      expect(result).toEqual(mockProduct)
    })

    it('should propagate errors from httpClient', async () => {
      mockGet.mockRejectedValue(new Error('HTTP error: Not Found'))

      await expect(repo.getById('nonexistent')).rejects.toThrow('HTTP error: Not Found')
    })
  })
})
