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
import { useMemo, useState, type CSSProperties } from 'react'

function App() {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    return !sessionStorage.getItem('intro-seen')
  })

  const starShadows = useMemo(() => {
  const range = 2000;
  const rand = () => Math.floor(Math.random() * range);

  // Star colours
  const palette = [
    'rgba(129,140,248,0.9)',      // indigo
    'rgba(236,72,153,0.75)',      // pink
  ];
  const randColor = () => palette[Math.floor(Math.random() * palette.length)];

  const gen = (count: number) =>
    Array.from({ length: count }, () => `${rand()}px ${rand()}px ${randColor()}`).join(', ');

  return {
    small: gen(90),
    medium: gen(60),
    big: gen(35),
  };
}, []);

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
        <Hero introComplete={!showIntro} />
      </motion.main>
      {showIntro && <IntroReveal onComplete={handleIntroComplete} />}
      <div
        className="starfield"
        style={
          {
            '--stars-small': starShadows.small,
            '--stars-medium': starShadows.medium,
            '--stars-big': starShadows.big,
          } as CSSProperties
        }
      >
        <div className="starfield__layer starfield__layer--small" aria-hidden="true" />
        <div className="starfield__layer starfield__layer--medium" aria-hidden="true" />
        <div className="starfield__layer starfield__layer--big" aria-hidden="true" />
        <main className="relative">
          <Navbar />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
        </main>
        
      </div>
      <Footer />
    </div>
  )
}

export default App
