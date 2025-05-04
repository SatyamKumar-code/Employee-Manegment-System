import React from 'react'
import { Link } from 'react-router-dom'

const DepartmentList = () => {
  return (
    <div className='p-5'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Department</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input className='px-4 py-0.5 bg-white' type="text" placeholder='Search By Dep Name' />
        <Link className='px-4 py-1 bg-teal-600 text-white rounded' to="/admin-dashboard/add-department">Add New Department</Link>
      </div>
    </div>
  )
}

export default DepartmentList