import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(TextPlugin)

export default function AboutModal({ open, onClose, profile }) {
  const cardRef = useRef(null)
  const avatarRef = useRef(null)
  const avatarImgRef = useRef(null)
  const nameRef = useRef(null)
  const descRef = useRef(null)
  const igRef = useRef(null)
  const liRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const tl = gsap.timeline()
    tl.set(cardRef.current, { opacity: 0 })
      .set(avatarRef.current, { opacity: 0, y: 16 })
      .set([nameRef.current, descRef.current, igRef.current, liRef.current], { opacity: 1 })
      .set(nameRef.current, { text: '' })
      .set(descRef.current, { text: '' })
      .set(igRef.current, { text: '' })
      .set(liRef.current, { text: '' })
      .to(cardRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' })
      .to(avatarRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' })
      .to(avatarRef.current, { y: -12, duration: 0.35, ease: 'power2.out' })
      .to(nameRef.current, { text: 'Yash Patel', duration: 1.1, ease: 'none' })
      .to(descRef.current, { text: profile.description || 'Frontend enthusiast crafting smooth, readable UIs with React.', duration: 1.6, ease: 'none' })
      .to(igRef.current, { text: 'Instagram', duration: 0.9, ease: 'none' })
      .to(liRef.current, { text: 'LinkedIn', duration: 0.9, ease: 'none' })
    return () => tl.kill()
  }, [open, profile.description])

  if (!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">About</div>
        <div ref={cardRef} className="about-card">
          <div ref={avatarRef} className="about-avatar">
            {profile.photo ? (
              <img ref={avatarImgRef} src={profile.photo} alt="Yash Patel" />
            ) : (
              <div style={{display:'grid',placeItems:'center',width:'100%',height:'100%',color:'var(--text)'}}>Y</div>
            )}
          </div>
          <div className="profile-info">
            <div ref={nameRef} className="name"></div>
            <div ref={descRef} className="about-desc"></div>
            <div className="links">
              <a ref={igRef} href={profile.instagram || 'https://www.instagram.com/yash.cxe?igsh=MWd2eWo2anc0eXpsaQ%3D%3D&utm_source=qr'} target="_blank" rel="noreferrer"></a>
              <a ref={liRef} href={profile.linkedin || 'https://www.linkedin.com/in/yash-patel-b833002b2/'} target="_blank" rel="noreferrer" style={{ marginLeft: '0.75rem' }}></a>
              {Array.isArray(profile.links) && profile.links.length > 0 && (
                <div style={{ marginTop: '0.5rem' }}>
                  {profile.links.map((l, i) => (
                    <a key={i} href={l.url} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginRight: '0.75rem' }}>{l.label || 'Link'}</a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div style={{ marginTop: '1rem', textAlign: 'right' }}>
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}