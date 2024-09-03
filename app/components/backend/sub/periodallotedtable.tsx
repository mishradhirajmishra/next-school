"use client"
import React, { FC} from 'react'
import {  PeriodAllotedTableProps, PeriodType } from '../../shared/model/classhelper';
import timelist from '../../shared/utils/timelist';
const allTimeoption = timelist 

const PeriodAllotedTable: FC<PeriodAllotedTableProps> = ({period, data }) => {  
  return (
      <tr >
        <td>{period.sn}</td>
        <td>{period.name}</td>
        <td>{allTimeoption.find((x: any) => x.value == period.start_time)?.name} - {allTimeoption.find((x: any) => x.value == period.end_time)?.name}</td>
        <td className='p-0 opacity-90 c-text-success' >  | </td> 
        <td className='p-3' colSpan={2}>{ data.find((x:any)=>x.day=="monday")?.subject}</td>
        <td className='p-0 opacity-90 c-text-success' >  | </td>
        <td className='p-3'  colSpan={2}>{ data.find((x:any)=>x.day=="tuesday")?.subject}</td>
        <td className='p-0 opacity-90 c-text-success' >  | </td>
        <td className='p-3'  colSpan={2}>{ data.find((x:any)=>x.day=="wednesday")?.subject}</td>
        <td className='p-0 opacity-90 c-text-success' >  | </td>
        <td className='p-3'  colSpan={2}>{ data.find((x:any)=>x.day=="thursday")?.subject}</td>
        <td className='p-0 opacity-90 c-text-success' >  | </td>
        <td className='p-3'  colSpan={2}>{ data.find((x:any)=>x.day=="friday")?.subject}</td>
        <td className='p-0 opacity-90 c-text-success' >  | </td>
        <td className='p-3'  colSpan={2}>{ data.find((x:any)=>x.day=="saturday")?.subject}</td>
        </tr>
    )
}

export default PeriodAllotedTable;