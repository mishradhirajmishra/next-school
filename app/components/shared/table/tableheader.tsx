import React, { FC, useState } from 'react'
import UpDownArrowIcon from '../Icons/updownarrow';
import UpDownArrowActiveIcon from '../Icons/updownarrowactive';
interface TableHeaderOps {
    title: string,
    field: string,
    dataType?: string,
    sortable?: boolean,
    order?: string,
    className?: string
}

interface TableHeaderProps {
    theadData: Array<TableHeaderOps>
    rows: Array<any>
    updateRows: (rows: Array<any>) => void
    className?: string
}
const TableHeader: FC<TableHeaderProps> = ({ theadData, rows, updateRows,className }) => {
    const [theadOption, settheadOption] = useState<Array<TableHeaderOps>>(theadData)

    const sortTable = (val: TableHeaderOps, i: number) => {
        if (val.sortable) {
            if (val.order?.toLowerCase() == 'asc') {
                settheadOption([...theadOption.map(x => { if (x.field == val.field) { x.order = "dsc" } else { x.order = "" } return x })])
                if(val.dataType?.toLowerCase() == 'date'){
                    
                    updateRows([...rows].sort((a,b)=>new Date(a.field).getTime()-new Date(b.field).getTime()));
                }else{
                    updateRows([...rows].sort((a, b) => a[val.field] > b[val.field] ? 1 : -1));
                }
                updateRows([...rows].sort((a, b) => a[val.field] > b[val.field] ? 1 : -1));
            } else {
                settheadOption([...theadOption.map(x => { if (x.field == val.field) { x.order = "asc" } else { x.order = "" } return x })])
                if(val.dataType?.toLowerCase() == 'date'){
                    updateRows([...rows].sort((a,b)=>new Date(b.field).getTime()-new Date(a.field).getTime()));
                }else{
                    updateRows([...rows].sort((a, b) => a[val.field] < b[val.field] ? 1 : -1));    
                }
                
            }
        }
    }
    // tempData=tempData.sort((a,b)=>{ return new Date(b.instalment.payment_date) - new Date(a.instalment.payment_date)})
    return (
     
            <tr className={className}>
                {theadOption && theadOption.length > 0 && theadOption.map((th, i) =>
                    <th onClick={() => { sortTable(th, i) }}
                        key={i} className={`${th.sortable ? "cursor-pointer" : ""} ${th.className}`}>
                        <span className={`flex items-center`}>{th.title}
                            {th.sortable && <>
                                {th.order == "" && <UpDownArrowIcon />}
                                {th.order == "asc" && <UpDownArrowActiveIcon className='-rotate-90 c-text-success' />}
                                {th.order == "dsc" && <UpDownArrowActiveIcon className='rotate-90 c-text-success' />}
                            </>}
                        </span>
                    </th>)}
            </tr>
     
    )
}

export default TableHeader;