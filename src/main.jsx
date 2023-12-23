import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Notfound from './pages/Notfound'
import DashHome from './pages/dashboard/home'
import Rooms from './pages/dashboard/room/Rooms'
import Checkout from './pages/dashboard/room/Checkout'
import Checkin from './pages/dashboard/room/Checkin'
import Reserve from './pages/dashboard/room/Reserve'
import ReserveRoom from './pages/dashboard/room/reserve/Menu'
import Check_IN from './pages/dashboard/room/Checkin/Checkin'
import NewRooms from './pages/dashboard/room/NewRoom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "*",
    element: <Notfound />
  },
  {
    path: "/dashboard/home",
    element: <DashHome />
  },
  {
    path: "/dashboard/room",
    element: <Rooms />
  },
  {
    path: '/dashboard/room/checkout',
    element: <Checkout />
  },
  {
    path: '/dashboard/room/checkin',
    element: <Checkin />
  },
  {
    path: '/dashboard/room/reserve',
    element: <Reserve />
  },
  {
    path: '/dashboard/reserve',
    element: <ReserveRoom />
  },
  {
    path: "/dashboard/checkin",
    element: <Check_IN />
  },
  {
    path: "/dashboard/room/new",
    element: <NewRooms/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
