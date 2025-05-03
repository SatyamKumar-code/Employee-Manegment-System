import React from 'react'
import { useAuth } from '../context/authContex'

const AdminDashbaord = () => {
  const { user } = useAuth()

  return (
    <div>
      AdminDashboard {user && user.name}
    </div>
  )
}

export default AdminDashbaord
