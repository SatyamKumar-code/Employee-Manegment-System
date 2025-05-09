import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Loading } from '../../utils/Loading'

const View = () => {
    const { id } = useParams()
    const [employee, setEmployee] = useState(null)

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    setEmployee(response.data.employee)
                }
            } catch (error) {
                console.error("Error fetching departments in DepartmentList file:", error)
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }


        };
        fetchEmployee();
    }, []);

    return (
        <>{employee ? (
        <div className='max-w-2xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-8 text-center'>Employee Details</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center items-center'>
                <div>
                    <img
                        src={`http://localhost:3001/${employee.userId.profileImage}`}
                        alt="profileImage"
                        className='rounded-full border bo w-72 h-72'
                    />
                </div>
                <div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Name:</p>
                        <p className='font-medium'>{employee.userId.name}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Employee ID:</p>
                        <p className='font-medium'>{employee.employeeId}</p>
                    </div>

                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Date of Birth:</p>
                        <p className='font-medium'>{new Date(employee.dob).toLocaleDateString()}</p>
                    </div>

                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Gender:</p>
                        <p className='font-medium'>{employee.gender}</p>   
                    </div>

                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Merital Status:</p>
                        <p className='font-medium'>{employee.maritalStatus}</p>
                    </div>
                </div>
            </div>
        </div>
        ): <div> <Loading /></div>}</>
    )
}

export default View