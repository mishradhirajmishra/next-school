
import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var studentfeepaymentSchema = new Schema({
    stu_id: { type: String , default: ""},
    class: { type: String , default: ""},
    section: { type: String , default: ""},
    payment_mode:{ type: String,default:""},
    cheque_dd_no:{ type: String,default:""},
    cheque_dd_date:{ type: String,default:""},
    transaction_id:{ type: String,default:""},
    amount:{ type: Number,default:""},    
    running_year:{ type: String , default: ""}
 }, { timestamps: true });
export const StudentFeePayment = mongoose.models.studentfeepayment || mongoose.model('studentfeepayment', studentfeepaymentSchema);
 


