import { format } from "date-fns";
 

//=============== TIME OPTION =====================

export const HolidaysInIndiaApi = async () => {
  var result: any
  await fetch(`https://www.googleapis.com/calendar/v3/calendars/en.indian%23holiday%40group.v.calendar.google.com/events?key=AIzaSyDosPhanVOU3SovrQwhiRSLuFR5kdEI1H8`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      result = data.items.map((x: any, i: number) => { return { title: x.summary, description: "", date: x.start.date, e_date: x.end.date, type: "google", class: "c-text-success" } });
    })
  return result
}

export const GetTimeoptionApi = async () => {
  var result: any
  await fetch(`/api/timeoption`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      data.data = data.data.map((x: any, i: number) => { x.sn = i + 1; return x });
      result = data
    })
  return result
}

export const UpdateTimeOptionApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/timeoption`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}


//=============== PERIOD OPTION =====================

export const GetPeriodoptionApi = async () => {
  var result: any
  await fetch(`/api/periodoption`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      data.data = data.data.map((x: any, i: number) => { x.sn = i + 1; return x });
      result = data
    })
  return result
}

export const UpdatePeriodOptionApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/periodoption`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

//=============== PERIOD (Master Data) =====================
export const CreateUpdateAllPeriodMasterApi: (arg0: any) => any = async (values: any) => {
  var result: any
  await fetch(`/api/period`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

export const GetAllPeriodMasterApi = async () => {
  var result: any
  await fetch(`/api/period`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      data.data = data.data.map((x: any, i: number) => { x.sn = i + 1; x.expend = false; return x });
      result = data
    })
  return result
}

export const DelPeriodMasterApi: (arg0: string) => any = async (_id: string) => {
  var result: any
  await fetch(`/api/period?_id=${_id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

export const GetAllPeriodMasterDropDownApi = async () => {
  var result: any
  await fetch(`/api/period-dropdown`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      result = data
    })
  return result
}
//=============== SUBJECT =====================

export const GetAllSubjectApi = async () => {
  var result: any
  await fetch(`/api/subject`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      data.data = data.data.map((x: any, i: number) => { x.sn = i + 1; return x });
      result = data
    })
  return result
}

export const CreateUpdateSubjectApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/subject`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}
export const DelSubjectApi: (arg0: string) => any = async (_id: string) => {
  var result: any
  await fetch(`/api/subject?_id=${_id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}
//=============== CLASS =====================

export const GetAllClassOptionApi = async () => {
  var result: any
  await fetch(`/api/class`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      data.data = data.data.map((x: any) => {
        x.value = x._id;
        if (x.section.length > 0) { x.section = x.section.map((y: any) => { y.value = y._id; return y }) }
        return x
      })
      result = data
    })
  return result
}
export const GetAllClassApi = async () => {
  var result: any
  await fetch(`/api/class`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      data.data = data.data.map((x: any, i: number) => { x.sn = i + 1; return x });
      result = data
    })
  return result
}

export const CreateUpdateClassPostApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/class`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}
export const CreateUpdateClassPatchApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/class`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}
export const CreateUpdateClassOptionApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/class`, {
    method: 'OPTIONS',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}
export const DelClassApi: (arg0: string) => any = async (_id: string) => {
  var result: any
  await fetch(`/api/class?_id=${_id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

export const GetAllClassDropDownApi = async () => {
  var result: any
  await fetch(`/api/class-drop-down`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      data.data = data.data.map((x: any) => {
        x.value = x._id;
        if (x.section.length > 0) { x.section = x.section.map((y: any) => { y.value = y._id; return y }) }
        return x
      })
      result = data
    })
  return result
}

export const GetClassTeacherAllotedApi = async () => {
  var classTeacher: Array<String> = [];
  var roomNO: Array<String> = [];
  await fetch(`/api/class-teacher-alloted`, { method: "GET" })
    .then(response => response.json())
    .then(data => { data.data.map((cl: any) => { cl.section.map((sec: any) => { classTeacher.push(sec.class_teacher);roomNO.push(sec.room_no) }) }) })
  return {classTeacher,roomNO}
}

 

export const GetClassTeacherForLoginotedApi = async () => {
  var result: Array<any> = []
  await fetch(`/api/class-teacher-alloted`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      data.data.map((cl: any) => {
        cl.section.map((sec: any) => {
          result.push({ class: cl._id, section: sec._id, teacher: sec.class_teacher })
        })
      })
    })
  return result
}


export const GetTeacherPeriodAllotedApi = async () => {
  var result: Array<any> = []
  await fetch(`/api/teacher-period-alloted`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      data.data.map((cl: any) => {
        cl.section.map((sec: any) => {
          sec.period.map((per: any) => {
            const singleDay = { class_id: cl._id, class: cl.name, section: sec.name, section_id: sec._id, room_no: sec.room_no, period_id: per._id, period: per.name, start_time: per.start_time, end_time: per.end_time, selected: false }
            result.push({ ...singleDay, day: "monday", subject: per.monday.subject, teacher: per.monday.teacher, })
            result.push({ ...singleDay, day: "tuesday", subject: per.tuesday.subject, teacher: per.tuesday.teacher })
            result.push({ ...singleDay, day: "wednesday", subject: per.wednesday.subject, teacher: per.wednesday.teacher })
            result.push({ ...singleDay, day: "thursday", subject: per.thursday.subject, teacher: per.thursday.teacher })
            result.push({ ...singleDay, day: "friday", subject: per.friday.subject, teacher: per.friday.teacher })
            result.push({ ...singleDay, day: "saturday", subject: per.saturday.subject, teacher: per.saturday.teacher })
          })
        })
      })
    })

  return result
}
//=============== Employee =====================
export const GetSingleEmployeeApi = async (employee_id:string) => {
  var result: any
  await fetch(`/api/employee-single?employee_id=${employee_id}`, { method: "GET" })
    .then(response => response.json())
    .then(data => {      
      result = data.data
    })
  return result
}

export const GetEmployeeDropdownApi = async (role:string) => {
  var result: any
  await fetch(`/api/employee-dropdown?role=${role}`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      data.data = data.data.map((x: any, i: number) => { x.sn = i + 1; return x });
      result = data
    })
  return result
}

export const GetAllEmployeeApi = async () => {
  var result: any
  await fetch(`/api/employee`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      data.data = data.data.map((x: any, i: number) => { x.sn = i + 1; return x });
      result = data
    })
  return result
}

export const CreateUpdateEmployeeApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/employee`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

export const DelEmployeeApi: (arg0: string) => any = async (_id: string) => {
  var result: any
  await fetch(`/api/employee?_id=${_id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

//=============== Employee Attendances for Admin =====================
export const GetAllEmployeeAttendancesApiAdmin = async () => {
  var result: any
  await fetch(`/api/employee-attendance`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      data.data = data.data.map((x: any, i: number) => { x.sn = i + 1; return x });
      result = data
    })
  return result
}

export const UpdateEmployeeAttendanceApiAdmin: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/employee-attendance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}




export const GetAllEmployeeAttendancesApi = async (date: string) => {
  var result: any
  await fetch(`/api/employee-attendance?date=${date}`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      data.data = data.data.map((x: any, i: number) => { x.sn = i + 1; return x });
      result = data
    })
  return result
}

export const UpdateEmployeeAttendanceApi = async (val: any) => {
  var result: any
  await fetch(`/api/employee-attendance`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}


export const StartEmployeeAttendancesApi = async (date: string) => {
  var result: any
  await fetch(`/api/employee-attendance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date })
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

export const GetEmployeeAttendancesSummaryApi = async (employee_id: string,running_year:string) => {
  // console.log(employee_id,running_year)
  var result: any
  await fetch(`/api/employee-attendance-summary?employee_id=${employee_id}&running_year=${running_year}`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      // data.data = data.data.map((x: any, i: number) => { x.sn = i + 1; return x });
      result = data.data
    })
  return result
}
//=============== Students =====================

// export const GetAllStudentsApi = async () => {
//   var result: any
//   await fetch(`/api/student`, { method: "GET" })
//     .then(response => response.json())
//     .then(data => {
//       data.data = data.data.map((x: any, i: number) => { x.sn = i + 1; return x });
//       result = data
//     })
//   return result
// }

export const CreateUpdateStudentApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/student`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

export const GetSpecificStudentsApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/student`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

//=============== Students LIST =====================
export const GetSpecificStudentsListApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/student-list`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data.data; })
  return result
}


export const GetDropDownListApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/student-list`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data.data; })
  return result
}





export const DelStudentApi: (arg0: string) => any = async (_id: string) => {
  var result: any
  await fetch(`/api/student?_id=${_id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

//=============== Leve =====================

export const GetAllLeveApi = async () => {
  var result: any
  await fetch(`/api/leave`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      //  data.data = data.data.map((x: any, i: number) => { x.date = new Date(x.date); return x });
      result = data
    })
  return result
}

export const CreateLeaveApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/leave`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}
export const UpdateLeaveApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/leave`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

export const DelLeaveApi: (arg0: string) => any = async (_id: string) => {
  var result: any
  await fetch(`/api/leave?_id=${_id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

//=============== Student Attendances  =====================

export const GetAllStudentAttendancesApi = async (class_id: string, section_id: string, date: string) => {
  var result: any
  await fetch(`/api/student-attendance?class_id=${class_id}&section_id=${section_id}&date=${date}`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      data.data = data.data.map((x: any, i: number) => { x.sn = i + 1; return x });
      result = data
    })
  return result
}

export const UpdateStudentAttendanceApi = async (val: any) => {
  var result: any
  await fetch(`/api/student-attendance`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

export const StartStudentAttendancesApi = async (class_id: string, section_id: string, date: string) => {
  var result: any
  await fetch(`/api/student-attendance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ class_id, section_id, date })
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}


//=============== CLASSWORK =====================

export const GetAllClassWorkApi = async () => {
  var result: any
  await fetch(`/api/classwork`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      data.data = data.data.map((x: any, i: number) => { x.sn = i + 1; return x });
      result = data
    })
  return result
}

export const CreateUpdateClassWorkApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/classwork`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}
export const DelClassWorkApi: (arg0: string) => any = async (_id: string) => {
  var result: any
  await fetch(`/api/classwork?_id=${_id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

//=============== HOMEWORK =====================

export const GetAllHomeWorkApi = async () => {
  var result: any
  await fetch(`/api/homework`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      data.data = data.data.map((x: any, i: number) => { x.sn = i + 1; return x });
      result = data
    })
  return result
}

export const CreateUpdateHomeWorkApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/homework`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}
export const DelHomeWorkApi: (arg0: string) => any = async (_id: string) => {
  var result: any
  await fetch(`/api/homework?_id=${_id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

//=============== UPLOADS =====================


export const ImageUploadApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/upload`, {
    method: 'POST',
    body: val
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}



//=============== Media =====================

export const GetAllMediaApi = async () => {       // not used
  var result: any
  await fetch(`/api/media`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      //  data.data = data.data.map((x: any, i: number) => { x.date = new Date(x.date); return x });
      result = data
    })
  return result
}

export const CreateUpdateMediaApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}
export const GetSpecificMediaApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/media`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}


export const DelMediaApi: (arg0: string) => any = async (_id: string) => {
  var result: any
  await fetch(`/api/media?_id=${_id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}


//=============== Fee =====================
export const CupdateOrderedFeeApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/fee`, {
    method: "PATCH",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

export const GetAllFeeApi = async () => {
  var result: any
  await fetch(`/api/fee`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      result = data.data.sort((a: any, b: any) => a.order - b.order).map((x: any, i: number) => { x.sn = i + 1; return x });
    })
  return result
}

export const CreateUpdateFeeApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/fee`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}



export const DelFeeApi: (arg0: string) => any = async (_id: string) => {
  var result: any
  await fetch(`/api/fee?_id=${_id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

//=============== SECTION  FEE=====================

export const GetAllSectionFeeApi = async () => {
  var result: Array<any> = []
  await fetch(`/api/section-fee`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      let x = 1;
      data.data.map((cl: any, i: number) => {
        cl.section.map((sec: any, j: number) => {
          result.push({ _id: cl._id + sec._id, sn: x++, class_id: cl._id, class: cl.name, section_id: sec._id, section: sec.name, fee: sec.fee, expend: false })
        })
      });

    })
  return result
}

export const UpdateSectionFeePostApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/section-fee`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}



export const CreateUpdateSectionFeePatchApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/section-fee`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

//=============== STUDENT  FEE=====================

export const GetAllStudentFeeApi = async () => {
  var result: Array<any> = []
  await fetch(`/api/student-fee`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
        result =data.data; 
    })
  return result
}

//=============== STUDENT  FEE PAYMENT =====================  

export const CreateUpdateStudentFeePaymentApi: (arg0: any) => any = async (val: any) => {

  var result: any
  await fetch(`/api/student-fee-payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}
export const StudentFeePaymentListApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/student-fee-payment`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data.data })
  return result
}

//=============== STUDENT  FEE RECIPT ===================== 


export const CreateUpdateStudentFeeReciptApi: (arg0: any) => any = async (val: any) => {

  var result: any
  await fetch(`/api/student-fee-recipt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}
export const StudentFeeReciptListApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/student-fee-recipt`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data.data })
  return result
}


//=============== SETTING =====================

export const GetAllSettingApi = async () => {
  var result: any
  await fetch(`/api/setting`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      result = data.data
    })
  return result
}

export const CreateUpdateSettingApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/setting`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

//=============== exam-instruction =====================

export const GetAllExamInstructionApi = async () => {
  var result: any
  await fetch(`/api/exam-instruction`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      result = data.data
    })
  return result
}

export const CreateUpdateExamInstructionApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/exam-instruction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}


//=============== SECTION  SUBJECT=====================

export const GetAllSectionSubjectApi = async () => {
  var result: Array<any> = []
  await fetch(`/api/section-subject`, { method: "GET" })  // used for  exam api below also
    .then(response => response.json())
    .then(data => {
      let x = 1;
      data.data.map((cl: any, i: number) => {
        cl.section.map((sec: any, j: number) => {
               result.push({ _id: cl._id + sec._id, sn: x++, class_id: cl._id, class: cl.name, section_id: sec._id, section: sec.name, subjectList: sec.subjectList,same_syllabus_as_section_id:sec.same_syllabus_as_section_id, expend: false })
        })
      });

    })
  return result
}
export const GetAllLessonSubjectApi = async () => {
  var result: Array<any> = []
  await fetch(`/api/section-subject`, { method: "GET" })  // used for  exam api below also
  .then(response => response.json())
  .then(data => { result = data.data })
return result
}
export const GetAllSectionSubjectApiForExam = async () => {
  var result: Array<any> = []
  await fetch(`/api/section-subject`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      let x = 1;
      data.data.map((cl: any, i: number) => {
        cl.section.map((sec: any, j: number) => {
          result.push({ class: cl._id, section: sec._id,status:"Active", timeTable: sec.subjectList.map((sub:any)=>({
            subject_id:sub._id,
            subject:sub.name,
            optional:sub.optional,
            date:format(new Date(),"yyyy-MM-dd"),
            start_time:"10:00:00",
            end_time:"11:00:00",
            max_mark:"100",
            min_mark:"40",
            syllabus:"",
            question_paper:[]
            //  question_paper:[{question_id:"sss",marks: "100"}]
        })), expend: false })
        })
      });

    })
  return result
}
export const UpdateSectionSubjectPostApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/section-subject`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}


// export const GetSectionSubjectListApi: (arg0: any) => any = async (val: any) => {
//   console.log(val)
//   var result: any
//   await fetch(`/api/section-subject`, {
//     method: 'PATCH',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(val)
//   })
//     .then(response => response.json())
//     .then(data => { result = data.data })
//   return result
// } 

//=============== EXAM =====================


export const GetAllExamApi = async () => {
  var result: any
  await fetch(`/api/exam`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
        data = data.data.map((exam: any) => {
        exam.include= exam.include.map((cl:any)=>{ 
          const section=cl.class.section.find((sec:any)=>sec._id==cl.section);
          console.log("section",section)
          const same_syllabus_as_section_name=cl.class.section.find((sec:any)=>sec._id==section.same_syllabus_as_section_id)?.name;
          return {...cl,class:cl.class._id,class_name:cl.class.name,section:cl.section,section_name:section?.name,same_syllabus_as_section_id:section.same_syllabus_as_section_id,same_syllabus_as_section_name:same_syllabus_as_section_name}})
          return exam });
      result = data
    })
  return result
}

export const CreateUpdateExamApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/exam`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

// export const DelExamApi: (arg0: string) => any = async (_id: string) => {
//   var result: any
//   await fetch(`/api/exam?_id=${_id}`, { method: "DELETE" })
//     .then(response => response.json())
//     .then(data => { result = data })
//   return result
// }

export const UpdateExamTimetableApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/exam`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}


export const UpdateExamQuestionPaperApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/exam-question`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}
//=============== ROOM =====================

