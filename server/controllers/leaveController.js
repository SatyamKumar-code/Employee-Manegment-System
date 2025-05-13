import Leave from "../models/Leave.js";
import Employee from '../models/Employee.js'


const addLeave = async (req, res) => {
    try {
        const { userId, leaveType, startDate, endDate, reason } = req.body;

        // Validate required fields
        if (!userId || !leaveType || !startDate || !endDate || !reason) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const employee = await Employee.findOne({userId})

        const newLeave = new Leave({
            employeeId: employee._id,
            leaveType,
            startDate,
            endDate,
            reason
        })

        await newLeave.save();

        return res.status(200).json({ success: true })

    } catch (error) {
        console.error("Error addLeave in LeaveController file: ", error.message);
        return res.status(500).json({ success: false, error: "leave add server error" })
    }
}

export { addLeave };