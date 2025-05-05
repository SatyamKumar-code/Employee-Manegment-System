import { useNavigate } from "react-router-dom"
import axios from "axios"

export const columns = [
    {
        name: "S.No",
        selector: (row) => row.sno,
        sortable: true
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: "Actions",
        selector: (row) => row.action
    }
]

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
    const navigate = useNavigate()

    const handleDelete = async (id) => {
        const confirm = window.confirm("Do you want to delete?")
        if (confirm) {
            try {

                const response = await axios.delete(`http://localhost:3001/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    onDepartmentDelete(id)
                    window.location.reload();
                }
                
                
            } catch (error) {
                console.error("Error handeDelete in DeparmentHelper file:", error)
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        };
    };


    return (
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 text-white rounded-sm cursor-pointer hover:bg-teal-700"
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >Edit</button>
            <button className="px-3 py-1 bg-red-600 text-white rounded-sm cursor-pointer hover:bg-red-700"
                onClick={() => handleDelete(_id)}
            >Delete</button>
        </div>
    )
}