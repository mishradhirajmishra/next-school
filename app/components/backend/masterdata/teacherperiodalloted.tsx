"use client"
import React, { FC, useEffect, useState } from 'react'
import {GetAllPeriodMasterApi, GetTeacherPeriodAllotedApi } from '../../shared/utils/apis';
import { PeriodPreviewType, PeriodPreviewinitial, PeriodType, Periodinitial } from '../../shared/model/classhelper';
import CloseFullIcon from '../../shared/Icons/closefull';
import OpenFullIcon from '../../shared/Icons/openfull';
import { useSession } from 'next-auth/react';
import PeriodAllotedTableExpended from '../sub/periodallotedtableexpended';

const TeacherPeriodAlloted: FC = () => {
  const { data: session, status } = useSession()
  const [period, setPeriods] = useState<Array<PeriodType>>([Periodinitial])
  const [rows, setrows] = useState<Array<PeriodPreviewType>>([PeriodPreviewinitial])
  const [expend, setExpend] = useState(false);

  useEffect(() => { getPeriod() }, [])
  const getPeriod = async () => {
    let data = await GetAllPeriodMasterApi()
    setPeriods(data.data);
  }

  useEffect(() => { GetTeacherPeriodAlloted() }, [])
  const GetTeacherPeriodAlloted = async () => {
    let data = await GetTeacherPeriodAllotedApi()
    console.log("eeeee", data)
    setrows(data);
  }

  return (
    <>
      <div className="mt-5 relative   overflow-x-auto pb-5">
        {session && rows.length && <tr className='fade-in nested'>
          <td className='py-3' colSpan={7} >
            <span className='flex justify-center items-center'>
              <table>
                <thead>
                <tr>
                    <th className=' opacity-60' >SN </th>
                    <th className=' opacity-60' > Period  </th>
                    <th className=' opacity-60' >   Time  </th>
                    <th className='p-0 opacity-90 c-text-error ' >  | </th>
                    <th className=' opacity-60 ' colSpan={2}>  Monday  </th>
                    <th className='p-0 opacity-90 c-text-error ' >  | </th>
                    <th className=' opacity-60 ' colSpan={2}>  Tuesday  </th>
                    <th className='p-0 opacity-90 c-text-error ' >  | </th>
                    <th className=' opacity-60 ' colSpan={2}>  Wednesday  </th>
                    <th className='p-0 opacity-90 c-text-error ' >  | </th>
                    <th className=' opacity-60 ' colSpan={2}>  Thursday  </th>
                    <th className='p-0 opacity-90 c-text-error ' >  | </th>
                    <th className=' opacity-60 ' colSpan={2}>  Friday  </th>
                    <th className='p-0 opacity-90 c-text-error ' >  | </th>
                    <th className=' opacity-60 ' colSpan={2}>  Saturday  </th>
                    <th className='text-center pl-4'>
                      {expend ?
                        <button type='button' className='btn-outline-light p-1 mr-3 ' onClick={() => { setExpend(false) }} > <CloseFullIcon /></button> :
                        <button type='button' className='btn-outline-light p-1 mr-3 ' onClick={() => { setExpend(true) }}> <OpenFullIcon /></button>
                      }
                    </th>
                  </tr>
                </thead>
                {period && period.length && period.map((pr: any, i: number) =>
                  <tbody key={i}>
                    {expend ?
                      <PeriodAllotedTableExpended period={pr} data={rows.filter((pralot) => (pralot.teacher == session.user._id && pralot.start_time == pr.start_time && pralot.end_time == pr.end_time))} /> :
                      <PeriodAllotedTableExpended period={pr} data={rows.filter((pralot) => (pralot.teacher == session.user._id && pralot.start_time == pr.start_time && pralot.end_time == pr.end_time))} />}
                  </tbody>
                )}
              </table>
            </span>
          </td>
        </tr>
        }
      </div>
    </>
  )
}




export default TeacherPeriodAlloted;