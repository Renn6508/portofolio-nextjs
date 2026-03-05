'use client'

import { useState, useEffect } from 'react'
import Loader from '@/components/sections/Loader'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Ticker from '@/components/sections/Ticker'
import About from '@/components/sections/About'
import InternshipAvailability from '@/components/sections/InternshipAvailability'
import Skills from '@/components/sections/Skills'
import Dashboard from '@/components/sections/Dashboard'
import Work from '@/components/sections/Work'
import ParallaxBand from '@/components/sections/ParallaxBand'
import Gallery from '@/components/sections/Gallery'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Check if user has already seen the loader in this session
    const hasSeenLoader = sessionStorage.getItem('hasSeenLoader')
    
    if (hasSeenLoader) {
      // Skip loader if already seen
      setLoading(false)
      setShowContent(true)
    }
  }, [])

  const handleLoaderDone = () => {
    setLoading(false)
    // Mark that user has seen the loader
    sessionStorage.setItem('hasSeenLoader', 'true')
  }

  useEffect(() => {
    if (!loading) {
      // Small delay before showing content for smooth transition
      const timer = setTimeout(() => setShowContent(true), 100)
      return () => clearTimeout(timer)
    }
  }, [loading])

  return (
    <>
      {loading && <Loader onDone={handleLoaderDone} />}
      {!loading && (
        <div style={{ 
          opacity: showContent ? 1 : 0, 
          transition: 'opacity 0.5s ease-in-out' 
        }}>
          <Navbar />
          <main>
            <Hero />
            <Ticker />
            <About />
            <InternshipAvailability />
            <Skills />
            <Dashboard />
            <Work />
            <ParallaxBand />
            <Gallery />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  )
}
