
import mongoose from 'mongoose';
var Schema = mongoose.Schema;
export const baseroom = {
    name: { type: String, default:"" },     
    type: { type: String, default:"Class Room" },  
    seat_capcity: { type: Number }
}

var roomSchema = new Schema(baseroom, { timestamps: true });

export const Room = mongoose.models.room || mongoose.model('room', roomSchema);
 