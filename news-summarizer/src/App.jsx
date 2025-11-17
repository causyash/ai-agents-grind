import { useEffect, useMemo, useState } from 'react'
import './App.css'
import FilterBar from './components/FilterBar'
import NewsList from './components/NewsList'
import MenuButton from './components/MenuButton'
import SettingsModal from './components/SettingsModal'
import AboutModal from './components/AboutModal'
import LoginModal from './components/LoginModal'
import AdminModal from './components/AdminModal'
import { COUNTRIES, CATEGORIES } from './data/countries'
import { fetchNews } from './api/newsApi'

function App() {
  const [topic, setTopic] = useState('')
  const [country, setCountry] = useState('worldwide')
  const [category, setCategory] = useState('')
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [theme, setTheme] = useState('dark')
  const [openSettings, setOpenSettings] = useState(false)
  const [openAbout, setOpenAbout] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [openAdmin, setOpenAdmin] = useState(false)
  const [profile, setProfile] = useState({
    photo: '',
    description: 'Frontend enthusiast crafting smooth, readable UIs with React.',
    instagram: 'https://www.instagram.com/yash.cxe?igsh=MWd2eWo2anc0eXpsaQ%3D%3D&utm_source=qr',
    linkedin: 'https://www.linkedin.com/in/yash-patel-b833002b2/',
    links: []
  })

  useEffect(() => {
    handleSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const themes = ['theme-dark','theme-light','theme-ocean','theme-forest','theme-rose','theme-sunset']
    for (const t of themes) root.classList.remove(t)
    const cls = `theme-${theme}`
    root.classList.add(cls)
  }, [theme])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('profile')
      if (stored) setProfile(JSON.parse(stored))
    } catch {
      // ignore storage errors
    }
  }, [])

  function saveProfile(p) {
    const next = { ...profile, ...p }
    setProfile(next)
    try { localStorage.setItem('profile', JSON.stringify(next)) } catch {
      // ignore storage errors
    }
  }

  const activeChips = useMemo(() => {
    const chips = []
    if (topic) chips.push(`Topic: ${topic}`)
    const cName = COUNTRIES.find(c => c.code === country)?.name
    if (country && country !== 'worldwide') chips.push(`Country: ${cName}`)
    const catLabel = CATEGORIES.find(c => c.id === category)?.label
    if (category) chips.push(`Category: ${catLabel}`)
    if (!chips.length) chips.push('Showing worldwide trending news')
    return chips
  }, [topic, country, category])

  async function handleSearch() {
    setLoading(true)
    setError('')
    try {
      const result = await fetchNews({ country, category, topic })
      setArticles(result)
    } catch (e) {
      setError(e.message || 'Failed to fetch news')
      setArticles([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <MenuButton onOpenSettings={() => setOpenSettings(true)} onOpenAbout={() => setOpenAbout(true)} onOpenLogin={() => setOpenLogin(true)} />
      <div className="app-title">News Summarizer Agent</div>
      <div className="subtitle">Search topics, filter by country and category. Smooth UI with GSAP.</div>
      <div className="panel">
        <FilterBar
          topic={topic}
          setTopic={setTopic}
          country={country}
          setCountry={setCountry}
          category={category}
          setCategory={setCategory}
          onSearch={handleSearch}
          loading={loading}
        />
        <div className="chips">
          {activeChips.map((c, i) => (
            <span key={i} className="chip">{c}</span>
          ))}
        </div>
        {loading && <div className="status">Loading…</div>}
        {error && <div className="status">{error}</div>}
      </div>
      <NewsList articles={articles} topic={topic} />
      <SettingsModal
        open={openSettings}
        onClose={() => setOpenSettings(false)}
        theme={theme}
        setTheme={setTheme}
        themes={[
          { id: 'dark', label: 'Dark', preview: { bg: '#0f172a', text: '#e5e7eb', border: '#1f2937' } },
          { id: 'light', label: 'Light', preview: { bg: '#ffffff', text: '#0b1220', border: '#e5e7eb' } },
          { id: 'ocean', label: 'Ocean', preview: { bg: '#0f1b2e', text: '#dbeafe', border: '#0e1726' } },
          { id: 'forest', label: 'Forest', preview: { bg: '#0f1f16', text: '#e7f5e7', border: '#142419' } },
          { id: 'rose', label: 'Rose', preview: { bg: '#23141a', text: '#ffe4e6', border: '#2b1821' } },
          { id: 'sunset', label: 'Sunset', preview: { bg: '#22172a', text: '#fde68a', border: '#2a1c33' } },
        ]}
      />
      <AboutModal open={openAbout} onClose={() => setOpenAbout(false)} profile={profile} />
      <LoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onSuccess={() => { setIsAdmin(true); setOpenLogin(false); setOpenAdmin(true) }}
      />
      <AdminModal
        open={openAdmin && isAdmin}
        onClose={() => setOpenAdmin(false)}
        profile={profile}
        onSave={(p) => { saveProfile(p); setOpenAdmin(false) }}
        onRemovePhoto={() => saveProfile({ photo: '' })}
      />
    </div>
  )
}

export default App
