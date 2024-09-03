
import mongoose from 'mongoose';
import { boolean } from 'yup';
var Schema = mongoose.Schema;

var settingSchema = new Schema({
    school_name: { type: String },     
    address: {
        line_1: { type: String, default: "" },
        line_2: { type: String, default: "" },
        city: { type: String, default: "" },
        pin_no: { type: String, default: "" },
        state: { type: String, default: "" },
        country: { type: String, default: "India" }
    },    
    running_year: { type: String },     
    running_year_history:[{ type: String }],     
    logo: { type: String },     
    start_month: { type: String },    
    result:[{
        percentage_from: { type: String, default: "" },
        percentage_to: { type: String, default: "" },
        division: { type: String, default: "" },
        grade: { type: String, default: "" },
        remarks: { type: String, default: "" }, 
    }],  
    pass_rule:{ type: String, default: "" },
    salary_leave_rule:{ type: String, default: "" },
    cl_male:{ type: String, default: "12" },
    cl_female:{ type: String, default: "15" },
    max_cl_per_month:{ type: String, default: "2" },

}, { timestamps: true });
export const Setting = mongoose.models.setting || mongoose.model('setting', settingSchema);
