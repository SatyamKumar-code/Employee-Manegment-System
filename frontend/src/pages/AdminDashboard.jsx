import React from 'react'
import { useAuth } from '../context/authContex'
import AdminSidebar from '../components/dasboard/AdminSidebar'
import Navbar from '../components/dasboard/Navbar'
import AdminSummary from '../components/dasboard/AdminSummary'
import { Outlet } from 'react-router-dom'

const AdminDashbaord = () => {
  const { user } = useAuth()

  return (
    <div className='flex'>
      <div className='md:z-0  -z-1'>
        <AdminSidebar />
      </div>
      <div className='flex-1 md:pl-64 bg-gray-100 h-screen '>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashbaord
