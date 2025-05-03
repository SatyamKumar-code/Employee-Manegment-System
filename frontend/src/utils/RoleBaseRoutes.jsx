import React from 'react'
import { useAuth } from '../context/authContex'
import { Navigate } from 'react-router-dom';

const RoleBaseRoutes = ({children, requiredRole}) => {
    const { user, loading } = useAuth();

    if(loading) {
        return <div>Loading...</div>
    }
    if(!requiredRole) {
        <Navigate to="/unauthorized" />
    }

    return user ? children : <Navigate to="/login" />
}

export default RoleBaseRoutes