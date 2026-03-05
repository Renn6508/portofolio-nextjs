'use client'

import { useRef, useState, CSSProperties, ReactNode } from 'react'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  spotlightColor?: string
  style?: CSSProperties
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(232, 0, 30, 0.15)',
  style = {},
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
    >
      <div
        className="spotlight-glow"
        style={{
          background: `radial-gradient(circle 220px at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 80%)`,
          opacity,
          transition: 'opacity 0.3s',
        }}
      />
      {children}
    </div>
  )
}
