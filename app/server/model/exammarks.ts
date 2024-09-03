
import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var exammarkSchema = new Schema({
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "exam"},
    class: { type: mongoose.Schema.Types.ObjectId, ref: "class"},
    section: { type: String, default: "" },
    subject: { type: String, default: "" }, 
    student: { type: String, default: "" },
    marks: { type: String, default: "" },
    // expend: { type: Boolean, default: false },  
    running_year: { type: String, default: "" }
}, { timestamps: true });
export const Exammark = mongoose.models.exammark || mongoose.model('exammark', exammarkSchema);



