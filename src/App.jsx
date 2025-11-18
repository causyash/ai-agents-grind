import './App.css'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import Background from './sections/components/Background'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const titles = document.querySelectorAll('.title')
    titles.forEach(t => {
      gsap.fromTo(t, { letterSpacing: '0em', opacity: 0.85 }, { letterSpacing: '0.08em', opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: t, start: 'top 80%' } })
    })
  }, [])
  return (
    <>
      <div className="content">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </div>
      <Background />
    </>
  )
}
