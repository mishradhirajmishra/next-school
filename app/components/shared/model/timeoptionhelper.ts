
export const SelectOptioninit = {
    _id: "",
    sn:0,
    name: "",
    status: false,
    value: "",
    hide: false,
}
export interface SelectOptionType {
    _id: string,
    sn: number,
    name: string;
    status: boolean;
    value: string;
    hide: boolean;
}
export const timeOptionheadData = [
    { title: 'SN', field: 'sn', dataType: 'number', sortable: false, order: "",className:'max-w-[500px]' },
    { title: 'Name', field: 'name', dataType: 'string', sortable: true, order: "" },
    { title: 'Action', field: '', dataType: '', sortable: false, order: "", className:"max-w-[100px]" },
];

