import { Navigate, Outlet } from 'react-router-dom'

function getToken(): string | null {
  return localStorage.getItem('token') || sessionStorage.getItem('token')
}

export function ProtectedRoute() {
  const token = getToken()

  if (!token) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}
