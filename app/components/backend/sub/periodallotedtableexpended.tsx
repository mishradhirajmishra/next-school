"use client"
import React, { FC} from 'react'
import {  PeriodAllotedTableProps, PeriodType } from '../../shared/model/classhelper';
import timelist from '../../shared/utils/timelist';
const allTimeoption = timelist  

const PeriodAllotedTableExpended: FC<PeriodAllotedTableProps> = ({period, data }) => {  
  return (
      <tr >
        <td>{period.sn}</td>
        <td>{period.name}</td>
        <td>{allTimeoption.find((x: any) => x.value == period.start_time)?.name} - {allTimeoption.find((x: any) => x.value == period.end_time)?.name}</td>
        <td className='p-0 opacity-90 c-text-success' >  | </td>
        <td className=' opacity-60 p-3'>Subject <br/> Class <br/> Section <br/> Room No</td>
        <td className='p-3'>{ data.find((x:any)=>x.day=="monday")?.subject}<br/> { data.find((x:any)=>x.day=="monday")?.class}<br/>  { data.find((x:any)=>x.day=="monday")?.section} <br/>  { data.find((x:any)=>x.day=="monday")?.room_no}</td>
        <td className='p-0 opacity-90 c-text-success' >  | </td>
        <td className=' opacity-60 p-3'>Subject <br/> Class <br/> Section <br/> Room No</td>
        <td className='p-3'>{ data.find((x:any)=>x.day=="tuesday")?.subject}<br/> { data.find((x:any)=>x.day=="tuesday")?.class}<br/>  { data.find((x:any)=>x.day=="tuesday")?.section} <br/>  { data.find((x:any)=>x.day=="tuesday")?.room_no}</td>
        <td className='p-0 opacity-90 c-text-success' >  | </td>
        <td className=' opacity-60 p-3'>Subject <br/> Class <br/> Section <br/> Room No</td>
        <td className='p-3'>{ data.find((x:any)=>x.day=="wednesday")?.subject}<br/> { data.find((x:any)=>x.day=="wednesday")?.class}<br/>  { data.find((x:any)=>x.day=="wednesday")?.section} <br/>  { data.find((x:any)=>x.day=="wednesday")?.room_no}</td>
        <td className='p-0 opacity-90 c-text-success' >  | </td>
        <td className=' opacity-60 p-3'>Subject <br/> Class <br/> Section <br/> Room No</td>
        <td className='p-3'>{ data.find((x:any)=>x.day=="thursday")?.subject}<br/> { data.find((x:any)=>x.day=="thursday")?.class}<br/>  { data.find((x:any)=>x.day=="thursday")?.section} <br/>  { data.find((x:any)=>x.day=="thursday")?.room_no}</td>
        <td className='p-0 opacity-90 c-text-success' >  | </td>
        <td className=' opacity-60 p-3'>Subject <br/> Class <br/> Section <br/> Room No</td>
        <td className='p-3'>{ data.find((x:any)=>x.day=="friday")?.subject}<br/> { data.find((x:any)=>x.day=="friday")?.class}<br/>  { data.find((x:any)=>x.day=="friday")?.section} <br/>  { data.find((x:any)=>x.day=="friday")?.room_no}</td>
        <td className='p-0 opacity-90 c-text-success' >  | </td>
        <td className=' opacity-60 p-3'>Subject <br/> Class <br/> Section <br/> Room No</td>
        <td className='p-3'>{ data.find((x:any)=>x.day=="saturday")?.subject}<br/> { data.find((x:any)=>x.day=="saturday")?.class}<br/>  { data.find((x:any)=>x.day=="saturday")?.section} <br/>  { data.find((x:any)=>x.day=="saturday")?.room_no}</td>
        </tr>
    )
}
export default PeriodAllotedTableExpended;