import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper'
import axios from 'axios'
import { Loading } from '../../utils/Loading'

const DepartmentList = () => {

  const [departments, setDepartments] = useState([])
  const [depLoading, setDepLoading] = useState(false)
  const [filteredDepartments, setFilteredDepartments] = useState([])

  const onDepartmentDelete = (id) => {
    const data = departments.filter(dep => dep._id !== id)
    setDepartments(data)
  }

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true)
      try {
        const response = await axios.get('http://localhost:3001/api/department', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          let sno = 1
          const data = response.data.departments.map((dep) => (
            {
              _id: dep._id,
              sno: sno++,
              dep_name: dep.dep_name,
              action: (<DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />)
            }
          ));
          setDepartments(data)
          setFilteredDepartments(data)
        }
      } catch (error) {
        console.error("Error fetching departments in DepartmentList file:", error)
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      }

      finally {
        setDepLoading(false)
      }


    };
    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) => 
    dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredDepartments(records)
  }

  return (
    <>
      {depLoading ? <Loading /> : <div className='p-5'>
        <div className='text-center'>
          <h3 className='text-2xl font-bold'>Manage Department</h3>
        </div>
        <div className='flex justify-between items-center'>
          <input
            type="text"
            className='px-4 py-0.5 bg-white border border-gray-300 '
            placeholder='Search By Dep Name'
            onChange={filterDepartments}
            />
          <Link
            className='px-4 py-1 bg-teal-600 text-white rounded'
            to="/admin-dashboard/add-department"
          >
            Add New Department
          </Link>
        </div>
        <div className='mt-5'>
          <DataTable
            columns={columns}
            data={filteredDepartments}
            pagination
          />
        </div>
      </div>
      }</>
  )
}

export default DepartmentList