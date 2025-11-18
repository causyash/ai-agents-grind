// /Users/yash/Desktop/agents/portfolio/src/components/Background.jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

export default function Background() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const words = ['Designer', 'Coder', 'Creator', 'Innovator']
    function setWord(next) {
      const tl = gsap.timeline()
      const isSmall = window.matchMedia('(max-width: 600px)').matches
      const blurIn = isSmall ? 16 : 24
      const blurOut = isSmall ? 6 : 8
      tl.to(el, { opacity: 0, filter: `blur(${blurIn}px)`, duration: 0.4, ease: 'power2.out' })
        .call(() => { el.textContent = '' })
        .to(el, { text: next, duration: 1, ease: 'none' })
        .to(el, { opacity: 0.18, filter: `blur(${blurOut}px)`, duration: 0.6, ease: 'power2.out' })
    }
    setWord(words[0])
    document.querySelectorAll('.section').forEach((sec, i) => {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top center',
        onEnter: () => setWord(words[i % words.length]),
        onEnterBack: () => setWord(words[i % words.length]),
      })
    })
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])
  return (
    <div className="bg-container">
      <div className="bg-word" ref={ref}></div>
    </div>
  )
}