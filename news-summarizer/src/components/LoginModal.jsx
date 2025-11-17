import { useState } from 'react'

export default function LoginModal({ open, onClose, onSuccess }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  if (!open) return null

  function handleLogin() {
    if (name.trim() === 'cxe69') {
      setError('')
      onSuccess()
    } else {
      setError('Access denied: admin only')
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">Admin Login</div>
        <div className="disclaimer">Do not log in if you are not the admin.</div>
        <div className="form-grid">
          <label className="form-label">Username</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter admin username" />
        </div>
        {error && <div className="status" style={{ color: '#f87171' }}>{error}</div>}
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  )
}