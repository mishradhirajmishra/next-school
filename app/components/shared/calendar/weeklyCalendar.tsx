"use client"
import React, { FC, useState } from 'react'
import { format, subHours, startOfMonth } from 'date-fns';
//  import '../../../../app/calendar.css'
import {
  WeeklyCalendar,
  DefaultWeeklyEventItem,
  WeeklyBody,
  WeeklyContainer,
  WeeklyDays,
} from '@zach.codes/react-calendar';

interface WeekCalendarProps {
  
}

const WeekCalendar: FC<WeekCalendarProps> = ({  }) => {
  let [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(new Date())
  );
  return (
    <div className='cust-cal'>
 <WeeklyCalendar week={new Date()}>
  <WeeklyContainer>
    <WeeklyDays />
    
    <WeeklyBody
      events={[{ title: 'Jane doe', date: new Date() }]}
      renderItem={({ item, showingFullWeek }) => (
        <DefaultWeeklyEventItem
          key={item.date.toISOString()}
          title={item.title}
          date={
            showingFullWeek
              ? format(item.date, 'MMM do k:mm')
              : format(item.date, 'k:mm')
          }
        />
      )}
    />
  </WeeklyContainer>
</WeeklyCalendar>
    </div>
  )
}


export default WeekCalendar;