'use client'

import { useRef, CSSProperties, ReactNode } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  style?: CSSProperties
  onClick?: () => void
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  style = {},
  onClick,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = btnRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }

  const handleMouseLeave = () => {
    if (!btnRef.current) return
    btnRef.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <button
      ref={btnRef}
      className={className}
      style={{
        transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
