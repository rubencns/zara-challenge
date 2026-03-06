import type { CartRepository } from '@/domain/repositories/CartRepository'
import type { CartItem, CartProduct } from '@/domain/entities/CartItem'
import { v4 as uuidv4 } from 'uuid'

const STORAGE_KEY = 'cart'

const hydrate = (): CartItem[] => {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const persist = (cartItems: CartItem[]): void => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems))
  } catch (error) {
    console.error('Failed to save cart to localStorage', error)
  }
}

export const createLocalStorageCartRepository = (): CartRepository => {
  let items: CartItem[] = hydrate()

  return {
    getItems(): CartItem[] {
      return [...items]
    },

    addItem(product: CartProduct): CartItem | null {
      const isDuplicate = items.some(
        (item) =>
          item.product.id === product.id &&
          item.product.storageSelected.capacity === product.storageSelected.capacity &&
          item.product.colorSelected.name === product.colorSelected.name,
      )
      if (isDuplicate) return null

      const newItem: CartItem = { id: uuidv4(), product }
      items = [...items, newItem]
      persist(items)
      return newItem
    },

    removeItem(id: string): void {
      items = items.filter((item) => item.id !== id)
      persist(items)
    },

    clear(): void {
      items = []
      persist(items)
    },
  }
}
