
import mongoose from 'mongoose';

var Schema = mongoose.Schema; 

var classWorkSchema = new Schema({
    class_id: { type: String,default:""}, 
    section_id: { type: String,default:""}, 
    teacher: { type: String,default:""}, 
    subject: { type: String,default:""}, 
    period_id: { type: String,default:""}, 
    date: { type: String, default: "" },
    title: { type: String,default:""}, 
    description: { type: String,default:""}, 
    attachment: { type: String,default:""}, 
    status:{type:String,default:"draft"}, 
    expend:{type:Boolean,default:false},
    running_year: { type: String, default: "" }       
}, { timestamps: true });

export const ClassWork = mongoose.models.classwork || mongoose.model('classwork', classWorkSchema);
export const HomeWork = mongoose.models.homework || mongoose.model('homework', classWorkSchema);