export const GetAllRoomApi = async () => {
  var result: any
  await fetch(`/api/room`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      data.data = data.data.map((x: any, i: number) => { x.sn = i + 1; return x });
      result = data.data
    })
  return result
}

export const CreateUpdateRoomApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/room`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}
export const DelRoomApi: (arg0: string) => any = async (_id: string) => {
  var result: any
  await fetch(`/api/room?_id=${_id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

//=============== SYLLABUS =====================
export const GetSyllabuForSectionApi :(arg0: string,arg1: string) => any = async (class_id: string,section_id: string) => {
  var result: any
  await fetch(`/api/lesson-syllabus?class_id=${class_id}&section_id=${section_id}`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      result = data.data;      
    })
  return result
}

export const UpdateLessonSyllabusApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/lesson-syllabus`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}
//=============== QUESTION =====================
export const GetLessonQuestionForSubjectApi :(arg0: string,arg1: string,arg2: string) => any = async (class_id: string,section_id: string,subject_id:string) => {
  var result: any
  await fetch(`/api/lesson-question?class_id=${class_id}&section_id=${section_id}&subject_id=${subject_id}`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      result = data.data;      
    })
  return result
}

export const UpdateLessonQuestionApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/lesson-question`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}
//=============== LESSON-PLAN =====================

