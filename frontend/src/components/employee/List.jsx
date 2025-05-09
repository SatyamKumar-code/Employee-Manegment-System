import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { EmployeeButtons, columns } from '../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'
import axios from 'axios'


const List = () => {

  const [employees, setEmployees] = useState([])
  const [empLoading, setEmpLoading] = useState(false)
  const [filteredEmployee, setFilteredEmployee] = useState([])

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true)
      try {
        const response = await axios.get('http://localhost:3001/api/employee', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          let sno = 1
          const data = response.data.employees.map((emp) => (
            {
              _id: emp._id,
              sno: sno++,
              dep_name: emp.department.dep_name,
              name: emp.userId.name,
              dob: new Date(emp.dob).toLocaleDateString(),
              profileImage: <img className='h-10.5 w-10.5 rounded-full ' src={`http://localhost:3001/${emp.userId.profileImage}`} alt="profile" />,
              action: (<EmployeeButtons _id={emp._id} />),
            }
          ));
          setEmployees(data) 
          setFilteredEmployee(data)
        }
      } catch (error) {
        console.error("Error fetching departments in DepartmentList file:", error)
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      }

      finally {
        setEmpLoading(false)
      }


    };
    fetchEmployees();
  }, []);

  const hendleFilter = (e) => {
    const records = employees.filter((emp) => (
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFilteredEmployee(records)
  }

  return (
    <div className='p-6'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Employee</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input
          type="text"
          className='px-4 py-0.5 bg-white border border-gray-300 '
          placeholder='Search By Name'
          onChange={hendleFilter}
        />
        <Link
          className='px-4 py-1 bg-teal-600 text-white rounded'
          to="/admin-dashboard/add-employee"
        >
          Add New Employee
        </Link>
      </div>
      <div className='mt-6'>
        <DataTable columns={columns} data={filteredEmployee} pagination />
      </div>
    </div>
  )
}

export default List