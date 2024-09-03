import { format } from 'date-fns'
import * as yup from 'yup'
export const BookValidationSchema = yup.object({
    title: yup.string().required("Book Title is required"),
})
export const BookIssueStudentValidationSchema = yup.object({
    student_id: yup.string().required("Student is required"),
    class: yup.string().required("Class is required"),
    section: yup.string().required("Section is required"),
    date_from: yup.string().required("From Date is required"),
    date_to: yup.string().required("To Date is required"),
})
export const BookIssueEmloyeeValidationSchema = yup.object({
    employee_id: yup.string().required("Employee is required"),
    date_from: yup.string().required("From Date is required"),
    date_to: yup.string().required("To Date is required"),
})



export interface lessonsList { subject_id: string, lesson_id: string, lesson: string, syllabus: string }
export const lessonsListInit = { subject_id: "", lesson_id: "", lesson: "", syllabus: "" }


export const bookIssueInit = {
    _id: "",
    book_id : "",
    student_id : "", 
    employee_id : "", 
    date_from : format(new Date(), "yyyy-MM-dd"), 
    date_to : "", 
    return_date : "",
    class : "", 
    section : "",
    comment:"",
}



export const bookTypeInit = {
    _id: "",
    book_code : "",
    book_copy_code:"",
    title: "",
    author : "",
    description : "",
    price : "",
    place:"",
    status : "Available",
    type : "Academic",
    class : "",
    section : "",
    no_of_copies:"10"
}

export interface BookType {
    _id: string,
    sn?: string,
    book_code : string,
    book_copy_code:string,
    title: string,
    author : string,
    description : string,
    price : string,
    place:string,
    status : string,
    type : string,
    class : string,
    section : string,
    no_of_copies ?: string,
    expend?:boolean,
    issue?:BookIssueType[]
}
export interface BookIssueType {
    _id: string,
    sn?: string,
    book_id : string,
    student_id : string | any, 
    employee_id : string | any,  
    date_from : string, 
    date_to : string, 
    return_date : string,    
    class : string,    
    section : string,    
    comment: string
}
export const bookIssueHeadData = [
    { title: 'SN', field: 'sn', dataType: 'number', sortable: false, order: "" },
    { title: 'Student', field: 'student_id', dataType: 'string', sortable: false, order: "",  },
    { title: 'Employee', field: 'employee_id', dataType: 'string', sortable: false, order: "",  },
    { title: 'From date', field: 'date_from', dataType: 'string', sortable: false, order: "", },
    { title: 'To Date', field: 'date_to', dataType: 'string', sortable: false, order: "", },
    { title: 'Return Date', field: 'return_date', dataType: 'string', sortable: false, order: "", },
    { title: 'Action', field: '', dataType: 'string', sortable: false, order: "", },
    // { title: 'Class', field: 'class', dataType: 'string', sortable: false, order: "", },
    // { title: 'Section', field: 'section', dataType: 'string', sortable: false, order: "", },
];
export const bookHeadData = [
    { title: 'EXP', field: 'expend', dataType: 'number', sortable: false, order: "" },
    { title: 'SN', field: 'sn', dataType: 'number', sortable: false, order: "" },
    { title: 'Book Code', field: 'book_code', dataType: 'string', sortable: true, order: "",  },
    { title: 'Copy Code', field: 'book_copy_code', dataType: 'string', sortable: false, order: "",  },
    { title: 'Title', field: 'title', dataType: 'string', sortable: false, order: "", },
    // { title: 'author', field: 'author', dataType: 'string', sortable: false, order: "", },
    { title: 'Status', field: 'status', dataType: 'string', sortable: false, order: "", },
    { title: 'Type', field: 'type', dataType: 'string', sortable: false, order: "", },
    { title: 'Action', field: 'type', dataType: 'string', sortable: false, order: "", },
    // { title: 'class', field: 'class', dataType: 'string', sortable: false, order: "", },
    // { title: 'section', field: 'section', dataType: 'string', sortable: false, order: "", },
];
