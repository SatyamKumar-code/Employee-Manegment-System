import React, { useState } from 'react'
import axios from 'axios'
import '../index.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContex'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(null)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', {
                email,
                password
            });
            if (response.data.success) {
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                if (response.data.user.role === "admin") {
                    navigate('/admin-dashboard')
                } else {
                    navigate('/employee-dashboard')
                }
            }

        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error)
            } else {
                setError("server error")
            }
        }
    }
    return (
        <div className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6'>
            <h2 className='EMS text-3xl text-white'>Employee Manegment System</h2>
            <div className='border shadow p-6 w-80 bg-white'>
                <h2 className='text-2xl font-bold mb-4'>Login</h2>
                {error && <div className='text-red-500'>{error}</div>}
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor='email' className='block text-gray-700'>Email</label>
                        <input className='w-full px-3 py-2 border' type='email' placeholder='Enter your email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700' htmlFor="password">password</label>
                        <div className='relative'>
                            <input
                                className='w-full px-3 py-2 border'
                                type={showPassword ? "text" : "password"}
                                placeholder='******'
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className='absolute right-2 top-2 text-gray-600 cursor-pointer'
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    <div className='mb-4 flex items-center justify-between'>
                        <label className='inline-flex items-center'>
                            <input className='form-checkbox' type="checkbox" />
                            <span className='ml-2 text-gray-700'>Remember</span>
                        </label>
                        <a className='text-teal-600' href="#">
                            Forget password?
                        </a>
                    </div>
                    <div className='mb-4'>
                        <button className='w-full bg-teal-600 text-white py-2 cursor-pointer' type='submit'>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
