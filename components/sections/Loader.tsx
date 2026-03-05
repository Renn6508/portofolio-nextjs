'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface LoaderProps {
  onDone: () => void
}

export default function Loader({ onDone }: LoaderProps) {
  const [pct, setPct] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let n = 0
    const iv = setInterval(() => {
      n += Math.random() * 15
      if (n >= 100) {
        n = 100
        clearInterval(iv)
      }
      setPct(Math.floor(n))
    }, 60)

    const t = setTimeout(() => {
      if (ref.current) {
        gsap.to(ref.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: onDone,
        })
      }
    }, 2000)

    return () => {
      clearInterval(iv)
      clearTimeout(t)
    }
  }, [onDone])

  return (
    <div className="loader" ref={ref}>
      <div className="loader-pct">{pct.toString().padStart(3, '0')}</div>
      <div className="loader-bar-wrap">
        <div className="loader-bar" />
      </div>
      <div className="loader-text">Loading Portfolio</div>
    </div>
  )
}
