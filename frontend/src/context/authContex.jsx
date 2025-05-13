import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'


const userContext = createContext(); 

const AuthContex = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem("token")
                if(token) {
                    const response = await axios.get('http://localhost:3001/api/auth/verify', {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })
                    
                    // if(response.data.user.role === "admin") {
                    //     setUser(response.data.user)
                    // }
                
                    if(response.data.success) {
                        setUser(response.data.user)
                    }

                } else {
                    setUser(null)
                    setLoading(false)
                }
                
            } catch (error) {
                console.error("Error verifying user:", error.response ? error.response.data : error.message);;
                if(error.response && !error.response.data.success) {
                    setUser(null)
                }
            } finally {
                setLoading(false)
            }
        }
        verifyUser();
    }, []);

    const login = async (user) => {
        setUser(user)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("token")
    }
  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
        {children}
    </userContext.Provider>
  )
}

const useAuth = () => useContext(userContext)

export { useAuth }
export default AuthContex;