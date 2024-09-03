
import mongoose from 'mongoose';
var Schema = mongoose.Schema;

export const BookObj = {
    book_code : { type: String,default:""}, 
    book_copy_code : { type: String,default:""}, 
    title: { type: String,default:""}, 
    author : { type: String,default:""}, 
    description : { type: String,default:""}, 
    type : { type: String,default:""}, 
    price : { type: String,default:""}, 
    place : { type: String,default:""}, 
    status : { type: String,default:"Available"}, 
    class : { type: String,default:""},
    section : { type: String,default:""},
    expend: { type: Boolean, default: false },
}

export const BookIssueObj = {
    book_id : { type: mongoose.Schema.Types.ObjectId, ref: "book"},
    student_id : { type: String,default:""}, 
    class : { type: String,default:""},
    section : { type: String,default:""},
    employee_id : { type: String,default:""}, 
    date_from : { type: String,default:""}, 
    date_to : { type: String,default:""}, 
    return_date : { type: String,default:""},   
    comment : { type: String,default:""},   
    running_year : { type: String,default:""},   
} 

var bookSchema = new Schema( BookObj, { timestamps: true });
export const Book = mongoose.models.book || mongoose.model('book', bookSchema);
 
var bookIssueSchema = new Schema( BookIssueObj, { timestamps: true });
export const Bookissue = mongoose.models.bookissue || mongoose.model('bookissue', bookIssueSchema);