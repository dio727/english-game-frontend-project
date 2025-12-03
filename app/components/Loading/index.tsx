'use client'

export default function Loading() {
  return (
    <div style={wrapperStyle}>
      <img src="/loading.gif" alt="Loading..." style={gifStyle} />
      <p style={textStyle}>Loading...</p>
    </div>
  )
}

const wrapperStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0, 0, 0, 0.65)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  backdropFilter: 'blur(3px)'
}

const gifStyle: React.CSSProperties = {
  width: '120px',
  height: '120px',
  objectFit: 'contain'
}

const textStyle: React.CSSProperties = {
  marginTop: '15px',
  color: '#fff',
  fontSize: '20px',
  fontWeight: 'bold',
  letterSpacing: '1px'
}
