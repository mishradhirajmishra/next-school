
import mongoose from 'mongoose';
var Schema = mongoose.Schema;
export const Question={  
  title:{ type: String, default: "" },
  body:[],
  type:{ type: String, default: "" },
  marks:{ type: String, default: "" },
}
var lessonPlanSchema = new Schema({
    class: { type: mongoose.Schema.Types.ObjectId, ref: "class"},
    section: { type: String, default: "" },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "subject"}, 
    expend: { type: Boolean, default: false },
    lesson:[{
             title:{ type: String, default: "" },
             s_date:{ type: String, default: "" },
             e_date:{ type: String, default: "" },    
             c_date:{ type: String, default: "" },
             status:{ type: String, default: "" },     
             syllabus:[{
                title:[{ type: String, default: "" }],
                s_date:{ type: String, default: "" },
                e_date:{ type: String, default: "" }, 
                c_date:{ type: String, default: "" },
                status:{ type: String, default: "" },     
              }],
          question:[Question] 
        }],
    running_year: { type: String, default: "" }
}, { timestamps: true });
export const Lessionplan = mongoose.models.lessonplan || mongoose.model('lessonplan', lessonPlanSchema);



