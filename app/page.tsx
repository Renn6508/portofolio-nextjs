'use client'

import { useState } from 'react'
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

  return (
    <>
      {!loading && <Loader onDone={() => setLoading(true)} />}
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
    </>
  )
}
