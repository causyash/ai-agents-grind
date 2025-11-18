import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { summarizeArticle } from '../utils/summarize'

export default function NewsList({ articles, topic }) {
  const listRef = useRef(null)
  useEffect(() => {
    const el = listRef.current
    if (!el) return
    const reduce = typeof window !== 'undefined' && (
      window.matchMedia('(max-width: 640px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
    if (reduce) return
    gsap.from(el.children, { opacity: 0, y: 12, duration: 0.45, stagger: 0.05, ease: 'power2.out' })
  }, [articles])

  return (
    <div className="list" ref={listRef}>
      {articles.map((a, idx) => (
        <article key={`${a.url}-${idx}`} className="card">
          <img src={a.urlToImage || 'https://via.placeholder.com/160x120?text=News'} alt="" />
          <div>
            <h3>{a.title}</h3>
            <div className="meta">{a.source?.name} • {new Date(a.publishedAt).toLocaleString()}</div>
            <div className="summary">{summarizeArticle(a, topic)}</div>
            <div style={{ marginTop: '0.5rem' }}>
              <a href={a.url} target="_blank" rel="noreferrer">Read full article →</a>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}