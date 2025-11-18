import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

export default function Hero() {
  const nameRef = useRef(null)
  const taglines = ['Designer.', 'Coder.', 'Creator.', 'Innovator.']

  useEffect(() => {
    const el = nameRef.current
    const text = 'Yash Patel'
    el.innerHTML = ''
    const frag = document.createDocumentFragment()
    for (const ch of text) {
      const span = document.createElement('span')
      span.textContent = ch
      span.style.display = 'inline-block'
      span.style.opacity = '0'
      span.style.transform = 'translateY(12px)'
      frag.appendChild(span)
    }
    el.appendChild(frag)
    gsap.to(el.children, { opacity: 1, y: 0, duration: 1, ease: 'elastic.out(1, 0.6)', stagger: 0.06 })

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 })
    taglines.forEach(w => {
      tl.to('.tagline', { text: w, duration: 1, ease: 'none' }).to({}, { duration: 1 })
    })

    ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom+=2000 bottom',
      onUpdate: (self) => {
        const root = document.documentElement
        const p = self.progress
        root.classList.remove('font-thin','font-bold','font-italic','font-wide','font-poppins','font-grotesk')
        if (p < 0.25) root.classList.add('font-thin')
        else if (p < 0.5) root.classList.add('font-bold')
        else if (p < 0.75) root.classList.add('font-italic')
        else root.classList.add('font-wide')
        if (p < 0.5) root.classList.add('font-poppins')
        else root.classList.add('font-grotesk')
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="section hero">
      <div className="hero-inner">
        <div className="title neon-gradient" ref={nameRef}></div>
        <div className="tagline"></div>
        <div className="ring">
          <div className="text-ring">
            <span>⚡🔥💫🌀🦄 • Creative Tech • Gen‑Z • Cyber‑Aesthetic • Motion Magic •</span>
          </div>
        </div>
      </div>
    </section>
  )
}