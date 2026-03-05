'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BlurText from '@/components/interactive/BlurText'
import SplitText from '@/components/interactive/SplitText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ParallaxBand() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!bgRef.current) return

    gsap.to(bgRef.current, {
      yPercent: 25,
      ease: 'none',
      scrollTrigger: {
        trigger: bgRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })
  }, [])

  return (
    <div className="parallax-band">
      <div className="parallax-bg" ref={bgRef} />
      <div className="parallax-content">
        <BlurText
          text='"Do you see a man skilled in his work? He will stand before kings."'
          className="parallax-quote"
          stagger={0.06}
          duration={0.8}
          tag="h2"
        />
        <SplitText text="· Proverbs 22:29 ·" className="parallax-source" tag="p" stagger={0.05} y={20} />
      </div>
    </div>
  )
}
