import Salary from "../models/Salary.js";

const addSalary = async (req, res) => {
    try {
        const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;

        // Validate required fields
        if (!employeeId || !basicSalary || !payDate) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            natSalary: totalSalary,
            payDate
        })

        await newSalary.save();

        return res.status(200).json({success: true})

    }catch (error) {
        console.error("Error addSalary in salaryController file: ", error.message);
        return res.status(500).json({success: false, error: "salary add server error"})
    }
}

const getSalary = async (req, res) => {
    try {
        const { id } = req.params;
        const salary = await Salary.find({employeeId: id}).populate('employeeId', 'employeeId')
        return res.status(200).json({success: true, salary})
    }catch (error) {
        console.error("Error getSalary in salaryController file: ", error.message);
        return res.status(500).json({success: false, error: "salary get server error"})
    }
}

export {addSalary, getSalary}