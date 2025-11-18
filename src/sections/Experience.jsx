import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const cards = el.querySelectorAll('.exp')
    cards.forEach((c) => {
      gsap.from(c, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: c, start: 'top 80%' }
      })
    })
  }, [])
  return (
    <section className="section" ref={ref}>
      <div className="title">Experience</div>
      <div className="subtitle">Timeline reveals on scroll</div>
      <div style={{ borderLeft: '2px solid var(--border)', marginTop: '1rem' }}>
        {[1,2,3].map(i => (
          <div key={i} className="glass exp" style={{ padding: '1rem', marginLeft: '1rem', marginBottom: '0.75rem' }}>
            <div style={{ fontWeight: 700 }}>Role #{i}</div>
            <div style={{ color: 'var(--muted)' }}>Futuristic dev • creative tech artist • GSAP motion</div>
          </div>
        ))}
      </div>
    </section>
  )
}