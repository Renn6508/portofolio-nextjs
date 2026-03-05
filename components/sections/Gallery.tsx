'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TiltedCard from '@/components/interactive/TiltedCard'
import SplitText from '@/components/interactive/SplitText'
import { CERTIFICATES } from '@/lib/data'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Certificate {
  id: number
  title: string
  issuer: string
  date: string
  image: string
  description: string
  pdfUrl: string
}

function CertificateModal({ certificate, onClose }: { certificate: Certificate; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const isClosing = useRef(false)

  const handleClose = () => {
    if (isClosing.current) return
    isClosing.current = true

    const tl = gsap.timeline({ onComplete: onClose })
    tl.to(panelRef.current, {
      y: 60,
      opacity: 0,
      scale: 0.9,
      duration: 0.35,
      ease: 'power3.in',
    }).to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' }, '-=0.15')
  }

  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' }).fromTo(
      panelRef.current,
      { y: 80, opacity: 0, scale: 0.92 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)' },
      '-=0.2'
    )
    return () => {
      tl.kill()
    }
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <div className="modal-overlay" onClick={handleClose} ref={overlayRef} style={{ opacity: 0 }}>
      <div className="certificate-modal-panel" onClick={(e) => e.stopPropagation()} ref={panelRef} style={{ opacity: 0 }}>
        <button className="modal-close" onClick={handleClose}>
          ✕
        </button>

        <div className="certificate-modal-image">
          <img src={certificate.image} alt={certificate.title} />
        </div>

        <div className="certificate-modal-body">
          <div className="certificate-modal-meta">
            <span className="certificate-issuer">{certificate.issuer}</span>
            <span className="certificate-date">{certificate.date}</span>
          </div>

          <h2 className="certificate-modal-title">{certificate.title}</h2>

          <p className="certificate-modal-description">{certificate.description}</p>

          <div className="certificate-modal-actions">
            <a href={certificate.pdfUrl} download={`${certificate.title.replace(/\s+/g, '_')}.pdf`} className="btn-download-pdf">
              <span>📥 Download Certificate</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null)
  const secRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gallery-card',
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.h-scroll-track', start: 'top 85%' },
        }
      )
    }, secRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="gallery-section" ref={secRef}>
      <div className="gallery-title-wrap container">
        <SplitText text="Professional Achievements" className="section-label" tag="span" stagger={0.04} y={15} />
        <SplitText text="CERTIFICATES" className="section-title" tag="h2" stagger={0.05} y={50} duration={0.7} />
      </div>
      <div className="h-scroll-track">
        {CERTIFICATES.map((cert) => (
          <div
            key={cert.id}
            className="gallery-card"
            role="button"
            tabIndex={0}
            onClick={() => setSelectedCert(cert)}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedCert(cert)}
          >
            <TiltedCard maxTilt={8} scale={1.03}>
              <img src={cert.image} alt={cert.title} />
              <div className="gallery-card-label">{cert.title}</div>
              <div className="gallery-cert-overlay">
                <span className="gallery-cert-click">Click for details</span>
              </div>
            </TiltedCard>
          </div>
        ))}
      </div>

      {selectedCert && <CertificateModal certificate={selectedCert} onClose={() => setSelectedCert(null)} />}
    </div>
  )
}
