export interface LoginFormProps {
  username: string
  password: string
  remember: boolean
  error?: string
  isLoading?: boolean
  onUsernameChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onRememberChange: (value: boolean) => void
  onSubmit: (e: React.FormEvent) => void
}

export function LoginForm({
  username,
  password,
  remember,
  error,
  isLoading = false,
  onUsernameChange,
  onPasswordChange,
  onRememberChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <div className="common__login">
      <div className="common__title">
        <h2 className="common__h2">管理者ログイン</h2>
      </div>
      <div className="common__body">
        <div className="common__form">
          <form onSubmit={onSubmit}>
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
                  onChange={(e) => onUsernameChange(e.target.value)}
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
                  onChange={(e) => onPasswordChange(e.target.value)}
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
                  onChange={(e) => onRememberChange(e.target.checked)}
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
