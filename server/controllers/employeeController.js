import multer from 'multer'
import Employee from '../models/Employee.js'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import path from 'path'
import department from '../models/Department.js'


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
        } = req.body;

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ success: false, error: "user already rigistered in employee" });

        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            profileImage: req.file ? req.file.filename : "default.png"
        })
        const savedUser = await newUser.save()

        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
        })

        await newEmployee.save()
        return res.status(201).json({ success: true, message: "Employee Created Successfully"})

    } catch (error) {console.error("Error creating employee in employeeController file:", error.message);
        return res.status(500).json({ success: false, error: "Server error in adding employee" });
    }
}

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate("userId", {password: 0}).populate("department")
        return res.status(200).json({ success: true, employees })
    } catch (error) {
        console.error("Error fetching employees in employeeController file:", error.message);
        return res.status(500).json({ success: false, error: "Server error in fetching employees" });
    }
}

const getEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findById({_id: id}).populate("userId", {password: 0}).populate("department")
        return res.status(200).json({ success: true, employee })
    } catch (error) {
        console.error("Error fetching employees in employeeController file:", error.message);
        return res.status(500).json({ success: false, error: "Server error in fetching employees" });
    }
}

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            maritalStatus,
            designation,
            department,
            salary,
        } = req.body;

        const employee = await Employee.findById({_id: id})
        if (!employee) {
            console.error("Employee not found in employeeController file:", error.message);
            return res.status(404).json({ success: false, error: "Employee not found" });
        }
        const user = await User.findById({_id: employee.userId})
        if (!user) {
            console.error("User not found in employeeController file:", error.message);
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const updateUser = await User.findByIdAndUpdate({_id: employee.userId}, {name})
        const updateEmployee = await Employee.findByIdAndUpdate({_id: id}, {
            maritalStatus,
            designation,
            department,
            salary,
        }, { new: true })

        if (!updateEmployee || !updateUser) {
            console.error("Error updating employee and user in employeeController file:", error.message);
            return res.status(404).json({ success: false, error: "Document not found" });
        }

        return res.status(200).json({ success: true, message: "Employee updated successfully" });

    }catch (error) {
        console.error("Error updating employee in employeeController file:", error.message);
        return res.status(500).json({ success: false, error: "Server error in updating employee" });
    }
}

export { addEmployee, getEmployees, getEmployee, updateEmployee, upload }