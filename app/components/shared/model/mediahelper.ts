 
export const Mediainit = {
    _id: "",
    sn: 0,
    related_student_id: "",   
    related_employee_id: "",   
    type: "",   
    height: 0,   
    width: 0,   
    file_name: "",     
    file_size: 0,     
    description : "",   
    showMediaPopup:0
}

export interface MediaType {
    _id: string,
    sn?: number,
    related_student_id: string,   
    related_employee_id: string,   
    type: string,   
    height: any,   
    width: any,   
    file_name: string,     
    file_size: any,     
    description : string,   
    showMediaPopup?:number
}




export const Fileinit = {
    url:"",   
    file:"",   
    file_name:"" 
}

export interface FileType {
    url:string,   
    file:any,   
    file_name: string, 
}


export const MediaheadData = [
    { title: 'SN', field: 'sn', dataType: 'number', sortable: false, order: "",className:'max-w-[10px]' },
    { title: 'Name', field: 'name', dataType: 'string', sortable: true, order: "" },
    { title: 'Action', field: '', dataType: '', sortable: false, order: "", className:"max-w-[30px]" },
];

