'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SpotlightCard from '@/components/interactive/SpotlightCard'
import SplitText from '@/components/interactive/SplitText'
import { SKILLS, PROGRAMMING_LANGUAGES, FRAMEWORKS_TOOLS } from '@/lib/data'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

function SkillProficiency() {
  const secRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skill-bar-fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.skill-categories', start: 'top 75%' },
        }
      )
    }, secRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="skill-categories" ref={secRef}>
      <div className="skill-category">
        <h3 className="skill-category-title">LANGUAGES</h3>
        <div className="skill-bars">
          {PROGRAMMING_LANGUAGES.map((skill) => (
            <div className="skill-bar-item" key={skill.name}>
              <div className="skill-bar-header">
                <span className="skill-bar-name">{skill.name}</span>
                <span className="skill-bar-percent">{skill.percentage}%</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ '--progress': `${skill.percentage}%` } as any} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="skill-category">
        <h3 className="skill-category-title">FRAMEWORKS & TOOLS</h3>
        <div className="skill-bars">
          {FRAMEWORKS_TOOLS.map((skill) => (
            <div className="skill-bar-item" key={skill.name}>
              <div className="skill-bar-header">
                <span className="skill-bar-name">{skill.name}</span>
                <span className="skill-bar-percent">{skill.percentage}%</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ '--progress': `${skill.percentage}%` } as any} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const secRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skill-card-wrap',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.skills-grid', start: 'top 75%' },
        }
      )
    }, secRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="skills" id="skills" ref={secRef}>
      <div className="container">
        <div className="skills-header">
          <div>
            <SplitText text="What I Do" className="section-label" tag="span" stagger={0.04} y={15} />
            <SplitText text="SKILLS & EXPERTISE" className="section-title" tag="h2" stagger={0.04} y={50} duration={0.7} />
          </div>
        </div>
        <div className="skills-grid">
          {SKILLS.map((s) => (
            <div className="skill-card-wrap" key={s.name}>
              <SpotlightCard className="skill-card" spotlightColor="rgba(232,0,30,0.12)">
                <span className="skill-icon">{s.icon}</span>
                <div className="skill-name">{s.name}</div>
                <div className="skill-desc">{s.desc}</div>
                <div className="skill-level">{s.level}</div>
              </SpotlightCard>
            </div>
          ))}
        </div>

        <div className="skills-proficiency-wrapper">
          <SkillProficiency />
        </div>
      </div>
    </section>
  )
}
