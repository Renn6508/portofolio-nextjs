'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SpotlightCard from '@/components/interactive/SpotlightCard'
import SplitText from '@/components/interactive/SplitText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function InternshipAvailability() {
  const secRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.internship-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.internship-card', start: 'top 80%' },
        }
      )
    }, secRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="internship" id="internship" ref={secRef}>
      <div className="container">
        <div className="internship-header">
          <SplitText text="Opportunity" className="section-label" tag="span" stagger={0.04} y={15} />
          <SplitText text="INTERNSHIP AVAILABILITY" className="section-title" tag="h2" stagger={0.04} y={50} duration={0.7} />
        </div>

        <SpotlightCard className="internship-card" spotlightColor="rgba(232,0,30,0.12)">
          <div className="internship-content">
            <div className="internship-item">
              <span className="internship-label">INTERNSHIP PLAN</span>
              <p className="internship-value">July 2025 - December 2026</p>
            </div>
            <div className="internship-divider" />
            <div className="internship-item">
              <span className="internship-label">DURATION</span>
              <p className="internship-value">6 Months</p>
            </div>
            <div className="internship-divider" />
            <div className="internship-item">
              <span className="internship-label">LOCATION</span>
              <p className="internship-value">Anywhere / Remote</p>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  )
}
