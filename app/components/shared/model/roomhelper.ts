import * as yup from 'yup'
export const RoomvalidationSchema = yup.object({
    name: yup.string().required("Name is required"),
})
export interface AllRoomProps {
    newData: RoomType,
    reciveDataTobeEdited: (option: RoomType) => void
  }

export const Roominit = {
    _id: "",
    sn:0,
    name: "",     
    type:  "Class Room",  
    seat_capcity: 50, 
}
export interface RoomType {
    _id: string,
    sn: number,
    name: string,     
    type:  string,  
    seat_capcity: number, 
}
export const roomheadData = [
    { title: 'SN', field: 'sn', dataType: 'number', sortable: false, order: "", },
    { title: 'Name', field: 'name', dataType: 'string', sortable: false, order: "", className:'w-56' },
    { title: 'Type', field: 'type', dataType: 'string', sortable: false, order: "" },
    { title: 'Seating Capcity', field: 'seat_capcity', dataType: 'string', sortable: false, order: "" },
    { title: 'Action', field: '', dataType: '', sortable: false, order: "",  },
];

