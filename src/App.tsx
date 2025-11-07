import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { IntroReveal } from './components/IntroReveal'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { motion } from 'framer-motion'
import { useState } from 'react'

function App() {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    return !sessionStorage.getItem('intro-seen')
  })

  const handleIntroComplete = () => {
    sessionStorage.setItem('intro-seen', '1')
    setShowIntro(false)
  }
  return (
    <div className="min-h-dvh bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <motion.main
        initial={{ filter: 'blur(12px)' }}
        animate={{ filter: 'blur(0px)' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Hero />
      </motion.main>
      {showIntro && <IntroReveal onComplete={handleIntroComplete} />}
      <main>
        <Navbar />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
