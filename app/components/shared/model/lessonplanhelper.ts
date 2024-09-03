import * as yup from 'yup'
import { SubjectType, Subjectinit } from './subjecthelper'


export const LessonPlanvalidationSchema = yup.object({
    title: yup.string().required("Title is required"),
})
export interface AllLessonSyllabusProps {
    newData: LessonPlanType,
    reciveDataTobeEdited: (option: LessonPlanType) => void
}
export interface LessonPlanQuestionShareProps {
    newData: LessonPlanQuestionShare,
    reciveDataTobeEdited: (option: LessonPlanQuestionShare) => void
}

export const syllabusInit = {
    title: [""],
    s_date: "",
    e_date: "",
    c_date: "",
    status: "",
}
export const questioninit = {
    // _id: "",
    title: "",
    body:[["",""],["",""]],
    type: "plain",
    marks: "",
}

export const lessoninit = {
    title: "",
    s_date: "",
    e_date: "",
    c_date: "",
    status: "",
    syllabus: [syllabusInit],
    question: [questioninit]
}

export const lessonPlaninit = {
    _id: "",
    sn: 0,
    class: "",
    section: "",
    subject: "",
    expend: false,
    lesson: [lessoninit],
    running_year: "",
}

export interface Question {
    _id?: string,
    title: string,
    body:any,
    type: string,
    marks: string,
}

export interface Syllabus {
    title: string[],
    s_date: string,
    e_date: string,
    c_date: string,
    status: string,

}

export interface Lesson {
    _id?: string,
    title: string,
    s_date: string,
    e_date: string,
    c_date: string,
    status: string,
    expend?: boolean,
    syllabus: Syllabus[]
    question: Question[]
}

export const LPClassInit = {
    _id: "",
    name: "",
    expend: false,
    section: [{
        _id: "",
        name: "",
        expend: false,
        same_syllabus_as_section_id: "",
        subjectList: [Subjectinit]
    }],
}

export interface LessonPlanType {
    _id: string,
    sn?: number,
    class: string,
    class_name?: string,
    section: string,
    section_name?: string,
    subject: string,
    subject_name?: string,
    expend?: boolean,
    lesson: Lesson[],
    running_year: string,
    type?: string
}



export interface Section {
    _id: string,
    name: string;
    expend: boolean;
    same_syllabus_as_section_id: string;
    subjectList: SubjectType[],
}

export interface LPClassType {
    _id: string;
    name: string;
    expend: boolean;
    section: Section[];
}

export const LessonPlanQuestionShareinit = {
    lesson_plan_id: "",
    type: "",
    class: "",
    class_name: "",
    section: "",
    section_name: "",
    subject: "",
    subject_name: "",
    lesson: lessoninit,
    question: [questioninit],  
    Syllabus: [syllabusInit],
    running_year: "",
}

export interface LessonPlanQuestionShare {
    lesson_plan_id: string,
    type: string,
    class: string,
    class_name: string,
    section: string,
    section_name: string,
    subject: string,
    subject_name: string,
    lesson: Lesson,
    question: Question[] 
    running_year: string
}

export const LessonPlanData = [
        { title: 'EXP', field: 'expend', dataType: 'number', sortable: false, order: "" },
        { title: 'SN', field: 'sn', dataType: 'number', sortable: false, order: "" },
        { title: 'Class Name', field: 'name', dataType: 'string', sortable: true, order: "" }
    ]


export const LessonplainxpData = [
    { title: 'EXP', field: 'expend', dataType: 'number', sortable: false, order: "" },
    { title: 'SN', field: 'sn', dataType: 'number', sortable: false, order: "", },
    { title: 'Name', field: 'name', dataType: 'string', sortable: false, order: "", className: 'w-56' },
    { title: 'Lesson', field: '', dataType: '', sortable: false, order: "", },
];

export const LessonPlanQuestionData = [
    { title: 'EXP', field: 'expend', dataType: 'number', sortable: false, order: "" },
    { title: 'SN', field: 'sn', dataType: 'number', sortable: false, order: "", },
    { title: 'Name', field: 'name', dataType: 'string', sortable: false, order: "", className: 'w-56' },
    { title: 'Question', field: 'question', dataType: '', sortable: false, order: "", },
];
