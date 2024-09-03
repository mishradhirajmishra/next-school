
import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var leaveSchema = new Schema({
    date: { type: String, default:new Date()},     
    title: { type: String,default:""},     
    description: { type: String,default:""},     
    type: { type: String,default:"leave" },       
    class: { type: String,default:"" },       
}, { timestamps: true });
export const Leave = mongoose.models.leave || mongoose.model('leave', leaveSchema);
 