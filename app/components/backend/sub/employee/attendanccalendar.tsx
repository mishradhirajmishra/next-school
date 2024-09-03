"use client"
import React, { FC, useEffect, useState } from 'react'

import timelist from '../../../shared/utils/timelist';
import IMGR from '../../../shared/images/imgr';
import { GetEmployeeAttendancesSummaryApi } from '@/app/components/shared/utils/apis';
import { Expendrow, getRunningYear } from '@/app/components/shared/utils/helperfunction';
import MonthList from '@/app/components/shared/utils/monthlist';
import ExpendIcon from '@/app/components/shared/Icons/expend';
import { DefaultMonthlyEventItem, MonthlyBody, MonthlyCalendar, MonthlyDay } from '@zach.codes/react-calendar';
import { format, startOfMonth } from 'date-fns';
const allTimeoption = timelist
export interface AttendanceCalendarProps {
  attendance: any,
}
const AttendanceCalendar: FC<AttendanceCalendarProps> = ({ attendance }) => {
  let [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date(attendance[0].createdAt)));
 


  return (
    <div className='cust-cal'>
    <MonthlyCalendar
      currentMonth={currentMonth}
      onCurrentMonthChange={date => setCurrentMonth(date)}
    >
      {/* <MonthlyNav /> */}
      <MonthlyBody
        events={attendance.map((x: any, i: number) => { x.date = new Date(x.createdAt); return x })}
      >
        <span className='date-wrap' >
          <MonthlyDay<any>
            renderDay={data =>
              data.map((item, index) => (
                <span className={`attendance-${item.attendance}`} key={index} >
          
                  <DefaultMonthlyEventItem                 
                    title={item?.attendance }            
                    date={"-( "+item?.duration+" ) "}
                  />     
                  <span className={`leave-${item?.leave_type}`}> {item?.leave_type}</span>       
                </span>
              ))
            }
          />

        </span>

      </MonthlyBody>
    </MonthlyCalendar>
  </div>

    // <>{JSON.stringify(attendance)}</>
  )
}

export default AttendanceCalendar;