export const GetAllLessonPlanApi = async () => {
  var result: any
  await fetch(`/api/lesson-plan`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      result = data.data.map((x: any, i: number) => { x.sn = i + 1; return x });      
    })
  return result
}

export const CreateUpdateLessonPlanApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/lesson-plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}


export const DelLessonPlanApi: (arg0: string) => any = async (_id: string) => {
  var result: any
  await fetch(`/api/lesson-plan?_id=${_id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

//=============== ExamMarks =====================
export const  GetExamMarksForApi :(arg0: string,arg1: string,arg2: string) => any = async (class_id: string,section_id: string,exam_id:string) => {
  var result: any
  await fetch(`/api/exam-marks?class_id=${class_id}&section_id=${section_id}&exam_id=${exam_id}`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      result = data.data;      
    })
  return result
}
export const StartExamMarksApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/exam-marks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

export const UpdateExamMarksApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/exam-marks`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}
export const UpdateExamSeatingApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/exam-seating`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

//=============== ExamMarksheet =====================
export const GetAllExamMarksheetApi = async (val:any) => {
  var result: any
  await fetch(`/api/exam-marksheet?include_in_marksheet=${val}`, { method: "GET" })
    .then(response => response.json())
    .then(data => {    result = data.data
    })
  return result
}

export const GetExamMarkSheetForStudentsApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/exam-marksheet`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data.data })
  return result
}

