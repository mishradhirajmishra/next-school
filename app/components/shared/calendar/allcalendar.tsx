"use client"
import React, { FC, useState } from 'react'
 
import { format, subHours, getYear, startOfMonth, subWeeks, addWeeks, addMonths, subMonths, startOfWeek, getWeek, lightFormat } from 'date-fns';
import {
  WeeklyCalendar,
  DefaultWeeklyEventItem,
  WeeklyBody,
  WeeklyContainer,
  WeeklyDays,
  DefaultMonthlyEventItem,
  MonthlyBody,
  MonthlyCalendar,
  MonthlyDay,
} from '@zach.codes/react-calendar';
// import '../../../../app/calendar.css'
interface AllCalendarProps {

}

const AllCalendar: FC<AllCalendarProps> = ({ }) => {

  let [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
  const [mode, setMode] = useState('month');
  const [rows, setRows] = useState([]);
  const [rowsApp, setRowsApp] = useState([]);
  const [nav, setNav] = useState('prev');

  const handleMode = (value: any) => { setMode(value); };


  const handleNav = (value: any) => {
    setNav(value);
    if (value == 'prev') {
      if (mode == 'month') {
        setCurrentMonth(subMonths(currentMonth, 1));
      } else {
        setCurrentWeek(subWeeks(currentWeek, 1));
        setCurrentMonth(startOfMonth(subWeeks(currentWeek, 1)));
      }
    } else {
      if (mode == 'month') {
        setCurrentMonth(addMonths(currentMonth, 1));
      } else {
        setCurrentWeek(addWeeks(currentWeek, 1));
        setCurrentMonth(startOfMonth(addWeeks(currentWeek, 1)));
      }
    }
  };

  return (
    <>
      <div className='flex justify-between mb-5 mt-5'>
        <span>
          <button onClick={() => { handleNav("prev") }} className='btn-outline-light' value="prev">prev</button>

          <button onClick={() => { handleNav("next") }} className='btn-outline-light' value="next">next</button>
        </span>
        <span className='month-day'>{format(currentMonth, getYear(currentMonth) === getYear(new Date()) ? 'LLLL' : 'LLLL yyyy')
        }</span>
        <span>
          <button onClick={() => { handleMode("month") }} className='btn-outline-light' value="month">Month</button>
          <button onClick={() => { handleMode("week") }} className='btn-outline-light' value="week">Week</button>
        </span>
      </div>


      {mode == 'month' &&
        <div className='cust-cal'>
          <MonthlyCalendar
            currentMonth={currentMonth}
            onCurrentMonthChange={date => setCurrentMonth(date)}
          >
            {/* <MonthlyNav /> */}
            <MonthlyBody
              events={[
                { title: 'Call John', date: subHours(new Date(), 2) },
                { title: 'Call John', date: subHours(new Date(), 1) },
                { title: 'Meeting with Bob', date: new Date() },
              ]}
            >
              <MonthlyDay<any>
                renderDay={data =>
                  data.map((item, index) => (
                    <DefaultMonthlyEventItem
                      key={index}
                      title={item.title}
                      // Format the date here to be in the format you prefer
                      date={format(item.date, 'k:mm')}
                    />
                  ))
                }
              />
            </MonthlyBody>
          </MonthlyCalendar>
        </div>
      }
      {mode == 'week' &&
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
      }
    </>
  );
};



export default AllCalendar;