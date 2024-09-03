
import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var timeListSchema = new Schema({
    name: { type: String, default: "" },
    value: { type: String, default: "" },
    hide: { type: Boolean, default: false },
    status: { type: Boolean, default: false },   
}, { timestamps: true });

export const TimeOption = mongoose.models.timeoption || mongoose.model('timeoption', timeListSchema);
