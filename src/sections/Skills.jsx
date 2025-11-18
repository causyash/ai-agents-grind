export default function Skills() {
  const items = [
    'React', 'GSAP', 'ScrollTrigger', 'Three.js', 'AI Workflows', 'CSS Art', 'Kinetic Type', 'Parallax', 'UX Minimalism'
  ]
  return (
    <section className="section">
      <div className="title">Skills</div>
      <div className="subtitle">Tech-bubbles with animated vibes</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '1rem' }}>
        {items.map((t, i) => (
          <div key={i} className="glass" style={{ padding: '0.6rem 0.8rem', borderRadius: '999px', animation: 'neonPulse 3s ease infinite' }}>{t}</div>
        ))}
      </div>
    </section>
  )
}