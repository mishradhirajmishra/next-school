
import mongoose from 'mongoose';
import { BaseFee } from './fee';
import { baseSubject } from './subject';
var Schema = mongoose.Schema;

const Days = {
    subject: { type: String, default: "" },
    teacher: { type: String, default: "" },
    selected: { type: Boolean, default: true }
}

const PeriodData = {
    name: { type: String, default: "" },
    start_time: { type: String, default: "" },
    end_time: { type: String, default: "" },
    monday: Days,
    tuesday: Days,
    wednesday: Days,
    thursday: Days,
    friday: Days,
    saturday: Days
}
var classSchema = new Schema({
    name: { type: String, default: "" },
    expend: { type: Boolean, default: false },
    section: [{
        name: { type: String, default: "" },
        room_no: { type: String, default: "" },
        class_teacher: { type: String, default: "" },
        expend: { type: Boolean, default: false },
        period: [PeriodData],        
        fee: [BaseFee],
        same_syllabus_as_section_id:{ type: String, default: "" },         
        subjectList: [baseSubject]        
    }],
}, { timestamps: true });

export const Class = mongoose.models.class || mongoose.model('class', classSchema);
var periodSchema = new Schema(PeriodData, { timestamps: true });
export const Period = mongoose.models.period || mongoose.model('period', periodSchema);
