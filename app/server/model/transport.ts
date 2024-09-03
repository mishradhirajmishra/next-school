
import mongoose from 'mongoose';
var Schema = mongoose.Schema;
export const TransportSettingObj = { 
    vehicle_charge_rule: { type: String, default: "" },
    vehicle_charge: { type: String, default: "" },
    driver_salary_rule: { type: String, default: "" },
    driver_salary: { type: String, default: "" }, 
    salary_leave_rule:{ type: String, default: "" },
    cl_male:{ type: String, default: "12" },
    cl_female:{ type: String, default: "15" },
    max_cl_per_month:{ type: String, default: "2" },
}

export const TransportAttendanceObj = {
driver_id: { type: mongoose.Schema.Types.ObjectId, ref: "driver"},
vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: "vehicle"},
date: { type: Date },
no_of_trip: { type: String, default: "" },   
comment: { type: String, default: "" },   
running_year: { type: String, default: "" }
} 

export const VehicleObj = {  
    vehicle_no : { type: String,default:""}, 
    registration_no : { type: String,default:""}, 
    nick_name : { type: String,default:""}, 
    detail : { type: String,default:""},  
    seating_capacity: { type: String,default:""}, 
    type : { type: String,default:""}, 
    join_date : { type: String,default:""}, 
    left_date : { type: String,default:""}, 
    status : { type: String,default:""}, 
    expend: { type: Boolean, default: false },
    mentinance: [{
        name : { type: String,default:""}, 
        comment : { type: String,default:""}, 
        date : { type: String,default:""}, 
        amount : { type: String,default:""},  
    }],
    vehicle_charge_rule: { type: String, default: "" },
    charge: { type: String, default: "" },
}

export const RouteObj = { 
    name : { type: String,default:""}, 
    description : { type: String,default:""}, 
    expend: { type: Boolean, default: false },
    stopage:[{
        name : { type: String,default:""}, 
        stop_no : { type: String,default:""}, 
        longitude : { type: String,default:""}, 
        latitude : { type: String,default:""}, 
        comment : { type: String,default:""}, 
        distance_in_km : { type: String,default:""}, 
    }],
}


export const DriverObj = { 
    name : { type: String,default:""}, 
    father : { type: String,default:""},
    gender : { type: String,default:"Male"},
    profile_image : { type: String,default:""},
    status : { type: String,default:""},
    type : { type: String,default:""},
    driving_liccence :{
        licence_no:{ type: String,default:""},
        exp_date:{ type: String,default:""},
        type:{ type: String,default:""},
    }, 
    experiance:[{
        date_from:{ type: String,default:""},
        date_to:{ type: String,default:""},
        vehicle_type:{ type: String,default:""},
        organization:{ type: String,default:""},
    } ],
    id_proof:[{
        name:{ type: String,default:""},
        id_no:{ type: String,default:""},
        type:{ type: String,default:""},
        image:{ type: String,default:""},
    } ],
    mobile1: { type: Number },
    mobile2: { type: Number },
    comment : { type: String,default:""}, 
    join_date : { type: String,default:""}, 
    left_date : { type: String,default:""}, 
    driver_salary_rule: { type: String, default: "" },
    salary: { type: String, default: "" },
} 
var TransportattendanceSchema = new Schema( TransportAttendanceObj, { timestamps: true });
export const Transportattendance = mongoose.models.transportattendance || mongoose.model('transportattendance', TransportattendanceSchema);

var TransportsettingSchema = new Schema( TransportSettingObj, { timestamps: true });
export const Transportsetting = mongoose.models.transportsetting || mongoose.model('transportsetting', TransportsettingSchema);

var VehicleSchema = new Schema( VehicleObj, { timestamps: true });
export const Vehicle = mongoose.models.vehicle || mongoose.model('vehicle', VehicleSchema);
 
var DriverSchema = new Schema( DriverObj, { timestamps: true });
export const Driver = mongoose.models.driver || mongoose.model('driver', DriverSchema);

var DriverSchema = new Schema( RouteObj, { timestamps: true });
export const Route = mongoose.models.route || mongoose.model('route', DriverSchema);