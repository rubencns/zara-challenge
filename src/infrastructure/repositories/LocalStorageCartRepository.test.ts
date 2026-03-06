import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createLocalStorageCartRepository } from './LocalStorageCartRepository'
import type { CartProduct } from '@/domain/entities/CartItem'

vi.mock('uuid', () => ({
  v4: vi.fn(() => 'mock-uuid-1234'),
}))

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
    get _store() {
      return store
    },
  }
})()

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock })

const makeProduct = (overrides: Partial<CartProduct> = {}): CartProduct => ({
  id: 'prod-1',
  brand: 'Apple',
  name: 'iPhone 15',
  description: 'A phone',
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
  colorOptions: [],
  storageOptions: [],
  similarProducts: [],
  storageSelected: { capacity: '128GB', price: 999 },
  colorSelected: { name: 'Black', hexCode: '#000', imageUrl: '/black.jpg' },
  ...overrides,
})

describe('LocalStorageCartRepository', () => {
  let repo: ReturnType<typeof createLocalStorageCartRepository>

  beforeEach(() => {
    localStorageMock.getItem.mockReset()
    localStorageMock.setItem.mockReset()
    localStorageMock.clear()
    repo = createLocalStorageCartRepository()
  })

  describe('getItems', () => {
    it('should return an empty array initially', () => {
      expect(repo.getItems()).toEqual([])
    })

    it('should return a copy of the items array', () => {
      const items = repo.getItems()
      items.push({ id: 'fake', product: makeProduct() })
      expect(repo.getItems()).toEqual([])
    })
  })

  describe('addItem', () => {
    it('should add a new item and return it', () => {
      const product = makeProduct()
      const result = repo.addItem(product)

      expect(result).toEqual({ id: 'mock-uuid-1234', product })
      expect(repo.getItems()).toHaveLength(1)
    })

    it('should persist to localStorage after adding', () => {
      repo.addItem(makeProduct())

      expect(localStorageMock.setItem).toHaveBeenCalledWith('cart', expect.any(String))
    })

    it('should return null for duplicate product (same id, storage, and color)', () => {
      const product = makeProduct()
      repo.addItem(product)
      const duplicate = repo.addItem(product)

      expect(duplicate).toBeNull()
      expect(repo.getItems()).toHaveLength(1)
    })

    it('should allow same product with different storage', () => {
      repo.addItem(makeProduct({ storageSelected: { capacity: '128GB', price: 999 } }))
      const result = repo.addItem(makeProduct({ storageSelected: { capacity: '256GB', price: 1099 } }))

      expect(result).not.toBeNull()
      expect(repo.getItems()).toHaveLength(2)
    })

    it('should allow same product with different color', () => {
      repo.addItem(makeProduct({ colorSelected: { name: 'Black', hexCode: '#000', imageUrl: '/b.jpg' } }))
      const result = repo.addItem(
        makeProduct({ colorSelected: { name: 'White', hexCode: '#fff', imageUrl: '/w.jpg' } }),
      )

      expect(result).not.toBeNull()
      expect(repo.getItems()).toHaveLength(2)
    })
  })

  describe('removeItem', () => {
    it('should remove an item by id', () => {
      repo.addItem(makeProduct())
      const items = repo.getItems()
      repo.removeItem(items[0].id)

      expect(repo.getItems()).toHaveLength(0)
    })

    it('should persist after removing', () => {
      repo.addItem(makeProduct())
      localStorageMock.setItem.mockClear()

      const items = repo.getItems()
      repo.removeItem(items[0].id)

      expect(localStorageMock.setItem).toHaveBeenCalledWith('cart', '[]')
    })

    it('should do nothing if id does not exist', () => {
      repo.addItem(makeProduct())
      repo.removeItem('nonexistent')

      expect(repo.getItems()).toHaveLength(1)
    })
  })

  describe('clear', () => {
    it('should remove all items', () => {
      repo.addItem(makeProduct())
      repo.clear()

      expect(repo.getItems()).toEqual([])
    })

    it('should persist empty array to localStorage', () => {
      repo.addItem(makeProduct())
      localStorageMock.setItem.mockClear()
      repo.clear()

      expect(localStorageMock.setItem).toHaveBeenCalledWith('cart', '[]')
    })
  })

  describe('persist error handling', () => {
    it('should not throw when localStorage.setItem fails', () => {
      localStorageMock.setItem.mockImplementationOnce(() => {
        throw new Error('QuotaExceeded')
      })
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      expect(() => repo.addItem(makeProduct())).not.toThrow()
      expect(consoleSpy).toHaveBeenCalledWith('Failed to save cart to localStorage', expect.any(Error))

      consoleSpy.mockRestore()
    })
  })

  describe('auto-hydration on creation', () => {
    it('should load items from localStorage on creation', () => {
      const stored = [{ id: 'item-1', product: makeProduct() }]
      localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(stored))

      const hydratedRepo = createLocalStorageCartRepository()

      expect(hydratedRepo.getItems()).toEqual(stored)
    })

    it('should start empty when localStorage is empty', () => {
      localStorageMock.getItem.mockReturnValueOnce(null)

      const hydratedRepo = createLocalStorageCartRepository()

      expect(hydratedRepo.getItems()).toEqual([])
    })

    it('should start empty when localStorage has invalid JSON', () => {
      localStorageMock.getItem.mockReturnValueOnce('not-valid-json')

      const hydratedRepo = createLocalStorageCartRepository()

      expect(hydratedRepo.getItems()).toEqual([])
    })

    it('should start empty when parsed value is not an array', () => {
      localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({ not: 'array' }))

      const hydratedRepo = createLocalStorageCartRepository()

      expect(hydratedRepo.getItems()).toEqual([])
    })
  })
})
