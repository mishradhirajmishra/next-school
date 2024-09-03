
import mongoose from 'mongoose';
import { number } from 'yup';
var Schema = mongoose.Schema;

export const BaseFee = {
    title: { type: String,default:""}, 
    collecting_month: { type: String,default:""},  
    last_date_of_collection: { type: String,default:""},    
    amount: { type: String,default:""}, 
    discount_applicable: { type: String,default:"No"},  
    late_fee_applicable: { type: String,default:"No"},     
    late_fee_amount: { type: String,default:""},    
    late_fee_reoccur_days: { type: Number,default:30}, 
    status: { type: String, default: "Active" },
    optional: { type: String,default:"No"}, 
    expend: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
}
var feeSchema = new Schema( BaseFee, { timestamps: true });
export const Fee = mongoose.models.fee || mongoose.model('fee', feeSchema);
 