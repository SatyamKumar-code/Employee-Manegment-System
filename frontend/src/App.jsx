import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashbaord from './pages/AdminDashboard'
import EmployeeDashboard from './pages/employeeDashboard'
import PrivateRoutes from './utils/PrivateRoutes'
import RoleBaseRoutes from './utils/RoleBaseRoutes'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/admin-dashbord" />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/admin-dashbord' element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin"]}>
              <AdminDashbaord />
            </RoleBaseRoutes>
          </PrivateRoutes>
        }></Route>
        <Route path='/employee-dashbord' element={<EmployeeDashboard />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
