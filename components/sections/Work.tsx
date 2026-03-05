'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SpotlightCard from '@/components/interactive/SpotlightCard'
import TiltedCard from '@/components/interactive/TiltedCard'
import SplitText from '@/components/interactive/SplitText'
import ProjectModal from '@/components/interactive/ProjectModal'
import { PROJECTS } from '@/lib/data'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Work() {
  const [selected, setSelected] = useState<any>(null)
  const secRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-item',
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.work-list', start: 'top 80%' },
        }
      )
      gsap.fromTo(
        '.work-preview-card-wrap',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.work-preview-grid', start: 'top 85%' },
        }
      )
    }, secRef)
    return () => ctx.revert()
  }, [])

  const openModal = (project: any) => setSelected(project)

  return (
    <section className="work" id="work" ref={secRef}>
      <div className="container">
        <div className="work-header">
          <SplitText text="Selected Work" className="section-label" tag="span" stagger={0.04} y={15} />
          <SplitText text="PROJECTS" className="section-title" tag="h2" stagger={0.05} y={50} duration={0.7} />
        </div>

        <div className="work-list">
          {PROJECTS.map((p) => (
            <div
              key={p.num}
              className="work-item"
              onClick={() => openModal(p)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openModal(p)}
            >
              <span className="work-num">{p.num}</span>

              <div className="work-item-center">
                <span className="work-title">{p.title}</span>
                <span className="work-year">{p.year}</span>
              </div>

              <div className="work-tags">
                {p.tags.map((t) => (
                  <span className="work-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="work-cta" aria-label="Lihat detail project">
                <span className="work-cta-text">Detail</span>
                <span className="work-arrow">→</span>
              </div>
            </div>
          ))}
        </div>

        <div className="work-preview-grid">
          {PROJECTS.slice(0, 3).map((p) => (
            <div className="work-preview-card-wrap" key={p.num}>
              <TiltedCard maxTilt={10} scale={1.04}>
                <SpotlightCard className="work-preview-card" spotlightColor="rgba(232,0,30,0.1)">
                  <div className="work-preview-img-wrap">
                    <img src={p.image} alt={p.title} className="work-preview-img" />
                    <div className="work-preview-img-overlay" />
                  </div>
                  <div className="work-preview-info">
                    <span className="work-preview-num">{p.num}</span>
                    <h3 className="work-preview-title">{p.title}</h3>
                    <div className="work-preview-tags">
                      {p.tags.map((t) => (
                        <span key={t} className="work-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                    <button className="work-preview-btn" onClick={() => openModal(p)}>
                      Open Project <span>→</span>
                    </button>
                  </div>
                </SpotlightCard>
              </TiltedCard>
            </div>
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
