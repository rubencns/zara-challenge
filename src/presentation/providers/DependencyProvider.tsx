'use client'

import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { createApiProductRepository } from '@/infrastructure/repositories/ApiProductRepository'
import { createLocalStorageCartRepository } from '@/infrastructure/repositories/LocalStorageCartRepository'
import { createSearchProducts } from '@/application/use-cases/products/searchProducts'
import { createGetProductDetails } from '@/application/use-cases/products/getProductDetails'
import { createAddToCart } from '@/application/use-cases/cart/addToCart'
import { createRemoveFromCart } from '@/application/use-cases/cart/removeFromCart'
import { createClearCart } from '@/application/use-cases/cart/clearCart'
import { createGetCart } from '@/application/use-cases/cart/getCart'

interface Dependencies {
  searchProducts: ReturnType<typeof createSearchProducts>
  getProductDetails: ReturnType<typeof createGetProductDetails>
  addToCart: ReturnType<typeof createAddToCart>
  removeFromCart: ReturnType<typeof createRemoveFromCart>
  clearCart: ReturnType<typeof createClearCart>
  getCart: ReturnType<typeof createGetCart>
}

const DependencyContext = createContext<Dependencies | null>(null)

export const DependencyProvider = ({ children }: { children: ReactNode }) => {
  const deps = useMemo(() => {
    const productRepo = createApiProductRepository()
    const cartRepo = createLocalStorageCartRepository()

    return {
      searchProducts: createSearchProducts(productRepo),
      getProductDetails: createGetProductDetails(productRepo),
      addToCart: createAddToCart(cartRepo),
      removeFromCart: createRemoveFromCart(cartRepo),
      clearCart: createClearCart(cartRepo),
      getCart: createGetCart(cartRepo),
    }
  }, [])

  return <DependencyContext.Provider value={deps}>{children}</DependencyContext.Provider>
}

export const useDependencies = (): Dependencies => {
  const ctx = useContext(DependencyContext)
  if (!ctx) throw new Error('useDependencies must be used within a DependencyProvider')
  return ctx
}