export const GetStudentAttendanceForExamMarkSheetApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/exam-marksheet`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data.data })
  return result
}
//=============== Employee Salary =====================


export const GetAllEmployeeSalaryApi = async (employee_id:string,running_year:string) => {
  var result: any
  await fetch(`/api/employee-salary?employee_id=${employee_id}&running_year=${running_year}`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      data.data = data.data.map((x: any, i: number) => { x.sn = i + 1; return x });
      result = data.data
    })
  return result
}

export const CreateUpdateEmployeeSalaryApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/employee-salary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

export const DelEmployeeSalaryApi: (arg0: string) => any = async (_id: string) => {
  var result: any
  await fetch(`/api/employee-salary?_id=${_id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

//=============== book ===================== 

export const GetAllBookApi = async () => {
  var result: any
  await fetch(`/api/book`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      data.data = data.data.map((x: any, i: number) => { x.sn = i + 1; return x });
      result = data.data;
    })
  return result
}

export const CreateBookApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

export const  UpdateBookApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/book`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

export const DelBookApi: (arg0: string) => any = async (_id: string) => {
  var result: any
  await fetch(`/api/book?_id=${_id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

//=============== Book Issue===================== 

export const GetAllBookIssueApi = async () => {
  var result: any
  await fetch(`/api/book-issue`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      const tempdata = [...data.empBookIssue,...data.stuBookIssue]
      result = tempdata.map((x: any, i: number) => { x.sn = i + 1; return x });
    })
  return result
}

export const CreateUpdateBookIssueApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/book-issue`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

export const DelBookIssueApi: (arg0: string) => any = async (_id: string) => {
  var result: any
  await fetch(`/api/book-issue?_id=${_id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

//=============== Transport Route =====================

export const GetAllRouteApi = async () => {
  var result: any
  await fetch(`/api/route`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      data.data = data.data.map((x: any, i: number) => { x.sn = i + 1; return x });
      result = data
    })
  return result
}

export const CreateUpdateRouteApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/route`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}
export const DelRouteApi: (arg0: string) => any = async (_id: string) => {
  var result: any
  await fetch(`/api/route?_id=${_id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

//=============== Transport Vehicle =====================

export const GetAllVehicleApi = async () => {
  var result: any
  await fetch(`/api/vehicle`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      data.data = data.data.map((x: any, i: number) => { x.sn = i + 1; return x });
      result = data
    })
  return result
}

export const CreateUpdateVehicleApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/vehicle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}
export const CreateUpdateMentinenceApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/vehicle`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}
export const DelVehicleApi: (arg0: string) => any = async (_id: string) => {
  var result: any
  await fetch(`/api/vehicle?_id=${_id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

//=============== Transport Driver =====================

export const GetAllDriverApi = async () => {
  var result: any
  await fetch(`/api/driver`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      data.data = data.data.map((x: any, i: number) => { x.sn = i + 1; return x });
      result = data
    })
  return result
}

