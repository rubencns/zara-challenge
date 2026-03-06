'use client'

import { ReactNode, useCallback, useLayoutEffect, useState } from 'react'
import useDragToScroll from '@/presentation/hooks/useDragToScroll'
import style from './ProductRow.module.css'

interface Props {
  children: ReactNode
}

const ProductRow = ({ children }: Props) => {
  const scrollRef = useDragToScroll()
  const [paddingRight, setPaddingRight] = useState(0)

  const updatePadding = useCallback(() => {
    if (scrollRef.current) {
      const extraSpace = 50
      const containerLeft = scrollRef.current.getBoundingClientRect().left
      setPaddingRight(containerLeft + extraSpace)
    }
  }, [scrollRef])

  useLayoutEffect(() => {
    updatePadding()
    window.addEventListener('resize', updatePadding)
    return () => window.removeEventListener('resize', updatePadding)
  }, [updatePadding])

  return (
    <div ref={scrollRef} className={style.productRow} style={{ paddingRight }}>
      {children}
    </div>
  )
}

export default ProductRow
