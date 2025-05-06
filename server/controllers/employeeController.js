import multer from 'multer'
import Employee from '../models/Employee.js'
import User from '../models/User.js'
import bcrypt from 'bcrypt'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extaname(file.originalname))
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
    } catch (error) {
        console.log(error.message);
        
        console.error("Error creating employee in employeeController file:", error.message);
        return res.status(500).json({ success: false, error: "Server error in adding employee" });
    }
}

export { addEmployee, upload }