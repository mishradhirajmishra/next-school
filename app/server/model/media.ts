
import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var mediaSchema = new Schema({
    related_student_id: { type: String },   
    related_employee_id: { type: String },   
    type: { type: String },   
    height: { type: String },   
    width: { type: String },   
    file_name: { type: String },     
    file_size: { type: String },     
    description : { type: String },       
}, { timestamps: true });
export const Media = mongoose.models.media || mongoose.model('media', mediaSchema);
 

 
 