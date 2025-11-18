import { useEffect, useRef } from 'react'

export default function Contact() {
  const btnRef = useRef(null)
  useEffect(() => {
    const el = btnRef.current
    function calc(x, y) {
      const rect = el.getBoundingClientRect()
      const dx = x - rect.left - rect.width / 2
      const dy = y - rect.top - rect.height / 2
      el.style.transform = `translate(${dx * 0.08}px, ${dy * 0.08}px)`
    }
    function onMouse(e) { calc(e.clientX, e.clientY) }
    function onLeave() { el.style.transform = 'translate(0,0)' }
    function onTouch(e) {
      const t = e.touches && e.touches[0]
      if (t) calc(t.clientX, t.clientY)
    }
    function onTouchEnd() { onLeave() }
    el.addEventListener('mousemove', onMouse)
    el.addEventListener('mouseleave', onLeave)
    el.addEventListener('touchmove', onTouch, { passive: true })
    el.addEventListener('touchend', onTouchEnd)
    return () => {
      el.removeEventListener('mousemove', onMouse)
      el.removeEventListener('mouseleave', onLeave)
      el.removeEventListener('touchmove', onTouch)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [])
  return (
    <section className="section">
      <div className="title">Contact</div>
      <div className="subtitle">Glowing form fields + magnetic send button</div>
      <form style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
        <input className="glass" placeholder="Your name" style={{ padding: '0.9rem 1rem' }} />
        <input className="glass" placeholder="Email" style={{ padding: '0.9rem 1rem' }} />
        <textarea className="glass" rows={4} placeholder="Message" style={{ padding: '0.9rem 1rem' }}></textarea>
        <div className="magnet"><button ref={btnRef} type="button" className="btn">Send →</button></div>
      </form>
    </section>
  )
}