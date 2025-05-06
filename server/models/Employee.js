import mongoose from "mongoose";
import { Schema } from "mongoose";

const employeeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String
    },
    maritalStatus: {
        type: String,
        required: true,
        default: "single",
    },
    designation: {
        type: String
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },
    salary: {
        type: Number,
        required: true
    },

},{timestamps: true});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;