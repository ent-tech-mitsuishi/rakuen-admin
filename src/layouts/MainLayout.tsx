import { NavLink, Outlet } from 'react-router-dom'

const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
  display: 'block',
  padding: '0.75rem 1rem',
  color: isActive ? '#3b82f6' : '#374151',
  backgroundColor: isActive ? '#eff6ff' : 'transparent',
  textDecoration: 'none',
  borderRadius: '0.375rem',
})

export function MainLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside
        style={{
          width: '240px',
          backgroundColor: '#f9fafb',
          borderRight: '1px solid #e5e7eb',
          padding: '1rem',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
          ラクエン
        </h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <NavLink to="/admin" end style={navLinkStyle}>
            ダッシュボード
          </NavLink>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  )
}
