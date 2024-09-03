import * as yup from 'yup'


export const LeavevalidationSchema = yup.object({
   title: yup.string().required("title is required"),
    type: yup.string().required("type is required"),
    date: yup.date()
        .min(new Date(), "From date must be Future date from today"),
    e_date: yup.date().default(null)
        .when("date",
            (date, yup) => date && yup.min(date, "From Date cannot be before To Date"))

})

export const Leaveinitial = {
    _id: "",
    date: "",
    title: "",
    description: "",
    type: "leave",
    e_date: "",
    class: ""
}



export interface LeaveType {
    _id: string,
    date: string;
    title: string;
    description: string;
    type: string;
    e_date: string;
    class: string;
}




