import { useState, useRef, useCallback } from 'react'

export default function FileUpload({ onSubmit, isLoading }) {
  const [mode, setMode] = useState('upload')
  const [file, setFile] = useState(null)
  const [pastedText, setPastedText] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const validateFile = (f) => {
    if (!f) return 'No file selected.'
    if (f.type !== 'application/pdf' && f.type !== 'text/plain') return 'Only PDF or .txt files are supported.'
    if (f.size > 10 * 1024 * 1024) return 'File must be under 10 MB.'
    return ''
  }

  const handleFileDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files[0]
    const err = validateFile(dropped)
    if (err) { setError(err); return }
    setError(''); setFile(dropped)
  }, [])

  const handleFileSelect = (e) => {
    const selected = e.target.files[0]
    const err = validateFile(selected)
    if (err) { setError(err); return }
    setError(''); setFile(selected)
  }

  const handleSubmit = () => {
    setError('')
    if (mode === 'upload') {
      if (!file) { setError('Please select a file.'); return }
      onSubmit(file, null)
    } else {
      if (pastedText.trim().length < 50) { setError('Please paste a complete resume (at least 50 characters).'); return }
      onSubmit(null, pastedText.trim())
    }
  }

  return (
    <div className="ug-card" style={{ maxWidth: '640px', margin: '0 auto', padding: '32px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#212835', margin: '0 0 6px' }}>
        Upload Your Resume
      </h2>
      <p style={{ fontSize: '14px', color: '#586274', margin: '0 0 24px', lineHeight: '1.5' }}>
        Upload or paste your resume to get an AI readiness score across 5 dimensions.
      </p>

      {/* Mode toggle */}
      <div style={{ display: 'flex', backgroundColor: '#f7f7f7', borderRadius: '6px', padding: '4px', width: 'fit-content', marginBottom: '20px', border: '1px solid #ebecee' }}>
        {['upload', 'paste'].map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setError('') }}
            style={{
              padding: '8px 20px',
              borderRadius: '4px',
              border: 'none',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: mode === m ? '#fff' : 'transparent',
              color: mode === m ? '#ee2c3c' : '#586274',
              boxShadow: mode === m ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            {m === 'upload' ? '📁 Upload File' : '📋 Paste Text'}
          </button>
        ))}
      </div>

      {mode === 'upload' ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${isDragging ? '#ee2c3c' : file ? '#0a9044' : '#bfbfbf'}`,
            borderRadius: '8px',
            padding: '40px 24px',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: isDragging ? '#fff5f5' : file ? '#f0faf4' : '#fafafa',
            transition: 'all 0.2s',
          }}
        >
          <input ref={fileInputRef} type="file" accept=".pdf,.txt" style={{ display: 'none' }} onChange={handleFileSelect} />
          {file ? (
            <div>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>📄</div>
              <p style={{ fontWeight: '600', color: '#0a9044', margin: '0 0 4px', fontSize: '14px' }}>{file.name}</p>
              <p style={{ fontSize: '12px', color: '#586274', margin: '0 0 6px' }}>{(file.size / 1024).toFixed(1)} KB</p>
              <p style={{ fontSize: '11px', color: '#bfbfbf', margin: 0 }}>Click to change file</p>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>⬆️</div>
              <p style={{ fontWeight: '600', color: '#212835', margin: '0 0 6px', fontSize: '14px' }}>Drag & drop your resume here</p>
              <p style={{ fontSize: '12px', color: '#586274', margin: 0 }}>or click to browse — PDF or .txt, max 10 MB</p>
            </div>
          )}
        </div>
      ) : (
        <textarea
          value={pastedText}
          onChange={(e) => setPastedText(e.target.value)}
          placeholder="Paste your resume text here..."
          style={{
            width: '100%',
            height: '200px',
            border: '1.5px solid #ebecee',
            borderRadius: '8px',
            padding: '14px',
            fontSize: '13px',
            color: '#212835',
            resize: 'none',
            outline: 'none',
            fontFamily: 'inherit',
            boxSizing: 'border-box',
            lineHeight: '1.6',
          }}
          onFocus={e => e.target.style.borderColor = '#ee2c3c'}
          onBlur={e => e.target.style.borderColor = '#ebecee'}
        />
      )}

      {error && (
        <p style={{ color: '#e41212', fontSize: '13px', marginTop: '10px', marginBottom: 0 }}>{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="ug-btn-primary"
        style={{ marginTop: '20px', width: '100%', padding: '13px', borderRadius: '6px', fontSize: '15px', letterSpacing: '0.2px' }}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Resume'}
      </button>
    </div>
  )
}
