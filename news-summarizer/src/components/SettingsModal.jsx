export default function SettingsModal({ open, onClose, theme, setTheme, themes }) {
  if (!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">Settings</div>
        <div className="theme-grid">
          {themes.map(t => (
            <button
              key={t.id}
              className={`theme-item ${theme === t.id ? 'active' : ''}`}
              onClick={() => setTheme(t.id)}
              style={{ background: t.preview.bg, color: t.preview.text, borderColor: t.preview.border }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div style={{ marginTop: '1rem', textAlign: 'right' }}>
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}