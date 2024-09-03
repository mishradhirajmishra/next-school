import * as yup from 'yup'
import { bankAcNoRegExp, ifscRegExp, panRegExp, phoneRegExp } from '../utils/regexlist';
import { ClassType, Section } from './classhelper';

export  const StudentvalidationSchema = yup.object({
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    mobile: yup.string()
        .matches(phoneRegExp, 'Please enter valid Phone number')
        .min(10, "Must be 10 digit no")
        .max(10, "Must be 10 digit no"),
    addhar_no: yup.string()
        .matches(phoneRegExp, 'Please enter valid Addhar number')
        .min(12, "Must be 12 digit no")
        .max(12, "Must be 12 digit no"),
    pen_no: yup.string()
    .matches(phoneRegExp, 'Please enter valid Phone number')
    .min(10, "Must be 10 digit no")
    .max(10, "Must be 10 digit no"),
    dob: yup.date()
        .max(new Date(), "Date of birth must be past date from today"),
    admission_date: yup.date().required("Join Date is required"),
    p_address:yup.object({
        pin_no: yup.string()
        .min(6, "Must be 6 digit no")
        .max(6, "Must be 6 digit no"),
    }),
    r_address:yup.object({
        pin_no: yup.string()
        .min(6, "Must be 6 digit no")
        .max(6, "Must be 6 digit no"),
    }),
    // family_detail: yup.array().of(
    //     yup.object({
    //         mobile: yup.string()
    //         .matches(phoneRegExp, 'Please enter valid Phone number')
    //         .min(10, "Must be 10 digit no")
    //         .max(10, "Must be 10 digit no"),
    //     })
    // )
})

 
export const Studentinitial= {
    _id: "",
    stu_id: "",
    sr_no: "",
    roll_no:"",
    admission_no: "",
    admission_date: "", 
    class: "",  
    section: "",     
    name: "",
    gender: "Male",
    dob: "",
    blood_group: "",
    mobile: "",
    email: "",
    password: "",
    status: "Active", 
    addhar_no: "",
    pen_no:"",
    addhar_image: "addhar.png",
    profile_image: "profile_image.png",  
    nationality: "",  
    religion: "",
    caste_based_group:"",
    mother_tongue:"",
    known_language:[],
    optional_fee:[],
    distance_from_school:"",
    tc_comment:"",
    tc_image:"t-certificate.png",
    r_address: {
        line_1: "",
        line_2: "",
        city: "",
        pin_no: "",
        state: "",
        country: "India"
     },
    r_p_same:true,
    p_address: {
        line_1: "",
        line_2: "",
        city: "",
        pin_no: "",
        state: "",
        country:"India"
    },
    guardian:{
        name: "",
        relation: "Father",
        mobile: "",
        anual_income: "",
        addhar: "addhar.png",
        education: "",
        occupation: "",    
     },
    family_detail: [{
        name: "",
        relation: "",
        mobile: "",
    }],
    edu_detail: [{
        organization_name: "",
        board: "",
        subjects:[],
        t_mark: "",
        o_mark: "",
        p_year: "",
        percentage: "",
        grade: "",
        certificate: "certificate.png",
    }],
    expend:false,
    fee_discount:0
}
 
export interface StudentType {
    _id:                  string;
    stu_id:               string;
    sr_no:                string;
    roll_no:              string;
    admission_no:         string;
    admission_date:       string;
    class:                string;
    class_name?:          string;
    section:              string;
    section_name?:         string;
    name:                 string;
    gender:               string;
    dob:                  string;
    blood_group:          string;
    mobile:               string;
    email:                string;
    password:             string;
    status:               string;
    addhar_no:             string;
    pen_no:                string;
    addhar_image:          string;
    profile_image:        string;
    nationality:          string;
    religion:             string;
    caste_based_group:    string;
    mother_tongue:        string;
    known_language:       Array<string>;
    optional_fee:    Array<string>;
    distance_from_school: string;
    tc_comment:           string;
    tc_image:             string;
    r_address:            Address;
    r_p_same:             boolean;
    p_address:            Address;
    guardian:             Guardian;
    family_detail:        FamilyDetail[];
    edu_detail:           EduDetail[];
    expend:               boolean;
    fee_discount:         number;
    fee_payment?:         Array<any>;
    fee_recipt?:         Array<any>;
    total_paid_amount?:  number;
    total_used_amount?:  number;
    total_balance_amount?:  number;
    fee_data?:         Array<any>;
}

export interface EduDetail {
    organization_name:    string;
    board:       string;
    subjects:    string[];
    t_mark:      string;
    o_mark:      string;
    p_year:      string;
    percentage:  string;
    grade:       string;
    certificate: string;
}

export interface Guardian {
    name:         string;
    relation:     string;
    mobile:       string;
    anual_income: string;
    addhar:        string;
    education:    string;
    occupation:   string;  
}

