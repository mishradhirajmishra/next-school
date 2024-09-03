import * as yup from 'yup'
import { bankAcNoRegExp, ifscRegExp, panRegExp, phoneRegExp } from '../utils/regexlist';
import { format } from 'date-fns';

export const EmployeevalidationSchema = yup.object({
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    mobile: yup.string()
        .matches(phoneRegExp, 'Please enter valid Phone number')
        .min(10, "Must be 10 digit no")
        .max(10, "Must be 10 digit no"),
    addhar_no: yup.string()
        .matches(phoneRegExp, 'Please enter valid Addhar number')
        .min(12, "Must be 12 digit no")
        .max(12, "Must be 12 digit no"),
    dob: yup.date()
        .max(new Date(), "Date of birth must be past date from today"),
    join_date: yup.date().required("Join Date is required"),
    bank_detail: yup.object({
        ac_number: yup.string()
            .matches(bankAcNoRegExp, 'Invalid AC No. Must be like "635802010014976" '),
        pan_no: yup.string()
            .matches(panRegExp, 'Invalid PAN NO. Must be like "ABCDE1234F" '),
        ifsc_code: yup.string()
            .matches(ifscRegExp, 'Invalid IFSC code. Must be like "SBIN0000123" '),
    }),
    p_address: yup.object({
        pin_no: yup.string()
            .min(6, "Must be 6 digit no")
            .max(6, "Must be 6 digit no"),
    }),
    r_address: yup.object({
        pin_no: yup.string()
            .min(6, "Must be 6 digit no")
            .max(6, "Must be 6 digit no"),
    }),
    family_detail: yup.array().of(
        yup.object({
       
            // mobile: yup.string()
            //     .matches(phoneRegExp, 'Please enter valid Phone number')
            //     .min(10, "Must be 10 digit no")
            //     .max(10, "Must be 10 digit no"),
        })
    ),
    exp_detail: yup.array().of(
        yup.object({
            from_date: yup.date()
                .max(new Date(), "Start Date must be past date from today"),
            // to_date: yup.date().default(null)
            //     .when("from_date",
            //         (from_date, yup) => from_date && yup.min(from_date, "From Date cannot be before Start Date"))
        })
    )
})

export interface AllEmployeeProps {
    newData: EmployeType,
    reciveDataTobeEdited: (option: EmployeType) => void
  }
  

export const Employeainitial = {
    _id: "",
    emp_id: "",
    reg_no: "",
    name: "",
    gender: "Male",
    dob: "",
    blood_group: "NA",
    mobile: "",
    email: "",
    password: "",
    status: "Active",
    addhar_no: "",
    addhar_image: "",
    profile_image: "profile_image.png",
    join_date: "",
    left_date: "",
    salary_pm:"",
    r_address: {
        line_1: "",
        line_2: "",
        city: "",
        pin_no: "",
        state: "",
        country: "India"
    },
    r_p_same: true,
    p_address: {
        line_1: "",
        line_2: "",
        city: "",
        pin_no: "",
        state: "",
        country: "India"
    },
    bank_detail: {
        ac_number: "",
        ac_name: "",
        ifsc_code: "",
        ac_type: "Saving",
        bank_name: "",
        pan_no: ""
    },
    family_detail: [{
        name: "",
        relation: "Father",
        mobile: "",
    }],
    related_to: ["Director Office", "Principal Office"],
    role: "Teacher",
    remarks_text: "",
    intresrted_subject: ["hindi"],
    emp_type: "Permanent",
    edu_detail: [{
        organization_name: "",
        board: "",
        subjects: [],
        t_mark: "",
        o_mark: "",
        p_year: "",
        percentage: "",
        grade: "",
        certificate: "certificate.png",
    }],
    exp_detail: [{
        degination: "",
        company: "",
        from_date: format(new Date(), "yyyy-MM-dd"),
        to_date: "",
        role: "",
        responsibilites: "",
        certificate: "certificate.png",
    }],
   el: [{
        no_days: "0",
        remark: "",
    }],
    expend:false
}

export interface EmployeType {
    _id: string;
    emp_id: string;
    reg_no: string;
    name: string;
    gender: string;
    dob: string;
    blood_group: string;
    mobile: string;
    email: string;
    password: string;
    status: string;
    addhar_no: string;
    addhar_image: string;
    profile_image: string;
    join_date: string;
    left_date: string;
    salary_pm:string;
    r_address: Address;
    r_p_same: boolean;
    p_address: Address;
    bank_detail: BankDetail;
    family_detail: FamilyDetail[];
    related_to: string[];
    role: string;
    remarks_text: string;
    intresrted_subject: string[];
    emp_type: string;
    edu_detail: EduDetail[];
    exp_detail: ExpDetail[];
    el:El[];
    expend:boolean;
}
export interface El {
    no_days: string;
    remark: string,
}
export interface BankDetail {
    ac_number: string;
    ac_name: string;
    ifsc_code: string;
    ac_type: string;
    bank_name: string;
    pan_no: string;
}

