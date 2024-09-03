import * as yup from 'yup'
export const SettingvalidationSchema = yup.object({
    name: yup.string().required("Name is required"),
})


export const Settinginit = {
    _id: "",
    school_name: "",
    address: {
        line_1: "",
        line_2: "",
        city: "",
        pin_no: "",
        state: "",
        country: "India",
    },
    running_year: "",
    running_year_history:[ ""],
    logo: "logo.png",
    start_month: "",
    result: [{
        percentage_from:"",
        percentage_to: "",
        division: "",
        grade:"",
        remarks: "",
    }],
    pass_rule:"",
    salary_leave_rule:"",
    cl_male:"12",
    cl_female:"15",
    max_cl_per_month:"2"
}
export interface SettingType {
    _id: string,
    school_name: string,
    address: {
        line_1: string,
        line_2: string,
        city: string,
        pin_no: string,
        state: string,
        country: string,
    },
    running_year: string,
    running_year_history: string[],
    logo: string,
    start_month: string,
    result: {
        percentage_from: string,
        percentage_to: string,
        division: string,
        grade: string,
        remarks: string,
    }[],
    pass_rule:string,
    salary_leave_rule:string,
    cl_male:string,
    cl_female:string,
    max_cl_per_month:string
}

