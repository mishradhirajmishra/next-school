import * as yup from 'yup'
export const ClassWorkvalidationSchema = yup.object({
    title: yup.string().required("Title is required"),
    date: yup.date()
    .required("Date is required")
    // .min(new Date(), "Date must be Upcomming from today"),
})

export const CHWorkinit = {
    _id: "",
    sn:0,
    class_id: "", 
    section_id: "", 
    teacher_id: "", 
    subject: "", 
    period_id:"",
    date: "",
    title: "", 
    description: "", 
    attachment: "class-work.png", 
    status:"published",
    expend:false,
    running_year: ""   
}
export interface CHWorkType {
    _id: string;
    sn:number;
    class_id: string;
    section_id: string;
    teacher_id: string;
    subject: string;
    period_id: string;
    date: string;
    title: string;
    description: string;
    attachment: string;
    status:string;
    expend:boolean;
    running_year: string;
}
export const CHWorkheadData = [
    { title: 'EXP', field: 'expend', dataType: 'string', sortable: false, order: "" },
    { title: 'SN', field: 'sn', dataType: 'number', sortable: false, order: "",className:'max-w-[10px]' },
    { title: 'Title', field: 'title', dataType: 'string', sortable: true, order: "" },
    { title: 'Date', field: 'Subject', dataType: 'string', sortable: true, order: "" },
    { title: 'Status', field: 'status', dataType: 'string', sortable: true, order: "" },
    { title: 'Action', field: '', dataType: '', sortable: false, order: "", className:"max-w-[30px]" },
];

