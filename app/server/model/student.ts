
import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var studentSchema = new Schema({
    stu_id: { type: String , default: ""},
    sr_no: { type: String, default: "" },
    roll_no: { type: Number, default: 0 },
    admission_no: { type: String, default: "" },
    admission_date: { type: String, default: "" }, 
    class: { type: String, default: "" },  
    section: { type: String, default: "" }, 
    name: { type: String, default: "" },
    gender: { type: String, default: "Male" },
    dob: { type: String, default: "" },
    blood_group: { type: String, default: "NA" },
    mobile: { type: Number },
    fee_discount: { type: Number, default:0},
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    status: { type: String, default: "Active" }, 
    addhar_no: { type: String, default: "" },
    pen_no: { type: String, default: "" },
    addhar_image: { type: String, default: "addhar.png" },
    profile_image: { type: String, default: "profile_image.png" },  
    nationality: { type: String, default: "Indian" },  
    religion: { type: String, default: "Hindu" },
    caste_based_group:{ type: String, default: "" },
    mother_tongue:{ type: String, default: "Hindi" },
    known_language:[{ type: String, default: "Hindi" }],
    optional_fee:[{ type: String}],
    distance_from_school:{ type: String, default: "" },
    tc_comment: { type: String, default: "" },
    tc_image: { type: String, default: "t-certificate.png" },    
    r_address: {
        line_1: { type: String, default: "" },
        line_2: { type: String, default: "" },
        city: { type: String, default: "" },
        pin_no: { type: String, default: "" },
        state: { type: String, default: "" },
        country: { type: String, default: "India" }
    },
    r_p_same:{ type: Boolean},
    p_address: {
        line_1: { type: String, default: "" },
        line_2: { type: String, default: "" },
        city: { type: String, default: "" },
        pin_no: { type: String, default: "" },
        state: { type: String, default: "" },
        country: { type: String, default: "India" }
    },
    family_detail: [{
        name: { type: String, default: "" },
        relation: { type: String, default: "" },
        mobile: { type: String, default: "" },
        anual_income: { type: String, default: "" },
    }],
    guardian: {
        name: { type: String, default: "" },
        relation: { type: String, default: "Hindu" },
        mobile: { type: String, default: "" },
        anual_income: { type: String, default: "" },
        addhar: { type: String, default: "addhar.png" },
        education: { type: String, default: "" },
        occupation: { type: String, default: "" },       
    },
    edu_detail: [{
        organization_name: { type: String, default: "" },
        board: { type: String, default: "" },
        subjects:[{ type: String, default: "" }],
        t_mark: { type: String, default: "" },
        o_mark: { type: String, default: "" },
        p_year: { type: String, default: "" },
        percentage: { type: String, default: "" },
        grade: { type: String, default: "" },
        certificate: { type: String, default: "certificate.png" },
    }],
    class_history:{
        class: { type: String },  
        section: { type: String,},    
        running_year: { type: String},        
       },
    expend: { type: Boolean, default: false },
}, { timestamps: true });


export const Student = mongoose.models.student || mongoose.model('student', studentSchema);
 


