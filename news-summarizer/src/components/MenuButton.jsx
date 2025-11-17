import { useEffect, useRef, useState } from 'react'

export default function MenuButton({ onOpenSettings, onOpenAbout, onOpenLogin }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onDocClick(e) {
      if (!ref.current) return
      if (!ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  return (
    <div className="menu" ref={ref}>
      <button className="kebab-btn" aria-label="Menu" onClick={() => setOpen(v => !v)}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      {open && (
        <div className="dropdown">
          <button className="dropdown-item" onClick={() => { setOpen(false); onOpenSettings() }}>Settings</button>
          <button className="dropdown-item" onClick={() => { setOpen(false); onOpenAbout() }}>About</button>
          <button className="dropdown-item" onClick={() => { setOpen(false); onOpenLogin() }}>Login</button>
        </div>
      )}
    </div>
  )
}