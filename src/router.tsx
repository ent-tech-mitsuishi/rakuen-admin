import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { Dashboard, dashboardLoader, Influencers, NotFound } from './pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
      },
      {
        path: 'influencers',
        element: <Influencers />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
