import { Link, useLoaderData } from 'react-router-dom'

interface HealthStatus {
  status: string
  message: string
}

interface HomeLoaderData {
  health: HealthStatus | null
  error: string | null
}

export async function homeLoader(): Promise<HomeLoaderData> {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080'

  try {
    const res = await fetch(`${apiUrl}/health`)
    const health = await res.json()
    return { health, error: null }
  } catch (err) {
    return { health: null, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}

export function Home() {
  const { health, error } = useLoaderData() as HomeLoaderData

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: '2rem',
        backgroundColor: '#f9fafb',
      }}
    >
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>
        ラクエン
      </h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link
          to="/admin"
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#3b82f6',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '0.5rem',
            fontWeight: 'bold',
          }}
        >
          管理者
        </Link>
        <Link
          to="/user"
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#10b981',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '0.5rem',
            fontWeight: 'bold',
          }}
        >
          ユーザー
        </Link>
      </div>
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>API Status</p>
        {error && <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>Error: {error}</p>}
        {health && (
          <p style={{ color: health.status === 'healthy' ? '#10b981' : '#ef4444', fontSize: '0.875rem' }}>
            {health.status}: {health.message}
          </p>
        )}
      </div>
    </div>
  )
}
