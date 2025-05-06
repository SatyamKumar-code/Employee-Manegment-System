import React from 'react'
import { Link } from 'react-router-dom'

const List = () => {
  return (
    <div className='p-6'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Employee</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input
          type="text"
          className='px-4 py-0.5 bg-white border border-gray-300 '
          placeholder='Search By Dep Name'
        />
        <Link
          className='px-4 py-1 bg-teal-600 text-white rounded'
          to="/admin-dashboard/add-employee"
        >
          Add New Employee
        </Link>
      </div>
    </div>
  )
}

export default List