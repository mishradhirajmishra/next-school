import * as yup from 'yup'
import { SelectOptionType } from './timeoptionhelper'
import { Question, questioninit } from './lessonplanhelper'
import { ClassOptionType } from './classhelper'
export const ExamvalidationSchema = yup.object({
    title: yup.string().required("Exam Title is required"),
})
export const timeTableInit = {
    subject: "",
    subject_id: "",
    optional: "",
    date: "",
    start_time: "",
    end_time: "",
    max_mark: "100",
    min_mark: "40",
    syllabus: "",
    question_paper: [{ _id: "", marks: "" }]
}


export const IncludeInit = {
    class: "",
    class_name: "",
    section: "",
    section_name: "",
    same_syllabus_as_section_id: "",
    same_syllabus_as_section_name: "",
    status: "Active",
    expend: false,
    timeTable: [timeTableInit]
}

export const Examinit = {
    _id: "",
    title: "",
    expend: false,
    status: "",
    include_in_marksheet: "No",
    include: [IncludeInit],
    running_year: "",
}
export interface TimeTableType {
    _id?: string,
    subject: string,
    subject_id: string,
    optional: string,
    date: string,
    start_time: string,
    end_time: string,
    start_time_List?: Array<SelectOptionType>,
    end_time_list?: Array<SelectOptionType>,
    max_mark: string,
    min_mark: string,
    syllabus: string,
    question_paper: { _id: string, marks: string }[]
}
export interface IncludeType {
    _id?: string,
    class: string,
    class_name?: string,
    section: string,
    section_name?: string,
    same_syllabus_as_section_id?: string,
    same_syllabus_as_section_name?: string,
    status: string,
    expend: boolean,
    timeTable: TimeTableType[]
}
export interface ExamType {
    _id: string,
    title: string,
    expend: boolean,
    status: string,
    include_in_marksheet: string,
    exam_seating?: ExamSeating[]
    include: IncludeType[],
    running_year: string
}
export interface ExamSeating {
    _id?:string,
    room_id:string,
    seating:Seating[]
}
export interface Seating {
    class_id: string,
    selectedClassOpt?:ClassOptionType,
    section_id: string,
    roll_no_from: string,
    roll_no_to: string,
}

export const seatingInit = {
    class_id:  "",
    section_id:  "",
    roll_no_from:  "",
    roll_no_to:  "",
}
export const examSeatingInit = {
    room_id: "",
    seating:[seatingInit]
}

export const ExamShareTypeInit = {
    type: "",
    exam: "",
    include: IncludeInit
}

export interface ExamShareType {
    type: string,
    exam?: ExamType,
    include?: IncludeType,
    timeTable?: TimeTableType
}



export interface lessonsList { subject_id: string, lesson_id: string, lesson: string, syllabus: string }
export const lessonsListInit = { subject_id: "", lesson_id: "", lesson: "", syllabus: "" }


export const examInstructionInit = {
    _id: "",
    title: "",
    instructions: [
        { title: "", }
    ]
}

export interface ExamInstructionType {
    _id: string,
    title: string,
    instructions: { title: string }[]
}

export const examMarksInit = {
    _id: "",
    exam: "",
    class: "",
    section: "",
    subject: "",
    student: "",
    marks: "",
    running_year: ""
}

export interface ExamMarksType {
    _id: string,
    exam: string,
    class: string,
    section: string,
    subject: string,
    student: string,
    marks: string,
    running_year: string
}


export const marksheetHeadData = [
    { title: 'EXP', field: 'expend', dataType: 'number', sortable: false, order: "" },
    { title: 'SN', field: 'sn', dataType: 'number', sortable: false, order: "" },
    { title: 'Class Name', field: 'name', dataType: 'string', sortable: false, order: "", className: "min-w-32 max-w-32 w-32 " },
    { title: 'Section Name', field: 'name', dataType: 'string', sortable: false, order: "", className: "min-w-32 max-w-32 w-32 " },
    { title: '|', field: '', dataType: 'string', sortable: false, order: "", className: " opacity-90 c-text-success min-w-0 max-w-0 w-0 pl-0 pr-1" },
    { title: '', field: '', dataType: 'string', sortable: false, order: "", className: "min-w-14 max-w-14 w-14 " },
    { title: '|', field: '', dataType: 'string', sortable: false, order: "", className: " opacity-90 c-text-success min-w-0 max-w-0 w-0 pl-0 pr-1" },

];
