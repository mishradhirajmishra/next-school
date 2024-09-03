"use client"
import React, { FC} from 'react'
 
import timelist from '../../../shared/utils/timelist';
import IMGR from '../../../shared/images/imgr';
const allTimeoption = timelist 
export interface EmployeeDetailTableProps {
  emp: any,
}

const EmployeeDetailTable: FC<EmployeeDetailTableProps> = ({emp}) => {  
  return (
    <table>
    <tbody>
      <tr className='w-14'>
        <td rowSpan={2}   >
          <span className='flex justify-center items-center relative h-32 w-auto'>
            <IMGR  src={emp.profile_image} alt='profile image ' />
          </span>
        </td>
        <td className='w-48'><label className="c-form-label">Email</label> <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{emp.email} </span> </td>
         </tr>
      <tr className='w-14'>
          <td>
            <label className="c-form-label">Mobile</label> 
          <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{emp.mobile} </span> 
           </td>
            </tr>

      <tr className='w-14'>
        <td><label className="c-form-label">Employee Id</label> <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{emp.emp_id} </span>  </td>
        <td><label className="c-form-label">Gender</label> <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{emp.gender} </span>  </td>
      </tr>

      <tr className='w-14'>
        <td><label className="c-form-label">Registration No</label> <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{emp.reg_no}  </span>  </td>
        <td><label className="c-form-label">Date of Birth</label> <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{emp.dob} </span>  </td>
      </tr>
      <tr className='w-14'>
      <td><label className="c-form-label">Addhar No</label> <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{emp.addhar_no} </span>  </td>
        <td><label className="c-form-label">Join Date</label> <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{emp.join_date}  </span>  </td>

      </tr>

      <tr className='w-14'>
        <td colSpan={2}><label className="c-form-label">Intresrted Subjects</label> <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{emp.intresrted_subject.map((x:any) => <span key={x}>{x}, </span>)}</span>  </td>

      </tr>
      <tr className='w-14'>
        <td colSpan={2}><label className="c-form-label">Related To</label> <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{emp.related_to.map((x:any) => <span key={x}>{x}, </span>)}</span>  </td>

      </tr>
    </tbody>
  </table>
    )
}

export default EmployeeDetailTable;