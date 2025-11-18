export default function Projects() {
  const url = 'http://localhost:5174/'

  return (
    <section className="section projects">
      <div className="title">Project</div>
      <div className="subtitle">Featured: News Summarizer</div>
      <div style={{ marginTop: '1rem' }}>
        <a className="glass card3d" href={url} target="_blank" rel="noreferrer" style={{ display: 'inline-block', padding: '1rem' }}>
          <div style={{ fontWeight: 700 }}>Open News Summarizer</div>
          <div style={{ color: 'var(--muted)' }}>React + GSAP • Topic/Country/Category • Admin edits</div>
        </a>
      </div>
      <div className="glass" style={{ padding: '1rem', marginTop: '0.75rem' }}>
        <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Run Both Locally</div>
        <div style={{ display: 'grid', gap: '0.35rem' }}>
          <div>1) Portfolio: <span className="cmd">npm run dev</span></div>
          <div>2) News Summarizer: <span className="cmd">npm run dev -- --port 5174</span></div>
          <div>3) Open: <span className="cmd">http://localhost:5173</span> and <span className="cmd">http://localhost:5174</span></div>
          <div>Optional share: <span className="cmd">ngrok http 5173</span> and <span className="cmd">ngrok http 5174</span></div>
        </div>
      </div>
    </section>
  )
}