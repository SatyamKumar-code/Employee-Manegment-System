import mongoose from "mongoose";
import { Schema } from "mongoose";

const employeeSchema = new Schema({
    UserId: {
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
        type: String
    },
    designation: {
        type: String
    },
    Department: {
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