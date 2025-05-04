import Department from "../models/Department.js";

const addDepartment = async (req, res) => {
    try {
        const { dep_name, description } = req.body;
        const newDep = new Department({
            dep_name,
            description
        })
        await newDep.save();
        return res.status(200).json({success: true, message: "Department added successfully", department: newDep})

    }catch (error) {
        console.error("Error adding department:", error.message);
        return res.status(500).json({success: false, error: "add department server error"})
    }
}

export {addDepartment}