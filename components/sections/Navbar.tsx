'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

export default function Navbar() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    // Navbar muncul setelah loader selesai
    gsap.fromTo(
      ref.current,
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2.3 }
    )

    // Background muncul saat scroll
    ScrollTrigger.create({
      start: 'top -80px',
      onEnter: () =>
        gsap.to(ref.current, {
          background: 'rgba(8,10,12,0.92)',
          backdropFilter: 'blur(12px)',
          duration: 0.4,
        }),
      onLeaveBack: () =>
        gsap.to(ref.current, {
          background: 'transparent',
          backdropFilter: 'blur(0px)',
          duration: 0.4,
        }),
    })
  }, [])

  const scrollTo = (id: string) => {
    gsap.to(window, { duration: 1.2, scrollTo: `#${id}`, ease: 'power3.inOut' })
  }

  return (
    <nav className="navbar" ref={ref}>
      <div className="nav-logo">
        YOUR<span>.</span>NAME
      </div>
      <ul className="nav-links">
        {['about', 'skills', 'dashboard', 'work', 'contact'].map((s) => (
          <li key={s}>
            <a
              href={`#${s}`}
              onClick={(e) => {
                e.preventDefault()
                scrollTo(s)
              }}
            >
              {s}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="/assets/CV PKL 2026 Wilhelmina Lorenzia Wijaya.pdf"
        download="CV_PKL_2026_WilhelminaLorenziaWijaya.pdf"
        className="nav-cv-btn"
      >
        Download CV ↓
      </a>
    </nav>
  )
}
