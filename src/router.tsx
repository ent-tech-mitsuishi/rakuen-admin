import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginLayout } from './layouts/LoginLayout'
import { MainLayout } from './layouts/MainLayout'
import { Dashboard, Home, homeLoader, Login, NotFound } from './pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    loader: homeLoader,
  },
  {
    path: '/admin/login',
    element: <LoginLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
