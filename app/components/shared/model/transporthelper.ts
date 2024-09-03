import { format } from 'date-fns'
import * as yup from 'yup'
// export const ClassWorkvalidationSchema = yup.object({
//     title: yup.string().required("Title is required"),
//     date: yup.date()
//     .required("Date is required")
//     // .min(new Date(), "Date must be Upcomming from today"),
// })
export const TransportSettingInit = {
    _id: "",
    vehicle_charge_rule: "",
    vehicle_charge: "",
    driver_salary_rule: "",
    driver_salary: "",
    salary_leave_rule:"Based on Total day of Month",
    cl_male:"12",
    cl_female:"15"  ,
    max_cl_per_month:"2",
}

export const TransportAttendanceInit ={
    driver_id: "",
    vehicle_id: "",
    date: "",
    no_of_trip: "",
    comment: "",
    running_year: ""
}
 
export const MentinanceInit ={
    _id: "",
    name: "",
    comment: "",
    date:  "",
    amount: "",
}
export const VehicleInit ={
    _id:"",
    vehicle_no: "",
    registration_no: "",
    nick_name: "",
    detail: "",
    seating_capacity: "",
    type: "Private",
    join_date: "",
    left_date: "",
    status: "Active",
    expend: false,
    mentinance: [],
    vehicle_charge_rule: "Monthly",
    charge: "",
}

export const VehicleHeadData = [
    { title: 'EXP', field: 'expend', dataType: 'string', sortable: false, order: "" , className:'max-w-14'},
    { title: 'SN', field: 'sn', dataType: 'number', sortable: false, order: "",className:"max-w-14" },
    { title: 'Vehicle No', field: 'vehicle_no', dataType: 'string', sortable: true, order: "" },
    { title: 'Nick Name', field: 'nick_name', dataType: 'string', sortable: true, order: "" },
    { title: 'Capacity', field: 'seating_capacity', dataType: 'string', sortable: true, order: "" },
    { title: 'Type', field: 'type', dataType: 'string', sortable: true, order: "" },
    { title: 'Status', field: 'status', dataType: 'string', sortable: true, order: "" },
    { title: 'Action', field: '', dataType: '', sortable: false, order: "", className:"max-w-20" },
];

export const RouteHeadData = [
    { title: 'EXP', field: 'expend', dataType: 'string', sortable: false, order: "" , className:'max-w-14'},
    { title: 'SN', field: 'sn', dataType: 'number', sortable: false, order: "",className:"max-w-14" },
    { title: 'Name', field: 'name', dataType: 'string', sortable: true, order: "" },
    { title: 'Description', field: 'description', dataType: 'string', sortable: false, order: "" },
    { title: 'Action', field: '', dataType: '', sortable: false, order: "", className:"max-w-20" },
];
export const StopageInit ={
    name: "",
    stop_no: "",
    longitude: "",
    latitude: "",
    comment: "",
    distance_in_km: "",
}
export const RouteInit ={
    _id: "",
    expend: false,
    name: "",
    description: "",
    stopage: [StopageInit],
}
export const ExperianceInit ={
    date_from: "",
    date_to: "",
    vehicle_type: "",
    organization: "",
}
export const DrivingliccenceInit ={
    licence_no: "",
    exp_date: "",
    type: "",
}

export const IdproofInit = {
    name: "",
    id_no: "",
    type: "",
    image: "",
}
export const Driver ={
    name: "",
    father: "",
    gender: "",
    profile_image: "",
    status: "",
    type: "",
    driving_liccence: DrivingliccenceInit,
    experiance: [ExperianceInit],
    id_proof: [IdproofInit],
    mobile1: "",
    mobile2: "",
    comment: "",
    join_date: "",
    left_date: "",
    driver_salary_rule: "",
    salary: "",
}

export interface TransportSetting {
    _id: string,
    vehicle_charge_rule: string,
    vehicle_charge: string,
    driver_salary_rule: string,
    driver_salary: string,
    salary_leave_rule:string,
    cl_male:string,
    cl_female:string,
    max_cl_per_month:string,
}

export interface TransportAttendance {
    driver_id: string,
    vehicle_id: string,
    date: string,
    no_of_trip: string,
    comment: string,
    running_year: string
}

export interface Mentinance {
    _id?: string,
    name: string,
    comment: string,
    date: string,
    amount: string,
}
export interface Vehicle {
    _id: string,
    vehicle_no: string,
    registration_no: string,
    nick_name: string,
    detail: string,
    seating_capacity: string,
    type: string,
    join_date: string,
    left_date: string,
    status: string,
    expend: boolean,
    mentinance: Mentinance[],
    vehicle_charge_rule: string,
    charge: string,
}
export interface Stopage {
    name: string,
    stop_no: string,
    longitude: string,
    latitude: string,
    comment: string,
    distance_in_km: string,
}
export interface Route {
    _id: string,
    name: string,
    expend: boolean,
    description: string,
    stopage: Stopage[],
}
export interface Experiance {
    date_from: string,
    date_to: string,
    vehicle_type: string,
    organization: string,
}
export interface Drivingliccence {
    licence_no: string,
    exp_date: string,
    type: string,
}

export interface Idproof {
    name: string,
    id_no: string,
    type: string,
    image: string,
}
export interface Driver {
    name: string,
    father: string,
    gender: string,
    profile_image: string,
    status: string,
    type: string,
    driving_liccence: Drivingliccence,
    experiance: Experiance[],
    id_proof: Idproof[],
    mobile1: string,
    mobile2: string,
    comment: string,
    join_date: string,
    left_date: string,
    driver_salary_rule: string,
    salary: string,
}



