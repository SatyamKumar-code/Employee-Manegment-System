import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContex'
import { Loading } from './Loading'

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <Loading />
    )
  }

  return user ? children : <Navigate to="/login" />
}

export default PrivateRoutes