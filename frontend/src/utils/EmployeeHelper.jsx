import axios from 'axios'

export const fetchDepartments = async () => {
    let departments
    try {
      const response = await axios.get('http://localhost:3001/api/department', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        departments = response.data.departments
      }
    } catch (error) {
      console.error("Error fetching departments in EmployeeHelper file:", error)
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    }
    return departments

  };