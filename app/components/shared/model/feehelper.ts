import * as yup from 'yup'
import { StudentType } from './studenthelper';
import { SubjectType, Subjectinit } from './subjecthelper';
export const FeevalidationSchema = yup.object({
    title: yup.string().required("Title is required"),
    amount: yup.string().required("Amount is required"),
    collecting_month: yup.string().required("Fee Collecting Month is required"),
})

export const Feeinit = {
    _id: "",
    sn: 0,
    title: "",
    last_date_of_collection: "",
    optional: "No",
    collecting_month: "Once In Year",
    amount: "",
    discount_applicable: "No",
    late_fee_amount: "",
    late_fee_applicable: "No",
    late_fee_reoccur_days: "30",
    status: "Active",
    order: 0,
    expend: false
}

export interface FeeType {
    _id: string,
    sn?: number,
    title: string,
    last_date_of_collection: string,
    optional: string,
    collecting_month: string,
    amount: string,
    discount_applicable: string,
    late_fee_amount: string,
    late_fee_applicable: string,
    late_fee_reoccur_days: string,
    status: string,
    order: number,
    expend: boolean
}


export const feeheadData = [
    { title: 'EXP', field: 'expend', dataType: 'string', sortable: false, order: "" },
    { title: 'SN', field: 'sn', dataType: 'number', sortable: false, order: "", className: 'max-w-[10px]' },
    { title: 'Title', field: 'title', dataType: 'string', sortable: false, order: "" },
    { title: 'Amount', field: 'amount', dataType: 'string', sortable: false, order: "" },
    { title: 'Collecting Month', field: 'collecting_month', dataType: 'string', sortable: false, order: "" },
    { title: 'Last Payment Date', field: 'collecting_month', dataType: 'string', sortable: false, order: "" },
    { title: 'Optional', field: 'Optional', dataType: 'string', sortable: false, order: "" },
    { title: 'Status', field: 'status', dataType: 'string', sortable: false, order: "" },
    { title: 'Action', field: 'action', dataType: '', sortable: false, order: "", className: " " },
];
export const feeNestedheadData = [
    { title: 'EXP', field: 'expend', dataType: 'string', sortable: false, order: "" },
    { title: 'SN', field: 'sn', dataType: 'number', sortable: false, order: "", className: 'max-w-[10px]' },
    { title: 'Title', field: 'title', dataType: 'string', sortable: false, order: "" },
    { title: 'Amount', field: 'amount', dataType: 'string', sortable: false, order: "" },
    { title: 'Collecting Month', field: 'collecting_month', dataType: 'string', sortable: false, order: "" },
    { title: 'Last Payment Date', field: 'collecting_month', dataType: 'string', sortable: false, order: "" },
    { title: 'Optional', field: 'Optional', dataType: 'string', sortable: false, order: "" },
    { title: 'Status', field: 'status', dataType: 'string', sortable: false, order: "" },
    { title: 'Action', field: 'action', dataType: '', sortable: false, order: "", className: " " },
];
export const sectionFeeinit = {
    _id: "",
    sn: 0,
    class_id: "",
    class: "",
    section_id: "",
    section: "",
   fee:[Feeinit],
   expend:false

}

export interface SectionFeeType {
    _id: string,
    sn:number,
    class_id: string,
    class: string,
    section_id: string,
    section: string,
    fee: FeeType[],
    expend:boolean
}

export const sectionSubjectinit = {
    _id: "",
    sn: 0,
    class_id: "",
    class: "",
    section_id: "",
    section: "",
    same_syllabus_as_section_id:"",
    subjectList:[Subjectinit],
   expend:false

}

export interface SectionSubjectType {
    _id: string,
    sn:number,
    class_id: string,
    class: string,
    section_id: string,
    section: string,
    same_syllabus_as_section_id: string,
    subjectList: SubjectType[],
    expend:boolean
}

export const sectionFeeheadData = [
    { title: 'EXP', field: 'expend', dataType: 'number', sortable: false, order: "" },
    { title: 'SN', field: 'sn', dataType: 'number', sortable: false, order: "" },
    { title: 'Class Name', field: 'name', dataType: 'string', sortable: true, order: "" },
    { title: 'Section Name', field: 'name', dataType: 'string', sortable: true, order: "" },
    { title: 'Subject ', field: '', dataType: '', sortable: false, order: "" },
    
];

export interface classDataProps {
    class_id: string,
    class: string,
    section_id: string,
    section: string,
  }

// const  MonthlyFeeTypeInit ={
//     fee: Feeinit,
//     stu?:StudentType,
//     type: string,
//     month?:string;    
// }

  export interface MonthlyFeeType {
    fee?: Array<FeeType>,
    stu?:StudentType,
    type?: string,
    month?:string;     
}




export const  StudentFeePaymentInit ={
    _id: "",
    stu_id: "",
    class: "",
    section: "",
    payment_mode:"Cash",
    cheque_dd_no:"",
    cheque_dd_date:"",
    transaction_id:"",
    amount:0,    
    running_year:""
}

export interface StudentFeePaymentType {
    _id: string,
    stu_id: string,
    stu_name?: string,
    class: string,
    class_name?: string,
    section: string,
    section_name?: string,
    payment_mode:string,
    cheque_dd_no:string,
    cheque_dd_date:string,
    transaction_id:string,
    amount:number,    
    running_year:string,
    createdAt?:Date
}


export const StudentFeeReciptTypeInit= {
    stu_id: "",
    class: "",
    section: "",
    fee_id: [{
        title: "",
        last_date_of_collection: "",    
        amount: "", 
        late_fee_amount: "",  
        student_discount: "",  
    }],
    collecting_month: "",
    amount:0,     
    running_year:""
}

export interface StudentFeeReciptType {
    stu_id: string,
    class: string,
    section: string,
    fee_id: [{
        title: string,
        last_date_of_collection: string,    
        amount: string, 
        late_fee_amount: string,  
        student_discount: string,  
    }],
    collecting_month: string,
    amount:number,     
    running_year:string

}