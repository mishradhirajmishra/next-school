
import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var studentfeereciptSchema = new Schema({
    stu_id: { type: String , default: ""},
    class: { type: String , default: ""},
    section: { type: String , default: ""},
    fee_id: [{
        title: { type: String,default:""},
        last_date_of_collection: { type: String,default:""},    
        amount: { type: String,default:""}, 
        late_fee_amount: { type: String,default:""},  
        student_discount: { type: String,default:""},  
    }],
    collecting_month: { type: String,default:""},
    amount:{ type: Number,default:""},  
    running_year: { type: String,default:""},   
 }, { timestamps: true });
export const StudentFeeRecipt = mongoose.models.studentfeerecipt || mongoose.model('studentfeerecipt', studentfeereciptSchema);
 


