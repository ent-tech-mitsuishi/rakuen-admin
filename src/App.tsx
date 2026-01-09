import { useEffect, useState } from 'react'

interface HealthStatus {
  status: string
  message: string
}

function App() {
  const [health, setHealth] = useState<HealthStatus | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080'

    fetch(`${apiUrl}/health`)
      .then(res => res.json())
      .then(data => setHealth(data))
      .catch(err => setError(err.message))
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>ラクエン 管理画面</h1>
      <div style={{ marginTop: '1rem' }}>
        <h2>API Status</h2>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {health && (
          <p style={{ color: health.status === 'healthy' ? 'green' : 'red' }}>
            {health.status}: {health.message}
          </p>
        )}
        {!health && !error && <p>Loading...</p>}
      </div>
    </div>
  )
}

export default App
