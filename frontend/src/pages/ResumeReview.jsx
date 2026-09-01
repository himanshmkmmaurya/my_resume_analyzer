import { useState } from 'react'
import { pingGemini } from '../api/client'

export default function ResumeReview() {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handlePingGemini = async () => {
    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      const data = await pingGemini()
      setResponse(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Resume Analyzer - Smoke Test</h1>
      <p>This page tests the full stack: Frontend → Backend → Gemini API</p>

      <button
        onClick={handlePingGemini}
        disabled={loading}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        {loading ? 'Testing...' : 'Test Gemini API Connection'}
      </button>

      {error && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          borderRadius: '4px',
          border: '1px solid #f5c6cb',
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {response && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#d4edda',
          color: '#155724',
          borderRadius: '4px',
          border: '1px solid #c3e6cb',
        }}>
          <strong>Status:</strong> {response.status === 'success' ? '✓ Success' : '✗ Failed'}<br />
          <strong>Response:</strong> {response.message}
        </div>
      )}
    </div>
  )
}
