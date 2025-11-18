export default function About() {
  return (
    <section className="section">
      <div className="glass" style={{ padding: '1.25rem' }}>
        <div className="creator">
          <span className="name">Created by Yash</span>
          <a className="link-neon" href="https://www.instagram.com/yash.cxe?igsh=MWd2eWo2anc0eXpsaQ%3D%3D&utm_source=" target="_blank" rel="noreferrer">@yash.cxe</a>
        </div>
        <div className="title">About Me</div>
        <div className="subtitle">Frontend Dev with React + GSAP Motion Magic • AI-powered Design Workflows • 3D & Micro-Animation UI Enthusiast • Creative Problem Solver (Gen‑Z Edition)</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginTop: '1rem' }}>
          <div className="glass card3d" style={{ padding: '1rem' }}>⚡ I don’t code websites… I craft experiences.</div>
          <div className="glass card3d" style={{ padding: '1rem' }}>🔥 Powered by caffeine, pixels & chaos.</div>
          <div className="glass card3d" style={{ padding: '1rem' }}>💫 Scrolling = discovering.</div>
        </div>
      </div>
    </section>
  )
}