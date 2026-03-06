import { useRef, useEffect } from 'react'

const useDragToScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const dragDistanceRef = useRef(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onMouseDown = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest('a, button')) {
        e.preventDefault()
      }
      isDraggingRef.current = true
      startXRef.current = e.pageX - el.offsetLeft
      scrollLeftRef.current = el.scrollLeft
      dragDistanceRef.current = 0
    }

    const onMouseLeaveOrUp = () => {
      isDraggingRef.current = false
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return
      e.preventDefault()
      const x = e.pageX - el.offsetLeft
      const walk = x - startXRef.current
      dragDistanceRef.current = Math.abs(walk)
      el.scrollLeft = scrollLeftRef.current - walk
    }

    const onClick = (e: MouseEvent) => {
      if (dragDistanceRef.current > 5) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('mouseleave', onMouseLeaveOrUp)
    el.addEventListener('mouseup', onMouseLeaveOrUp)
    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('click', onClick, true)

    return () => {
      el.removeEventListener('mousedown', onMouseDown)
      el.removeEventListener('mouseleave', onMouseLeaveOrUp)
      el.removeEventListener('mouseup', onMouseLeaveOrUp)
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('click', onClick, true)
    }
  }, [])

  return scrollRef
}

export default useDragToScroll
