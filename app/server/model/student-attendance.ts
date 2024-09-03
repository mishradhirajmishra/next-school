
import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var attendanceSchema = new Schema({
    expend: { type: Boolean, default: false },
    class: { type: String, default: "" },
    section: { type: String, default: "" },
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: "student"},
    date: { type: Date },
    attendance: { type: String, default: "Present" },
    punctuality: { type: String, default: "Yes" },
    cleanliness: { type: String, default: "Yes" },
    attentiveness: { type: String, default: "Yes" },
    handwriting: { type: String, default: "Good" },
    interactive: { type: String, default: "Good" },
    homework: { type: String, default: "Yes" },
    classwork: { type: String, default: "Yes" },
    duration: { type: String, default: "Full-Day"},
    remark: { type: String, default: "" },   
    running_year: { type: String, default: "" }
}, { timestamps: true });
// attendanceSchema.index({ student_id: 1, date: 1 }, { unique: true })
export const StuAttendance = mongoose.models.stuattendance || mongoose.model('stuattendance', attendanceSchema);



