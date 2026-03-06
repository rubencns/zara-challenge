import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useProductSelection from '@/presentation/hooks/useProductSelection'
import type { Product } from '@/domain/entities/Product'
import type { ColorPickerOption } from '@/presentation/types/ColorPickerOption'

const mockProduct: Product = {
  id: 'test-1',
  brand: 'TestBrand',
  name: 'TestPhone',
  description: 'A test phone',
  basePrice: 799,
  rating: 4.5,
  specs: {
    screen: '6.1"',
    resolution: '2556x1179',
    processor: 'A17 Pro',
    mainCamera: '48MP',
    selfieCamera: '12MP',
    battery: '3274 mAh',
    os: 'iOS 17',
    screenRefreshRate: '120Hz',
  },
  colorOptions: [
    { name: 'Black', hexCode: '#000000', imageUrl: '/black.jpg' },
    { name: 'White', hexCode: '#FFFFFF', imageUrl: '/white.jpg' },
  ],
  storageOptions: [
    { capacity: '128GB', price: 0 },
    { capacity: '256GB', price: 100 },
    { capacity: '512GB', price: 200 },
  ],
  similarProducts: [],
}

describe('useProductSelection', () => {
  it('should initialize with undefined storage and color', () => {
    const { result } = renderHook(() => useProductSelection(mockProduct))

    expect(result.current.storageSelected).toBeUndefined()
    expect(result.current.colorSelected).toBeUndefined()
  })

  it('should select a storage option', () => {
    const { result } = renderHook(() => useProductSelection(mockProduct))

    act(() => {
      result.current.handleStorageChange('256GB')
    })

    expect(result.current.storageSelected).toEqual({ capacity: '256GB', price: 100 })
  })

  it('should select a color option', () => {
    const { result } = renderHook(() => useProductSelection(mockProduct))

    const colorOption: ColorPickerOption = { name: 'Black', color: '#000000' }

    act(() => {
      result.current.handleColorChange(colorOption)
    })

    expect(result.current.colorSelected).toEqual({
      name: 'Black',
      hexCode: '#000000',
      imageUrl: '/black.jpg',
    })
  })

  it('should return base price when no storage is selected', () => {
    const { result } = renderHook(() => useProductSelection(mockProduct))

    expect(result.current.totalPrice).toBe(799)
  })

  it('should return base price plus storage price when storage is selected', () => {
    const { result } = renderHook(() => useProductSelection(mockProduct))

    act(() => {
      result.current.handleStorageChange('256GB')
    })

    expect(result.current.totalPrice).toBe(899)
  })

  it('should return 0 when no product is provided', () => {
    const { result } = renderHook(() => useProductSelection(undefined))

    expect(result.current.totalPrice).toBe(0)
    expect(result.current.storageSelected).toBeUndefined()
    expect(result.current.colorSelected).toBeUndefined()
  })

  it('should reset selections when product id changes', () => {
    const { result, rerender } = renderHook(({ product }) => useProductSelection(product), {
      initialProps: { product: mockProduct },
    })

    act(() => {
      result.current.handleStorageChange('256GB')
      result.current.handleColorChange({ name: 'Black', color: '#000000' })
    })

    expect(result.current.storageSelected).toBeDefined()
    expect(result.current.colorSelected).toBeDefined()

    const newProduct = { ...mockProduct, id: 'test-2' }
    rerender({ product: newProduct })

    expect(result.current.storageSelected).toBeUndefined()
    expect(result.current.colorSelected).toBeUndefined()
  })

  it('should handle selecting the highest storage option', () => {
    const { result } = renderHook(() => useProductSelection(mockProduct))

    act(() => {
      result.current.handleStorageChange('512GB')
    })

    expect(result.current.storageSelected).toEqual({ capacity: '512GB', price: 200 })
    expect(result.current.totalPrice).toBe(999)
  })
})
