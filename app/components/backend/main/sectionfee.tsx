"use client"
import React, { FC, } from 'react'
import { calculateLateFee, calculateTotalFee, feeDiscount, } from '../../shared/utils/helperfunction';
import { FeeType, MonthlyFeeType, } from '../../shared/model/feehelper'; 
import PdfIcon from '../../shared/Icons/pdf';
interface SectionFeeProps {
  fee_data: any;
  fee_recipt: any;
  stu: any;
  reciveDataTobeEdited: (option: MonthlyFeeType) => void
}
const SectionFee: FC<SectionFeeProps> = ({ fee_data,fee_recipt, stu, reciveDataTobeEdited }) => {
   const totalFee = calculateTotalFee(fee_data, stu.fee_discount)
  return (
    <>
      {fee_data.map((fe: FeeType, i: number) =>
        <tr key={i}>
          <td> </td>
          <td className='p-0 opacity-90 c-text-success' >  | </td>
          <td>{i + 1}</td>
          <td className='p-0 opacity-90 c-text-success' >  | </td>
          <td>{fe.title}</td>
          <td className='p-0 opacity-90 c-text-success' >  | </td>
          <td>{fe.last_date_of_collection}</td>
          <td className='p-0 opacity-90 c-text-success' >  | </td>
          <td>{fe.amount}</td>
          <td className='p-0 opacity-90 c-text-success' >  | </td>
          <td>{calculateLateFee(fe)}</td>
          <td className='p-0 opacity-90 c-text-success' >  | </td>
          <td>{feeDiscount(fe, stu)}  </td>
          <td className='p-0 opacity-90 c-text-success' >  | </td>
          {i == 0 && <td rowSpan={fee_data.length}>{totalFee}</td>}
          <td className='p-0 opacity-90 c-text-success' >  | </td>
          {i == 0 && <td rowSpan={fee_data.length} className=''>
            {fee_recipt.length ?
            <button type='button' className='btn-outline-light' onClick={() => {
              reciveDataTobeEdited({ type:"pdf", fee: fee_data })
            }}> <PdfIcon/> </button>:
            <button type='button' className='btn-outline-light' onClick={() => {
              stu.total_balance_amount - totalFee>0? reciveDataTobeEdited({type:"pay", fee: fee_data }):reciveDataTobeEdited({type:"add_balance", fee: fee_data })
            }}> Pay </button>
            }
          </td>}
        </tr>
      )}
    </>
  )
}
 

export default SectionFee;