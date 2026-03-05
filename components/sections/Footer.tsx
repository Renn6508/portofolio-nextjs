'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!footerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-col',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
        }
      )
      gsap.fromTo(
        '.footer-divider',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: '.footer-divider', start: 'top 95%' },
        }
      )
    }, footerRef)
    return () => ctx.revert()
  }, [])

  const scrollTo = (id: string) => {
    gsap.to(window, { duration: 1.2, scrollTo: `#${id}`, ease: 'power3.inOut' })
  }

  return (
    <footer className="footer" ref={footerRef}>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-brand-col">
            <div className="footer-logo">
              WILHELMINA<span>.</span>PORTFOLIO
            </div>
            <p className="footer-tagline">
              Full Stack Developer &amp; Creative Coder — crafting digital experiences that push boundaries.
            </p>
            <div className="footer-status">
              <span className="footer-status-dot" />
              <span className="footer-status-text">Available for Internship</span>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">NAVIGATION</h4>
            <ul className="footer-nav-list">
              {[
                { label: 'About', id: 'about' },
                { label: 'Skills', id: 'skills' },
                { label: 'Projects', id: 'work' },
                { label: 'Certificates', id: 'hero' },
                { label: 'Contact', id: 'contact' },
              ].map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="footer-nav-link"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollTo(link.id)
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">CONNECT</h4>
            <ul className="footer-nav-list">
              {[
                { label: 'GitHub', url: 'https://github.com/Renn6508' },
                { label: 'LinkedIn', url: 'https://www.linkedin.com/in/wilhelmina-lorenzia-wijaya-97045b3a9/' },
                { label: 'Instagram', url: 'https://www.instagram.com/ren_eyebqgs/' },
                { label: 'Twitter / X', url: 'https://x.com/ren_atos_person' },
              ].map((s) => (
                <li key={s.label}>
                  <a href={s.url} className="footer-nav-link" target="_blank" rel="noopener noreferrer">
                    {s.label}
                    <span className="footer-link-arrow">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">GET IN TOUCH</h4>
            <ul className="footer-nav-list footer-contact-list">
              <li>
                <span className="footer-contact-label">Email</span>
                <a href="mailto:wilhelmina6508@gmail.com" className="footer-nav-link">
                  wilhelmina6508@gmail.com
                </a>
              </li>
              <li>
                <span className="footer-contact-label">Phone</span>
                <a href="tel:+6281242124114" className="footer-nav-link">
                  +62 812-4212-4114
                </a>
              </li>
              <li>
                <span className="footer-contact-label">Location</span>
                <span className="footer-nav-link footer-location">Lumajang, Jawa Timur, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <div className="footer-copy">
            © {new Date().getFullYear()} YOUR<span>.</span>NAME — All rights reserved
          </div>
          <div className="footer-credits">
            Designed &amp; Built with <span className="footer-heart">♥</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
