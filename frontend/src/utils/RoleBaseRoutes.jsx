import React from 'react'
import { useAuth } from '../context/authContex'
import { Navigate } from 'react-router-dom';
import { Loading } from './Loading';

const RoleBaseRoutes = ({ children, requiredRole }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
          <Loading />
        )
    }
    if (!requiredRole) {
        <Navigate to="/unauthorized" />
    }
    
    return user ? children : <Navigate to="/login" />
}

export default RoleBaseRoutes