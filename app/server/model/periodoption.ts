import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var employeeSchema =  new Schema({
    name: { type: String, default: "" },
    value: { type: String, default: "" },
    hide: { type: Boolean, default: false },
    status: { type: Boolean, default: false },   
}, { timestamps: true });
export const Periodoption = mongoose.models.periodoption || mongoose.model('periodoption', employeeSchema);