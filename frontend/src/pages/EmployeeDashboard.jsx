import React from 'react'

const EmployeeDashboard = () => {
    const { user } = useAuth()
  return (
    <div>EmployeeDashboard {user.name}</div>
  )
}

export default EmployeeDashboard