export interface EduDetail {
    organization_name: string;
    board: string;
    subjects: any[];
    t_mark: string;
    o_mark: string;
    p_year: string;
    percentage: string;
    grade: string;
    certificate: string;
}

export interface ExpDetail {
    degination: string;
    company: string;
    from_date: string;
    to_date: string;
    role: string;
    responsibilites: string;
    certificate: string;
}

export interface FamilyDetail {
    name: string;
    relation: string;
    mobile: string;
}

export interface Address {
    line_1: string;
    line_2: string;
    city: string;
    pin_no: string;
    state: string;
    country: string;
}

export const employetheadData = [
    { title: 'EXP', field: 'expend', dataType: 'number', sortable: false, order: "" },
    { title: 'SN', field: 'sn', dataType: 'number', sortable: false, order: "" },
    // { title: 'Employee Id', field: 'emp_id', dataType: 'string', sortable: true, order: "dsc" },
    // { title: 'Registration No', field: 'reg_no', dataType: 'string', sortable: true, order: "" },
    { title: 'Name', field: 'name', dataType: 'string', sortable: true, order: "" },
    // { title: 'Email', field: 'email', dataType: 'string', sortable: true, order: "" },
    // { title: 'Mobile', field: 'mobile', dataType: 'number', sortable: true, order: "" },
    // { title: 'Joining Date', field: 'join_date', dataType: 'date', sortable: true, order: "" },
    // { title: 'gender', field: 'gender', dataType: 'string', sortable: true, order: "" },
    { title: 'role', field: 'role', dataType: 'string', sortable: true, order: "" },
    { title: 'Employee Type', field: 'emp_type', dataType: 'string', sortable: true, order: "" },
    
    { title: 'status', field: 'status', dataType: 'string', sortable: true, order: "", hide: false },
    // { title: 'Employee Type', field: 'emp_id', dataType: 'string', sortable: true, order: "" },
    { title: 'Action', field: '', dataType: '', sortable: false, order: "" },

];

export const EmployeeAttendanceinitial= {
    _id: "",
   expend:false,   
   employee_id: {
       _id:"",
       name:"",  
       profile_image:"",
   },
   attendance: "",
   leave_type:"",
   duration: "",
   remark: "",
   running_year: ""
}


export interface EmployeeShortType  { 
    _id:string; 
    name:string; 
    profile_image:string;
 }

export interface EmployeeAttendanceType  {
    _id: string; 
    expend:boolean; 
    employee_id:EmployeeShortType;
    attendance: string;   
    duration:  string;
    remark: string;
    leave_type:string,
    running_year: string; 
}

export interface EmployeeSalaryType  {
    _id: string; 
    employee_id: string,
    month: string,
    schooldays: string,
    presentdays: string,
    leavedays: string,
    c_leave: string,
    e_leave: string,
    p_leave: string,
    status:string,
    amount: string,
    mode: string,
    transaction_id: string,   
    transaction_date: string,
    running_year:string
}
export const EmployeeSalaryinitial= {
    _id: "",
    employee_id: "",
    month: "",
    schooldays: "",
    presentdays: "",
    leavedays:"",
    c_leave:"",
    e_leave:"",
    p_leave: "",
    status:"Generated",
    amount: "",
    mode: "",
    transaction_id: "", 
    transaction_date:"",
    running_year:""
}



export const employeeAttendanceHeadData = [
    { title: 'SN', field: 'sn', dataType: 'number', sortable: false, order: "", hide: false },
    { title: 'Name', field: 'name', dataType: 'string', sortable: true, order: "", hide: false },
    { title: 'Attendance', field: 'attendance', dataType: 'string', sortable: true, order: "", hide: false },  
    // { title: 'Date', field: 'date', dataType: 'string', sortable: true, order: "", hide: false  },
    { title: 'Duration', field: 'duration', dataType: 'string', sortable: true, order: "", hide: false },
    { title: 'Laeve Type', field: 'leave_type', dataType: 'string', sortable: false, order: "", hide: false },
    { title: 'Remark', field: 'remark', dataType: 'string', sortable: true, order: "", hide: false }, 
    { title: 'Action', field: '', dataType: '', sortable: false, order: "", hide: false },
];