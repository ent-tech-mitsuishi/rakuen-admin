import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>404</h1>
      <p>ページが見つかりませんでした。</p>
      <Link to="/">ダッシュボードに戻る</Link>
    </div>
  )
}
