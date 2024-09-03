
import mongoose from 'mongoose';
// @ts-ignore
import bcrypt from 'bcrypt';

var Schema = mongoose.Schema;

var employeeSchema = new Schema({
    emp_id: { type: String },
    reg_no: { type: String, default: "" },
    name: { type: String, default: "" },
    gender: { type: String, default: "Male" },
    dob: { type: String, default: "" },
    blood_group: { type: String, default: "NA" },
    mobile: { type: Number },
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    status: { type: String, default: "Active" }, //'Active','Inactive','Left')  DEFAULT 'Active'
    addhar_no: { type: String, default: "" },
    addhar_image: { type: String, default: "" },
    profile_image: { type: String, default: "profile_image.png" },
    join_date: { type: String, default: "" },
    left_date: { type: String, default: "" },
    r_address: {
        line_1: { type: String, default: "" },
        line_2: { type: String, default: "" },
        city: { type: String, default: "" },
        pin_no: { type: String, default: "" },
        state: { type: String, default: "" },
        country: { type: String, default: "India" }
    },
    r_p_same: { type: Boolean },
    p_address: {
        line_1: { type: String, default: "" },
        line_2: { type: String, default: "" },
        city: { type: String, default: "" },
        pin_no: { type: String, default: "" },
        state: { type: String, default: "" },
        country: { type: String, default: "India" }
    },
    bank_detail: {
        ac_number: { type: String },
        ac_name: { type: String },
        ifsc_code: { type: String },
        ac_type: { type: String },
        bank_name: { type: String },
        pan_no: { type: String }
    },
    family_detail: [{
        name: { type: String, default: "" },
        relation: { type: String, default: "" },
        mobile: { type: String, default: "" },
    }],
    related_to: [{ type: String, default: "" }],  // 'Director Office','Principal Office','Academics','Administration','Finance','Other'
    role: { type: String, default: "" },        // Admin, Teacher, Principal,Accountant
    remarks_text: { type: String, default: "" },
    intresrted_subject: [{ type: String, default: "" }],
    emp_type: { type: String, default: "" }, //'Permanent','Regular','Probation','Temporary','ADHOC','Contract'
    edu_detail: [{
        organization_name: { type: String, default: "" },
        board: { type: String, default: "" },
        subjects: [{ type: String, default: "" }],
        t_mark: { type: String, default: "" },
        o_mark: { type: String, default: "" },
        p_year: { type: String, default: "" },
        percentage: { type: String, default: "" },
        grade: { type: String, default: "" },
        certificate: { type: String, default: "certificate.png" },
    }],
    exp_detail: [{
        degination: { type: String, default: "" },
        company: { type: String, default: "" },
        from_date: { type: String, default: "" },
        to_date: { type: String, default: "" },
        role: { type: String, default: "" },
        responsibilites: { type: String, default: "" },
        certificate: { type: String, default: "certificate.png" },
    }],
    el: [{
        no_days: { type: String, default: "0" },
        remark: { type: String, default: "" },
    }],
    salary_pm: { type: String, default: "" },
    expend: { type: Boolean, default: false },
}, { timestamps: true });

employeeSchema.pre("save", function (next) {
    const emp = this;
    if (this.isModified("password" || this.isNew)) {
        bcrypt.genSalt(10, (saltError: any, salt: any) => {
            if (saltError) { return next(saltError) }
            else {
                bcrypt.hash(emp.password, salt, (hashError: any, hash: any) => {
                    if (hashError) { return next(hashError) }
                    else {
                        emp.password = hash;
                        next()
                    }

                })
            }
        })
    } else {
        return next()
    }

})


var employeeSalarySchema = new Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
    month: { type: String },
    schooldays: { type: String, default: "" },
    presentdays: { type: String, default: "" },
    leavedays: { type: String, default: "" },
    c_leave: { type: String, default: "" },
    e_leave: { type: String, default: "" },
    p_leave: { type: String, default: "" },
    status:{ type: String, default: "Generated" },
    amount: { type: String , default: "0" },
    mode: { type: String , default: "" },
    transaction_id: { type: String , default: "" },   
    transaction_date: { type: String , default: "" },
    running_year: { type: String, default: "" }
})

export const Employeesalary = mongoose.models.employeesalary || mongoose.model('employeesalary', employeeSalarySchema);
export const Employee = mongoose.models.employee || mongoose.model('employee', employeeSchema);



