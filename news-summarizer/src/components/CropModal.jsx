import { useEffect, useRef, useState } from 'react'

export default function CropModal({ open, src, onClose, onApply }) {
  const [scale, setScale] = useState(1)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)
  const imgRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!open) return
    setScale(1)
    setOffsetX(0)
    setOffsetY(0)
  }, [open, src])

  function drawPreview() {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = imgRef.current
    const size = 240
    canvas.width = size
    canvas.height = size
    ctx.clearRect(0, 0, size, size)
    ctx.save()
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()

    if (img && img.complete) {
      const iw = img.naturalWidth
      const ih = img.naturalHeight
      const s = Math.max(size / Math.min(iw, ih), 0) * scale
      const drawW = iw * s
      const drawH = ih * s
      const dx = size / 2 - drawW / 2 + offsetX
      const dy = size / 2 - drawH / 2 + offsetY
      ctx.drawImage(img, dx, dy, drawW, drawH)
    }
    ctx.restore()
  }

  useEffect(() => {
    if (!open) return
    drawPreview()
    // drawPreview depends on latest refs and state; safe to call here
  }, [open, scale, offsetX, offsetY, src])

  function handleApply() {
    const dataUrl = canvasRef.current.toDataURL('image/png')
    onApply(dataUrl)
  }

  if (!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">Crop Image (Circle)</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: '0.75rem' }}>
          <div>
            <div className="form-grid">
              <label className="form-label">Scale</label>
              <input className="input" type="range" min="0.5" max="2.0" step="0.01" value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))} />
            </div>
            <div className="form-grid" style={{ marginTop: '0.5rem' }}>
              <label className="form-label">Offset X</label>
              <input className="input" type="range" min="-80" max="80" step="1" value={offsetX}
                onChange={(e) => setOffsetX(parseInt(e.target.value))} />
            </div>
            <div className="form-grid" style={{ marginTop: '0.5rem' }}>
              <label className="form-label">Offset Y</label>
              <input className="input" type="range" min="-80" max="80" step="1" value={offsetY}
                onChange={(e) => setOffsetY(parseInt(e.target.value))} />
            </div>
          </div>
          <div style={{ display: 'grid', placeItems: 'center' }}>
            <canvas ref={canvasRef} style={{ borderRadius: '50%', border: '1px solid #1f2937' }} />
          </div>
        </div>
        <img ref={imgRef} src={src} alt="to-crop" style={{ display: 'none' }} onLoad={drawPreview} />
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn" onClick={handleApply}>Apply Crop</button>
        </div>
      </div>
    </div>
  )
}