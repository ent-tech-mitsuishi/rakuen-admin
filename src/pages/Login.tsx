import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'

export function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080'

    try {
      const res = await fetch(`${apiUrl}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'ログインに失敗しました')
        return
      }

      // トークンを保存
      if (remember) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('adminName', data.name)
      } else {
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('adminName', data.name)
      }

      // ダッシュボードへ遷移
      navigate('/admin')
    } catch {
      setError('サーバーに接続できませんでした')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LoginForm
      username={username}
      password={password}
      remember={remember}
      error={error}
      isLoading={isLoading}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onRememberChange={setRemember}
      onSubmit={handleSubmit}
    />
  )
}
