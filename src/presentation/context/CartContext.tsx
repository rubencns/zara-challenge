'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import { useDependencies } from '../providers/DependencyProvider'
import type { CartItem, CartProduct, CartState } from '@/domain/entities/CartItem'
import { calculateTotals } from '@/domain/entities/CartItem'

interface CartContextValue extends CartState {
  add(product: CartProduct): void
  remove(id: string): void
  clear(): void
}

type CartAction =
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; id: string }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; items: CartItem[] }

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD':
      return calculateTotals([...state.items, action.item])
    case 'REMOVE':
      return calculateTotals(state.items.filter((item) => item.id !== action.id))
    case 'CLEAR':
      return calculateTotals([])
    case 'HYDRATE':
      return calculateTotals(action.items)
  }
}

const initialState: CartState = { items: [], totalPrice: 0, totalQuantity: 0 }

const CartContext = createContext<CartContextValue | null>(null)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { addToCart, removeFromCart, clearCart, getCart } = useDependencies()
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    const { items } = getCart()
    if (items.length > 0) {
      dispatch({ type: 'HYDRATE', items })
    }
  }, [getCart])

  const add = useCallback(
    (product: CartProduct) => {
      const newItem = addToCart(product)
      if (newItem) dispatch({ type: 'ADD', item: newItem })
    },
    [addToCart],
  )

  const remove = useCallback(
    (id: string) => {
      removeFromCart(id)
      dispatch({ type: 'REMOVE', id })
    },
    [removeFromCart],
  )

  const clear = useCallback(() => {
    clearCart()
    dispatch({ type: 'CLEAR' })
  }, [clearCart])

  const value = useMemo(() => ({ ...state, add, remove, clear }), [state, add, remove, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
