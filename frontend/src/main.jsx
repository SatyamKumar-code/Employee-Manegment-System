import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import AuthContex from './context/authContex'

createRoot(document.getElementById('root')).render(
  <AuthContex>
    <App />
  </AuthContex>
)
