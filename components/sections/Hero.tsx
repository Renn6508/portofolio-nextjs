'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import SplitText from '@/components/interactive/SplitText'
import BlurText from '@/components/interactive/BlurText'

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null)
  const cueRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!bgRef.current || !cueRef.current) return

    // Parallax bg
    gsap.to(bgRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: bgRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    // Scroll cue muncul
    gsap.to(cueRef.current, { opacity: 1, duration: 0.6, delay: 3.5 })
  }, [])

  return (
    <section className="hero" id="hero">
      <div className="hero-bg" ref={bgRef}>
        <div className="hero-bg-overlay" />
      </div>

      <div className="hero-content">
        <SplitText
          text="Portfolio · Full Stack Developer"
          className="hero-eyebrow"
          triggerOnScroll={false}
          delay={2.4}
          stagger={0.03}
          y={20}
          tag="span"
        />
        <h1 className="hero-title">
          <SplitText
            text="WILHELMINA"
            triggerOnScroll={false}
            delay={2.6}
            stagger={0.06}
            y={80}
            duration={0.8}
            tag="span"
          />
          <span className="hero-title-alt">
            <SplitText
              text="LORENZIA.W"
              triggerOnScroll={false}
              delay={2.9}
              stagger={0.06}
              y={80}
              duration={0.8}
              tag="span"
            />
          </span>
        </h1>
        <BlurText
          text="Crafting digital experiences that push boundaries"
          className="hero-subtitle"
          triggerOnScroll={false}
          delay={3.2}
          stagger={0.07}
          tag="p"
        />
      </div>

      <div className="hero-scroll-cue" ref={cueRef} style={{ opacity: 0 }}>
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
