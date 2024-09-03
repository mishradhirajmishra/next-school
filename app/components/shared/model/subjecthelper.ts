import * as yup from 'yup'
export const SubjectvalidationSchema = yup.object({
    name: yup.string().required("Name is required"),
})
export interface AllSubjectProps {
    newData: SubjectType,
    reciveDataTobeEdited: (option: SubjectType) => void
  }

export const Subjectinit = {
    _id: "",
    sn:0,
    name: "",
    optional:"No",
    slug: "",
    expend: false
}
export interface SubjectType {
    _id: string,
    sn: number,
    name: string; 
    optional:string;
    slug: string; 
    expend: boolean; 
}
export const subjectheadData = [
    { title: 'SN', field: 'sn', dataType: 'number', sortable: false, order: "", },
    { title: 'Name', field: 'name', dataType: 'string', sortable: false, order: "", className:'w-56' },
    { title: 'Optional', field: 'optional', dataType: 'string', sortable: false, order: "" },
    { title: 'Action', field: '', dataType: '', sortable: false, order: "",  },
];

