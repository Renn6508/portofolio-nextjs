'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SpotlightCard from '@/components/interactive/SpotlightCard'
import MagneticButton from '@/components/interactive/MagneticButton'
import SplitText from '@/components/interactive/SplitText'
import { COLLABORATORS } from '@/lib/data'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Contact() {
  const secRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!leftRef.current || !rightRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current!.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%' },
        }
      )
      gsap.fromTo(
        '.collab-card',
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 80%' },
        }
      )
    }, secRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="contact" id="contact" ref={secRef}>
      <div className="container">
        <div className="contact-inner">
          <div ref={leftRef}>
            <span className="section-label">Get In Touch</span>
            <SplitText text="LET'S WORK TOGETHER" className="contact-cta" tag="h2" stagger={0.05} y={50} duration={0.7} />
            <p className="contact-body">
              Saya adalah mahasiswa magang yang siap berkontribusi dan belajar. Jangan ragu untuk menghubungi saya melalui informasi kontak
              berikut.
            </p>
            <MagneticButton className="btn-primary" strength={0.35}>
              <a href="mailto:wilhelmina6508@gmail.com" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                Say Hello <span>→</span>
              </a>
            </MagneticButton>
          </div>

          <div className="collab-section" ref={rightRef}>
            <div className="collab-header">
              <span className="collab-label">PAST COLLABORATIONS</span>
              <p className="collab-desc">Rekan-rekan hebat yang pernah berkolaborasi dengan saya.</p>
            </div>
            <div className="collab-list">
              {COLLABORATORS.map((c) => (
                <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="collab-card-link">
                  <SpotlightCard className="collab-card" spotlightColor="rgba(232,0,30,0.12)">
                    <div className="collab-avatar-wrap">
                      <img src={c.avatar} alt={c.name} className="collab-avatar" />
                      <div className="collab-avatar-ring" />
                    </div>
                    <div className="collab-info">
                      <span className="collab-name">{c.name}</span>
                      <span className="collab-role">{c.role}</span>
                    </div>
                    <div className="collab-visit">
                      <span>Visit</span>
                      <span className="collab-arrow">↗</span>
                    </div>
                  </SpotlightCard>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
