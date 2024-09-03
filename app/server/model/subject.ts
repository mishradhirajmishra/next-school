
import mongoose from 'mongoose';
var Schema = mongoose.Schema;
export const baseSubject = {
    name: { type: String },     
    optional: { type: String,default:"No"},    
    slug: { type: String },     
    expend: { type: Boolean, default: false },
}

var subjectSchema = new Schema(baseSubject, { timestamps: true });

export const Subject = mongoose.models.subject || mongoose.model('subject', subjectSchema);
 