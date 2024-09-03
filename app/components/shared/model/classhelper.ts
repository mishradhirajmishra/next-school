import * as yup from 'yup'
import { SelectOptionType } from './timeoptionhelper'
 
export const PeriodvalidationSchema = yup.object({
    name: yup.string().required("Name is required"),
    start_time: yup.string().required("Start Time is required"),
    end_time: yup.string().required("End Time is required")
})

export const ClassvalidationSchema = yup.object({
    name: yup.string().required("Name is required"),
    section: yup.array().of(
        yup.object({
            name: yup.string().required("Name is required"),
            room_no: yup.string().required("Room No is required"),
        })
    )
})
export const selectedSectionInitial = { name: "", _id: "", value: "" }
export interface AllClassProps {
    newData: ClassType,
    reciveDataTobeEdited: (option: any, type: string, class_data: BasicData, section_data: BasicData) => void
  }
  
export interface AllPeriodProps {
    newData: PeriodType,
    reciveDataTobeEdited: (option: PeriodType) => void
  }

  export interface PeriodAllotedTableProps {
    data: any,
    period:PeriodType
  }
  
const Daysinit = {
    subject: "",
    teacher: "",
    selected: false
}
export const Periodinitial = {
    _id: "",
    sn:0,
    name: "",
    start_time: "",
    end_time: "",
    monday: Daysinit,
    tuesday: Daysinit,
    wednesday: Daysinit,
    thursday: Daysinit,
    friday: Daysinit,
    saturday: Daysinit
}
export const Classinitial = {
    _id: "",
    name: "",
    expend: false,
    section: [{
        _id: "",
        name: "",
        room_no: "",
        class_teacher:"",
        expend: false,
        period: [Periodinitial]
    }],
}
export const ClassinitialDropdown = {
    _id: "",
    name: "",
    expend: false,
    status:false,
    value:"",
    section: [{
        _id: "",
        name: "",
        value:"",
        status:false,
    }],
}

export interface SectionDropDown {
    _id: string,
    name: string;
    value:string;
    status:boolean, 
}


export interface ClassDropDownType {
    _id: string;
    name: string;
    expend: boolean;
    value:string;
    status:boolean;
    section: SectionDropDown[];
}

export interface ClassType {
    _id: string;
    name: string;
    expend: boolean;
    section: Section[];
}

export interface Days {
    subject: string;
    teacher: string;
    selected: boolean;
}
export interface PeriodType {
    _id: string,
    sn:number;
    name: string;
    start_time: string;
    end_time: string;
    start_time_List?:Array<SelectOptionType>,
    end_time_list?:Array<SelectOptionType>,
    monday: Days;
    tuesday: Days;
    wednesday: Days;
    thursday: Days;
    friday: Days;
    saturday: Days;
    expend?: boolean;
}
export interface Section {
    _id: string,
    name: string;
    room_no: string;
    class_teacher:string;
    expend: boolean;
    period: PeriodType[];
}

 
export interface BasicData {
    _id:string;
    name:string;
}

export const ClassOptioninitial = {
    _id: "",
    name: "",
    status: false, 
    value: "",
    section: [{
        _id: "",
        name: "",   
        status: false, 
        value: "", 
    }],
}




export interface ClassOptionType {
    _id: string;
    name: string;
    value: string;
    status: boolean;
    section: SectionOptionType[];     
}

export interface SectionOptionType {
    _id: string,
    name: string; 
    status: boolean;
    value: string; 
}

export const classheadData = [  
    { title: 'EXP', field: 'expend', dataType: 'number', sortable: false, order: "" },
    { title: 'SN', field: 'sn', dataType: 'number', sortable: false, order: "" },
    { title: 'Class Name', field: 'name', dataType: 'string', sortable: true, order: "" },  
    { title: 'Action', field: '', dataType: '', sortable: false, order: "" },
];

export const periodheadData = [
    { title: 'SN', field: 'sn', dataType: 'number', sortable: false, order: "" },
    { title: 'Period Name', field: 'name', dataType: 'string', sortable: true, order: "" },
    { title: 'Start Time', field: 'start_time', dataType: 'string', sortable: true, order: "" },
    { title: 'End Time', field: 'end_time', dataType: 'string', sortable: true, order: "" },
    { title: 'Action', field: '', dataType: '', sortable: false, order: "" },
];

export const PeriodPreviewinitial = {
    class_id: "",
    class: "",
    section:  "",
    section_id:  "",
    period:  "",
    period_id:  "",
    day:  "",
    start_time:  "",
    end_time:  "",
    subject:  "",
    teacher:  "",
    selected:false
}

export interface PeriodPreviewType {    
    class_id: string;
    class: string;   
    section_id: string;
    section: string;
    period: string;
    period_id: string;
    day: string;
    start_time: string;
    end_time: string;
    subject: string;
    teacher: string;
    selected:boolean;
}

export const periodPreviewheadData = [    
    { title: 'Class', field: 'class', dataType: 'string', sortable: false, order: "" },
    { title: 'Section', field: 'section', dataType: 'string', sortable: false, order: "" },
    { title: 'Period', field: 'period', dataType: 'string', sortable: false, order: "" },
    { title: 'Day', field: 'day', dataType: 'string', sortable: false, order: "" },
    { title: 'Teacher', field: 'teacher', dataType: 'string', sortable: false, order: "" },     
    { title: 'Status', field: 'status', dataType: 'string', sortable: false, order: "" },     
];
export const periodPreviewTeacherheadData = [    
    { title: 'Day', field: 'day', dataType: 'string', sortable: false, order: "" },
    { title: 'Class', field: 'class', dataType: 'string', sortable: false, order: "" },
    { title: 'Section', field: 'section', dataType: 'string', sortable: false, order: "" },   
];

export const periodAllotedheadData = [
    { title: 'EXP', field: 'expend', dataType: 'number', sortable: false, order: "" },
    { title: 'SN', field: 'sn', dataType: 'number', sortable: false, order: "" },
    { title: 'Period Name', field: 'name', dataType: 'string', sortable: true, order: "" },
    { title: 'Start Time', field: 'start_time', dataType: 'string', sortable: true, order: "" },
    { title: 'End Time', field: 'end_time', dataType: 'string', sortable: true, order: "" },
    // { title: 'Action', field: '', dataType: '', sortable: false, order: "" },
];

 