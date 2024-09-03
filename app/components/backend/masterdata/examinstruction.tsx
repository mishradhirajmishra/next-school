"use client"
import React, { FC, useEffect, useState } from 'react'
import { GetAllExamInstructionApi } from '../../shared/utils/apis';
import EditIcon from '../../shared/Icons/edit';
import { ExamInstructionType, examInstructionInit } from '../../shared/model/examhelper';

interface SettingProps {
  newData: any,
  reciveDataTobeEdited: (option: ExamInstructionType) => void
}

const ExamInstruction: FC<SettingProps> = ({ newData, reciveDataTobeEdited }) => {
  const [row, setrow] = useState<ExamInstructionType>(examInstructionInit)
  useEffect(() => { GetAllExamInstruction() }, [newData])
  useEffect(() => { GetAllExamInstruction() }, [])
  const GetAllExamInstruction = async () => {
    let data = await GetAllExamInstructionApi()
    setrow(data);
  }

  return (
    <>
      <div className="mt-5 relative   overflow-x-auto pb-5:">
        <h1 className='c-text-dark font-bold text-lg'>{row?.title}
        <button type='button' className='btn-outline-light p-1 ml-5 ' onClick={() => { reciveDataTobeEdited(row) }}><EditIcon /></button></h1> 
        <table className='w-8/12 mt-8'>
          <tbody>
            {row && row.instructions && row.instructions.length && row.instructions.map((x: any, i: number) =>
              <tr key={i}>
                <td>{i + 1} - </td>
                <td className='whitespace-normal'>{x.title}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ExamInstruction;