export interface FamilyDetail {
    name:         string;
    relation:     string;
    mobile:       string;
}


export interface Address {
    line_1:  string;
    line_2:  string;
    city:    string;
    pin_no:  string;
    state:   string;
    country: string;
}



export const studentheadData = [
    { title: 'EXP', field: 'expend', dataType: 'number', sortable: false, order: "" },
    { title: 'SN', field: 'sn', dataType: 'number', sortable: false, order: "", hide: false },
    { title: 'Name', field: 'name', dataType: 'string', sortable: true, order: "", hide: false },
    { title: 'Guardian', field: 'guardian', dataType: 'string', sortable: false, order: "", hide: false },
    { title: 'Father', field: 'father', dataType: 'string', sortable: false, order: "", hide: false },
    { title: 'status', field: 'status', dataType: 'string', sortable: true, order: "", hide: false }, 
    { title: 'Action', field: '', dataType: '', sortable: false, order: "", hide: false },
];

export const studentFeeheadData = [
    { title: 'EXP', field: 'expend', dataType: 'number', sortable: false, order: "" },
    { title: 'SN', field: 'sn', dataType: 'number', sortable: false, order: "", hide: false },
    { title: 'Name', field: 'name', dataType: 'string', sortable: false, order: "", hide: false },
    { title: 'Guardian', field: 'guardian', dataType: 'string', sortable: false, order: "", hide: false },
    { title: 'Father', field: 'father', dataType: 'string', sortable: false, order: "", hide: false },
    { title: 'status', field: 'status', dataType: 'string', sortable: false, order: "", hide: false },
    { title: 'Balance Amount', field: '', dataType: 'string', sortable: false, order: "", hide: false },
    // { title: 'Action', field: '', dataType: '', sortable: false, order: "", hide: false },
];
export const StudentAttendanceinitial= {
     _id: "",
    class: "",
    expend:false,   
    section: "",
    student_id: {
        _id:"",
        roll_no:"",
        name:"",
        email:"",
        profile_image:"",
    },
    date: "",
    attendance: "",
    punctuality: "",
    cleanliness: "",
    attentiveness: "",
    handwriting: "",
    interactive: "",
    homework: "",
    classwork: "",
    duration: "",
    remark: "",
    running_year: "",
 }

 export interface StudentShortType  { 
    _id:string;
    roll_no:string;
    name:string;
    email:string;
    profile_image:string;
 }
    export interface StudentAttendanceType  {
    _id: string;
    class: any;
    expend:boolean;
    section: any;
    student_id: StudentShortType;
    date:string;
    attendance: string;
    punctuality: string;
    cleanliness: string;
    attentiveness: string;
    handwriting: string;
    interactive: string;
    homework: string;
    classwork: string;
    duration:  string;
    remark: string;
    running_year: string; 
}



export const studentAttendanceHeadData = [
    { title: 'EXP', field: 'expend', dataType: 'number', sortable: false, order: "" },
    { title: 'SN', field: 'sn', dataType: 'number', sortable: false, order: "", hide: false },
    { title: 'Roll No', field: 'roll_no', dataType: 'string', sortable: true, order: "", hide: false },
    { title: 'Name', field: 'name', dataType: 'string', sortable: true, order: "", hide: false },
    // { title: 'Class', field: 'class', dataType: 'string', sortable: true, order: "", hide: false },
    // { title: 'Section', field: 'section', dataType: 'string', sortable: true, order: "", hide: false },
    { title: 'Attendance', field: 'attendance', dataType: 'string', sortable: true, order: "", hide: false },
    // { title: 'Punctuality', field: 'punctuality', dataType: 'string', sortable: true, order: "", hide: false },
    // { title: 'Cleanliness', field: 'cleanliness', dataType: 'string', sortable: true, order: "", hide: false },
    // { title: 'Attentiveness', field: 'attentiveness', dataType: 'string', sortable: true, order: "", hide: false },
    // { title: 'Handwriting', field: 'handwriting', dataType: 'string', sortable: true, order: "", hide: false },
    // { title: 'Interactive', field: 'interactive', dataType: 'string', sortable: true, order: "", hide: false },
    // { title: 'Homework', field: 'homework', dataType: 'string', sortable: true, order: "", hide: false },
    // { title: 'Classwork', field: 'classwork', dataType: 'string', sortable: true, order: "", hide: false },
    // { title: 'Date', field: 'date', dataType: 'string', sortable: true, order: "", hide: false  },
    { title: 'Duration', field: 'duration', dataType: 'string', sortable: true, order: "", hide: false },
    // { title: 'Remark', field: 'remark', dataType: 'string', sortable: true, order: "", hide: false }, 
    { title: 'Action', field: '', dataType: '', sortable: false, order: "", hide: false },
];