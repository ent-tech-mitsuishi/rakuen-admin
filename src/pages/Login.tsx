import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    <div className="common__login">
      <div className="common__title">
        <h2 className="common__h2">管理者ログイン</h2>
      </div>
      <div className="common__body">
        <div className="common__form">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="common__form--error" style={{ color: '#dc2626', marginBottom: '1rem', textAlign: 'center' }}>
                {error}
              </div>
            )}
            <div className="common__form--item">
              <div className="common__form--content">
                <input
                  type="text"
                  name="username"
                  placeholder="ユーザー名"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="common__form--item">
              <div className="common__form--content">
                <input
                  type="password"
                  name="password"
                  placeholder="パスワード"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="common__form--item common__form--item-accept">
              <div className="common__form--content">
                <input
                  type="checkbox"
                  id="accept"
                  name="accept"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  disabled={isLoading}
                />
                <label htmlFor="accept">ログイン情報を保存する</label>
              </div>
            </div>
            <div className="common__form--item">
              <button type="submit" className="common__form--button" disabled={isLoading}>
                {isLoading ? 'ログイン中...' : 'ログイン'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
