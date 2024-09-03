
import mongoose from 'mongoose';
import { Question } from './lession-plan';
var Schema = mongoose.Schema;
export const baseExam = {
    title: { type: String, default: "" },
    expend: { type: Boolean, default: false },
    status: { type: String, default: "Started" },
    include_in_marksheet: { type: String, default: "No" },
    exam_seating:[{
        room_id:{ type: mongoose.Schema.Types.ObjectId, ref: "room" },
        seating:[{
            class_id:{ type: String, default: "" },
            section_id: { type: String, default: "" },
            roll_no_from:{ type: String, default: "" },
            roll_no_to:{ type: String, default: "" },
        }]
    }],
    include: [{
        class: { type: mongoose.Schema.Types.ObjectId, ref: "class" },
        section: { type: String, default: "" },
        status: { type: String, default: "Active" },
        expend: { type: Boolean, default: false },
        timeTable: [{
            subject: { type: String, default: "" },
            subject_id: { type: String, default: "" },
            optional: { type: String, default: "" },
            date: { type: String, default: "" },
            start_time: { type: String, default: "" },
            end_time: { type: String, default: "" },
            max_mark: { type: String, default: "100" },  
            min_mark: { type: String, default: "40" },
            syllabus: { type: String, default: "" },
            question_paper:[{
                // question_id: { type: String, default: ""},
                marks: { type: String, default: "100" }, 
            }]  
        }],
    }],
    running_year: { type: String, default: "" }
}

export const examMarks = {
    class: { type: String, default: "" },
    section: { type: String, default: "" },
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: "student" },
    marks: [
        {
          subject: { type: String, default: "" },
          max_mark: { type: String, default: "100" },
          min_mark: { type: String, default: "40" },
          mark: { type: String, default: "" },
        }
    ],
    running_year: { type: String, default: "" }
}
  const examInstruction = {
    title: { type: String, default: "" },
    instructions: [
        { title: { type: String, default: "" }, }
    ]   
}
var examSchema = new Schema(baseExam, { timestamps: true });
export const Exam = mongoose.models.exam || mongoose.model('exam', examSchema);

var eexamInstructionSchema = new Schema(examInstruction, { timestamps: true });
export const Examinstruction = mongoose.models.examinstruction || mongoose.model('examinstruction', eexamInstructionSchema);

