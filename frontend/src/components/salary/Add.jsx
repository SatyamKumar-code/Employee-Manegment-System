import React, { useEffect, useState } from 'react'
import { fetchDepartments, getEmployees } from '../../utils/EmployeeHelper';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Loading } from '../../utils/Loading';

const Add = () => {

    const [salary, setSalray] = useState({
        employeeId: null,
        bsicSalary: 0,
        allowances: 0,
        deductions: 0,
        payDate: null
    });
    const [departments, setDepartments] = useState(null)
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments()
            setDepartments(departments)
        }
        getDepartments()
    }, [])

    const handleDepartment = async (e) => {
        const emps = await getEmployees(e.target.value)
        setEmployees(emps)
    }


    const handleChange = (e) => {
        const { name, value } = e.target
        setSalray((prevData) => ({ ...prevData, [name]: value }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()



        try {
            const response = await axios.post(`http://localhost:3001/api/salary/add`, salary, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }

            })
            if (response.data.success) {
                navigate('/admin-dashboard/employees')
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }

    return (
        <>{departments ? (
            <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
                <h2 className='text-2xl font-bold mb-6'>Add salary</h2>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        
                        {/* Department */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Department
                            </label>
                            <select
                                name="department"
                                onChange={handleDepartment}
                                className='mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                                required
                            >
                                <option value="">Select Department</option>
                                {departments.map((dep) => (
                                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                ))}
                            </select>
                        </div>

                        {/* employee */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Employee
                            </label>
                            <select
                                name="employeeId"
                                onChange={handleChange}
                                className='mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                                required
                            >
                                <option value="">Select Employee</option>
                                {employees.map((emp) => (
                                    <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                                ))}
                            </select>
                        </div>

                        {/* Basic Salary */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Basic Salary
                            </label>
                            <input
                                type="number"
                                name='basicSalary'
                                onChange={handleChange}
                                placeholder='Basic Salary'
                                className='mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                                required
                            />
                        </div>

                        {/* Allowances */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Allowances
                            </label>
                            <input
                                type="number"
                                name='allowances'
                                onChange={handleChange}
                                placeholder='Allowances'
                                className='mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                                required
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Deductions
                            </label>
                            <input
                                type="number"
                                name='deductions'
                                onChange={handleChange}
                                placeholder='Deductions'
                                className='mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                                required
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Pay Date
                            </label>
                            <input
                                type="date"
                                name='payDate'
                                onChange={handleChange}
                                placeholder='Pay Date'
                                className='mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                                required
                            />
                        </div>


                    </div>

                    <button
                        type='submit'
                        className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50'
                    >
                        Add Salary
                    </button>
                </form>
            </div>
        ) : <Loading />}</>
    )
}

export default Add;