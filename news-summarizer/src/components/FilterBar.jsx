import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { COUNTRIES, CATEGORIES } from '../data/countries'

export default function FilterBar({ topic, setTopic, country, setCountry, category, setCategory, onSearch, loading }) {
  const rootRef = useRef(null)
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const reduce = typeof window !== 'undefined' && (
      window.matchMedia('(max-width: 640px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
    if (reduce) return
    gsap.from(el.children, { opacity: 0, y: 8, stagger: 0.06, duration: 0.5, ease: 'power2.out' })
  }, [])

  const placeholder = [`Search topic`]
    .concat(country && country !== 'worldwide' ? [`${COUNTRIES.find(c => c.code === country)?.name}`] : [])
    .concat(category ? [CATEGORIES.find(c => c.id === category)?.label] : [])
    .join(' • ')

  return (
    <div className="filters" ref={rootRef}>
      <input
        className="input"
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder={placeholder || 'Search topic'}
      />
      <select className="select" value={country} onChange={(e) => setCountry(e.target.value)}>
        {COUNTRIES.map(c => (
          <option key={c.code} value={c.code}>{c.name}</option>
        ))}
      </select>
      <select className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
        {CATEGORIES.map(c => (
          <option key={c.id} value={c.id}>{c.label}</option>
        ))}
      </select>
      <button className="btn" onClick={onSearch} disabled={loading}>Search</button>
    </div>
  )
}