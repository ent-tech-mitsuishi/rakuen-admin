import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { Dashboard, Home, homeLoader, NotFound } from './pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    loader: homeLoader,
  },
  {
    path: '/admin',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
