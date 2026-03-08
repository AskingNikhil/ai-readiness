export default function LoadingSpinner() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
      <div style={{
        width: '52px',
        height: '52px',
        border: '3px solid #fcd5d8',
        borderTopColor: '#ee2c3c',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        marginBottom: '20px',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ fontSize: '15px', fontWeight: '500', color: '#212835', margin: '0 0 6px' }}>
        Analyzing your resume...
      </p>
      <p style={{ fontSize: '13px', color: '#586274', margin: 0 }}>
        Claude is evaluating AI readiness across 5 dimensions. This takes 10–20 seconds.
      </p>
    </div>
  )
}
