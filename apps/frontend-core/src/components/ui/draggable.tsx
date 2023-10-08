/* eslint-disable jsx-a11y/no-static-element-interactions */
import { cn } from '@/lib/utils'
import { ReactNode, useRef, useState } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

const Draggable = ({ children, className }: Props) => {
  const ourRef = useRef(null)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const mouseCoords = useRef({
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  })
  const handleDragStart = e => {
    if (!ourRef.current) return
    const slider = ourRef.current.children[0]
    const startX = e.pageX - slider.offsetLeft
    const startY = e.pageY - slider.offsetTop
    const { scrollLeft } = slider
    const { scrollTop } = slider
    mouseCoords.current = { startX, startY, scrollLeft, scrollTop }
    setIsMouseDown(true)
    document.body.style.cursor = 'grabbing'
  }
  const handleDragEnd = () => {
    setIsMouseDown(false)
    if (!ourRef.current) return
    document.body.style.cursor = 'default'
  }
  const handleDrag = e => {
    if (!isMouseDown || !ourRef.current) return
    e.preventDefault()
    const slider = ourRef.current.children[0]
    const x = e.pageX - slider.offsetLeft
    const y = e.pageY - slider.offsetTop
    const walkX = (x - mouseCoords.current.startX) * 1.5
    const walkY = (y - mouseCoords.current.startY) * 1.5
    slider.scrollLeft = mouseCoords.current.scrollLeft - walkX
    slider.scrollTop = mouseCoords.current.scrollTop - walkY
  }

  return (
    <section
      ref={ourRef}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseMove={handleDrag}
    >
      <div className={cn('flex overflow-x-scroll no-scrollbar', className)}>
        {children}
      </div>
    </section>
  )
}

export default Draggable
