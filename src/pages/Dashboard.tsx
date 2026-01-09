import { useLoaderData } from 'react-router-dom'

interface HealthStatus {
  status: string
  message: string
}

interface DashboardLoaderData {
  health: HealthStatus | null
  error: string | null
}

export async function dashboardLoader(): Promise<DashboardLoaderData> {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080'

  try {
    const res = await fetch(`${apiUrl}/health`)
    const health = await res.json()
    return { health, error: null }
  } catch (err) {
    return { health: null, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}

export function Dashboard() {
  const { health, error } = useLoaderData() as DashboardLoaderData

  return (
    <div>
      <h1>ダッシュボード</h1>
      <div style={{ marginTop: '1rem' }}>
        <h2>API Status</h2>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {health && (
          <p style={{ color: health.status === 'healthy' ? 'green' : 'red' }}>
            {health.status}: {health.message}
          </p>
        )}
      </div>
    </div>
  )
}
