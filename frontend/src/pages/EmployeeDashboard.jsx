import React from 'react'
import Sidebar from '../components/EmployeeDashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/dasboard/Navbar';


const EmployeeDashboard = () => {
  return (
    <div className='flex'>
      <div className='md:z-0  -z-1'>
        <Sidebar />
      </div>
      <div className='flex-1 md:pl-64 bg-gray-100 h-screen '>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default EmployeeDashboard