import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TrainingCalendar from './components/TrainingCalendar.jsx'
import TrainingGrid from './components/TrainingGrid.jsx'
import CustomerGrid from './components/CustomerGrid.jsx'
import Home from './components/Home.jsx'
import Charts from './components/Charts.jsx'

const router = createBrowserRouter([
  { path: "/",
  element: <App/>,
  children: [
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/customers",
    element: <CustomerGrid/>
  },
  {
    path: "/trainings",
    element: <TrainingGrid/>
  },
  {
    path: "/calendar",
    element: <TrainingCalendar/>
  },
  {
    path: "/charts",
    element: <Charts/>
  }
  ]
}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
