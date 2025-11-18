// /Users/yash/Desktop/agents/portfolio/src/components/IntroOverlay.jsx
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(TextPlugin)

export default function IntroOverlay() {
  const ref = useRef(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(ref.current, { opacity: 0, filter: 'blur(24px)', duration: 0.6, ease: 'power2.out' }).then(() => {
          document.body.style.overflow = ''
          setDone(true)
        })
      }
    })
    tl.set(ref.current, { text: '' })
      .to(ref.current, { text: 'Designer', duration: 1, ease: 'none' })
      .to({}, { duration: 0.4 })
      .to(ref.current, { text: 'Coder', duration: 1, ease: 'none' })
      .to({}, { duration: 0.4 })
      .to(ref.current, { text: 'Creator', duration: 1, ease: 'none' })
      .to({}, { duration: 0.4 })
      .to(ref.current, { text: 'Innovator', duration: 1, ease: 'none' })
  }, [])

  if (done) return null

  return (
    <div className="intro-overlay">
      <div className="intro-word" ref={ref}></div>
    </div>
  )
}