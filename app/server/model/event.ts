
import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    date: { type: String, default:new Date() },     
    title: { type: String,default:""},     
    description: { type: String,default:""},     
    type: { type: String,default:"other" },       
}, { timestamps: true });
export const Event = mongoose.models.event || mongoose.model('event', eventSchema);
 