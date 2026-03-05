'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mX = 0, mY = 0, rX = 0, rY = 0, rafId: number

    const onMove = (e: MouseEvent) => {
      mX = e.clientX
      mY = e.clientY
      if (dotRef.current) {
        gsap.to(dotRef.current, { x: mX, y: mY, duration: 0.05, overwrite: true })
      }
    }

    const lerp = () => {
      rX += (mX - rX) * 0.12
      rY += (mY - rY) * 0.12
      if (ringRef.current) {
        gsap.set(ringRef.current, { x: rX, y: rY })
      }
      rafId = requestAnimationFrame(lerp)
    }

    window.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(lerp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="cursor">
      <div className="cursor-dot" ref={dotRef} style={{ position: 'fixed', top: 0, left: 0 }} />
      <div className="cursor-ring" ref={ringRef} style={{ position: 'fixed', top: 0, left: 0 }} />
    </div>
  )
}
