'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TiltedCard from '@/components/interactive/TiltedCard'
import SplitText from '@/components/interactive/SplitText'
import BlurText from '@/components/interactive/BlurText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function About() {
  const secRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!imgRef.current || !statsRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: imgRef.current, start: 'top 80%' },
        }
      )

      // Count-up stats
      statsRef.current?.querySelectorAll('.stat-number').forEach((el) => {
        const target = parseInt((el as HTMLElement).dataset.val || '0')
        const suffix = (el as HTMLElement).dataset.suffix || ''
        ScrollTrigger.create({
          trigger: el as HTMLElement,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            const obj = { val: 0 }
            gsap.to(obj, {
              val: target,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate: () => {
                ;(el as HTMLElement).textContent = Math.round(obj.val) + suffix
              },
            })
          },
        })
      })
    }, secRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="about" id="about" ref={secRef}>
      <div className="container">
        <div className="about-grid">
          <div className="about-image-wrap" ref={imgRef}>
            <TiltedCard maxTilt={8} scale={1.02}>
              <img
                className="about-image"
                src="photo/photo.jpeg"
                alt="Profile"
              />
            </TiltedCard>
            <div className="about-image-badge">
              <span>2+</span>
              <small>Years Exp</small>
            </div>
          </div>

          <div className="about-text">
            <SplitText text="About Me" className="section-label" tag="span" stagger={0.04} y={15} />
            <SplitText text="DARE TO BE BOLD" className="section-title" tag="h2" stagger={0.04} y={50} duration={0.7} />
            <BlurText
              text="Hello! I'm Wilhelmina Lorenzia Wijaya, a Software Engineering (RPL) student at SMKN 1 Lumajang Vocational High School. I'm a disciplined, highly dedicated individual with a keen interest in software development. For me, coding isn't just a task, but a way to create solutions. I'm used to working neatly, paying attention to details, and always eager to learn new technologies."
              className="about-body"
              stagger={0.04}
              tag="p"
            />
            <BlurText
              text="As a Software Engineering student, I have a strong foundation in programming logic and application development. I am a fast learner and highly value discipline and responsibility. Through various school assignments and projects, I have learned to consistently complete work on time. I am ready to bring my positive energy and strong work ethic to a professional environment."
              className="about-body"
              stagger={0.04}
              delay={0.1}
              tag="p"
            />
            <div className="about-stats" ref={statsRef}>
              {[
                { val: 11, suffix: '+', label: 'Projects' },
                { val: 2, suffix: '+', label: 'Years Exp' },
                { val: 100, suffix: '%', label: 'Satisfaction' },
              ].map((s) => (
                <div className="stat" key={s.label}>
                  <div className="stat-number" data-val={s.val} data-suffix={s.suffix}>
                    {s.val}
                    {s.suffix}
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
