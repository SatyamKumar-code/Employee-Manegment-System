import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashbaord from './pages/AdminDashboard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/admin-dashbord" />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/admin-dashbord' element={<AdminDashbaord />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
