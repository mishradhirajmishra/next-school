
import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var attendanceSchema = new Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: "employee"},
    date: { type: Date },
    attendance: { type: String, default: "Present" }, 
    leave_type: { type: String, default: "" }, 
    duration: { type: String, default: "Full-Day"},
    remark: { type: String, default: "" },   
    running_year: { type: String, default: "" }
}, { timestamps: true });
export const EmpAttendance = mongoose.models.empattendance || mongoose.model('empattendance', attendanceSchema);



