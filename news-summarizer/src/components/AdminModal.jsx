import { useEffect, useState } from 'react'
import CropModal from './CropModal'

export default function AdminModal({ open, onClose, profile, onSave, onRemovePhoto }) {
  const [photo, setPhoto] = useState(profile.photo || '')
  const [desc, setDesc] = useState(profile.description || '')
  const [igUrl, setIgUrl] = useState(profile.instagram || '')
  const [liUrl, setLiUrl] = useState(profile.linkedin || '')
  const [links, setLinks] = useState(profile.links || [])
  const [cropSrc, setCropSrc] = useState('')
  const [openCrop, setOpenCrop] = useState(false)

  useEffect(() => {
    setPhoto(profile.photo || '')
    setDesc(profile.description || '')
    setIgUrl(profile.instagram || '')
    setLiUrl(profile.linkedin || '')
    setLinks(profile.links || [])
  }, [profile, open])

  if (!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">Admin Settings</div>
        <div className="form-grid">
          <label className="form-label">Photo URL</label>
          <input className="input" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="https://..." />
        </div>
        <div className="form-grid" style={{ marginTop: '0.5rem' }}>
          <label className="form-label">Upload Image</label>
          <input className="input" type="file" accept="image/*" onChange={(e) => {
            const file = e.target.files?.[0]
            if (!file) return
            const reader = new FileReader()
            reader.onload = () => {
              const result = reader.result
              if (typeof result === 'string') { setCropSrc(result); setOpenCrop(true) }
            }
            reader.readAsDataURL(file)
          }} />
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <button className="btn" onClick={() => { setPhoto(''); onRemovePhoto(); }}>Remove Photo</button>
        </div>
        <div className="form-grid" style={{ marginTop: '0.75rem' }}>
          <label className="form-label">Description</label>
          <textarea className="input" rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Short about text"></textarea>
        </div>
        <div className="form-grid" style={{ marginTop: '0.75rem' }}>
          <label className="form-label">Instagram URL</label>
          <input className="input" value={igUrl} onChange={(e) => setIgUrl(e.target.value)} placeholder="https://instagram.com/..." />
        </div>
        <div className="form-grid" style={{ marginTop: '0.5rem' }}>
          <label className="form-label">LinkedIn URL</label>
          <input className="input" value={liUrl} onChange={(e) => setLiUrl(e.target.value)} placeholder="https://linkedin.com/in/..." />
        </div>
        <div className="modal-title" style={{ marginTop: '0.75rem' }}>Additional Links</div>
        {links.map((l, idx) => (
          <div key={idx} className="form-grid" style={{ marginBottom: '0.5rem' }}>
            <input className="input" value={l.label} onChange={(e) => {
              const next = [...links]; next[idx] = { ...next[idx], label: e.target.value }; setLinks(next)
            }} placeholder="Platform name (e.g., Twitter)" />
            <input className="input" value={l.url} onChange={(e) => {
              const next = [...links]; next[idx] = { ...next[idx], url: e.target.value }; setLinks(next)
            }} placeholder="https://..." />
            <button className="btn" onClick={() => {
              const next = links.filter((_, i) => i !== idx); setLinks(next)
            }}>Remove</button>
          </div>
        ))}
        <div>
          <button className="btn" onClick={() => setLinks([...links, { label: '', url: '' }])}>Add Link</button>
        </div>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn" onClick={() => onSave({ photo, description: desc, instagram: igUrl, linkedin: liUrl, links })}>Save</button>
        </div>
        <CropModal open={openCrop} src={cropSrc} onClose={() => setOpenCrop(false)} onApply={(dataUrl) => { setPhoto(dataUrl); setOpenCrop(false) }} />
      </div>
    </div>
  )
}