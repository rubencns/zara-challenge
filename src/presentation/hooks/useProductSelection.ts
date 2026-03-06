import { useEffect, useMemo, useState } from 'react'
import type { ColorOption, Product, StorageOption } from '@/domain/entities/Product'
import type { ColorPickerOption } from '@/presentation/types/ColorPickerOption'

const useProductSelection = (product?: Product) => {
  const [storageSelected, setStorageSelected] = useState<StorageOption>()
  const [colorSelected, setColorSelected] = useState<ColorOption>()

  useEffect(() => {
    setStorageSelected(undefined)
    setColorSelected(undefined)
  }, [product?.id])

  const handleStorageChange = (capacity: StorageOption['capacity']) => {
    setStorageSelected(product?.storageOptions.find((s) => s.capacity === capacity))
  }

  const handleColorChange = (option: ColorPickerOption) => {
    setColorSelected(product?.colorOptions.find((c) => c.name === option.name))
  }

  const totalPrice = useMemo(
    () => (product?.basePrice ?? 0) + (storageSelected?.price ?? 0),
    [product?.basePrice, storageSelected?.price],
  )

  return {
    storageSelected,
    colorSelected,
    handleStorageChange,
    handleColorChange,
    totalPrice,
  }
}

export default useProductSelection
