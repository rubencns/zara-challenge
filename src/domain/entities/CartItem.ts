import type { ColorOption, Product, StorageOption } from './Product'

export interface CartProduct extends Product {
  storageSelected: StorageOption
  colorSelected: ColorOption
}

export interface CartItem {
  id: string
  product: CartProduct
}

export interface CartState {
  items: CartItem[]
  totalPrice: number
  totalQuantity: number
}

export const calculateTotals = (items: CartItem[]): CartState => ({
  items,
  totalPrice: items.reduce((acc, item) => acc + item.product.basePrice + item.product.storageSelected.price, 0),
  totalQuantity: items.length,
})