export const CreateUpdateDriverApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/driver`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}
export const DelDriverApi: (arg0: string) => any = async (_id: string) => {
  var result: any
  await fetch(`/api/driver?_id=${_id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => { result = data })
  return result 
}

//=============== Transport Setting =====================

export const GetAllTransportSettingApi = async () => {
  var result: any
  await fetch(`/api/transport-setting`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      result = data.data
    })
  return result
}

export const CreateUpdateTransportSettingApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/transport-setting`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}
export const DelTransportSettingApi: (arg0: string) => any = async (_id: string) => {
  var result: any
  await fetch(`/api/transport-setting?_id=${_id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}

//=============== Transport Attendance =====================

export const GetAllTransportAttendanceApi = async () => {
  var result: any
  await fetch(`/api/transport-attendance`, { method: "GET" })
    .then(response => response.json())
    .then(data => {
      data.data = data.data.map((x: any, i: number) => { x.sn = i + 1; return x });
      result = data
    })
  return result
}

export const CreateUpdateTransportAttendanceApi: (arg0: any) => any = async (val: any) => {
  var result: any
  await fetch(`/api/transport-attendance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(val)
  })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}
export const DelTransportAttendanceApi: (arg0: string) => any = async (_id: string) => {
  var result: any
  await fetch(`/api/transport-attendance?_id=${_id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => { result = data })
  return result
}