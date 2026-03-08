import { useState, useRef, useCallback } from 'react'

export default function FileUpload({ onSubmit, isLoading }) {
  const [mode, setMode] = useState('upload') // 'upload' | 'paste'
  const [file, setFile] = useState(null)
  const [pastedText, setPastedText] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const validateFile = (f) => {
    if (!f) return 'No file selected.'
    if (f.type !== 'application/pdf' && f.type !== 'text/plain') {
      return 'Only PDF or .txt files are supported.'
    }
    if (f.size > 10 * 1024 * 1024) return 'File must be under 10 MB.'
    return ''
  }

  const handleFileDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files[0]
    const err = validateFile(dropped)
    if (err) { setError(err); return }
    setError('')
    setFile(dropped)
  }, [])

  const handleFileSelect = (e) => {
    const selected = e.target.files[0]
    const err = validateFile(selected)
    if (err) { setError(err); return }
    setError('')
    setFile(selected)
  }

  const handleSubmit = () => {
    setError('')
    if (mode === 'upload') {
      if (!file) { setError('Please select a file.'); return }
      onSubmit(file, null)
    } else {
      if (pastedText.trim().length < 50) {
        setError('Please paste a complete resume (at least 50 characters).')
        return
      }
      onSubmit(null, pastedText.trim())
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">AI Readiness Resume Analyzer</h2>
      <p className="text-gray-500 text-sm mb-6">
        Upload or paste your resume to get an AI readiness score across 5 dimensions.
      </p>

      {/* Mode toggle */}
      <div className="flex rounded-lg bg-gray-100 p-1 mb-6 w-fit">
        {['upload', 'paste'].map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setError('') }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
              mode === m
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {m === 'upload' ? 'Upload File' : 'Paste Text'}
          </button>
        ))}
      </div>

      {mode === 'upload' ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
            isDragging
              ? 'border-indigo-400 bg-indigo-50'
              : file
              ? 'border-green-400 bg-green-50'
              : 'border-gray-300 hover:border-indigo-300 hover:bg-gray-50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.txt"
            className="hidden"
            onChange={handleFileSelect}
          />
          {file ? (
            <div>
              <div className="text-3xl mb-2">📄</div>
              <p className="font-medium text-green-700">{file.name}</p>
              <p className="text-sm text-gray-400 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
              <p className="text-xs text-gray-400 mt-2">Click to change file</p>
            </div>
          ) : (
            <div>
              <div className="text-4xl mb-3">⬆️</div>
              <p className="font-medium text-gray-600">Drag & drop your resume here</p>
              <p className="text-sm text-gray-400 mt-1">or click to browse — PDF or .txt, max 10 MB</p>
            </div>
          )}
        </div>
      ) : (
        <textarea
          value={pastedText}
          onChange={(e) => setPastedText(e.target.value)}
          placeholder="Paste your resume text here..."
          className="w-full h-56 border border-gray-300 rounded-xl p-4 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
        />
      )}

      {error && (
        <p className="text-red-500 text-sm mt-3">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`mt-6 w-full py-3 rounded-xl font-semibold text-white transition-all ${
          isLoading
            ? 'bg-indigo-300 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 cursor-pointer'
        }`}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Resume'}
      </button>
    </div>
  )
}
