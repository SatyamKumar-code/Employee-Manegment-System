import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashbaord from './pages/AdminDashboard'
import EmployeeDashboard from './pages/employeeDashboard'
import PrivateRoutes from './utils/PrivateRoutes'
import RoleBaseRoutes from './utils/RoleBaseRoutes'
import AdminSummary from './components/dasboard/AdminSummary'
import DepartmentList from './components/Department/DepartmentList'
import AddDepartment from './components/Department/AddDepartment'
import EditDepartment from './components/Department/EditDepartment'
import List from './components/employee/List'
import Add from './components/employee/Add'
import View from './components/employee/View'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/admin-dashboard' element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin"]}>
              <AdminDashbaord />
            </RoleBaseRoutes>
          </PrivateRoutes>
        }>
          <Route index element={<AdminSummary />} />

          <Route path="/admin-dashboard/departments" element={<DepartmentList />} />
          <Route path="/admin-dashboard/add-department" element={<AddDepartment />} />
          <Route path='/admin-dashboard/department/:id' element={<EditDepartment />} />

          <Route path="/admin-dashboard/employees" element={<List />} />
          <Route path="/admin-dashboard/add-employee" element={<Add />} />
          <Route path="/admin-dashboard/employees/:id" element={<View />} />

        </Route>
        <Route path='/employee-dashboard' element={<EmployeeDashboard />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
