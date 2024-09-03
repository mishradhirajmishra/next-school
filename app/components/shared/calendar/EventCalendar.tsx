"use client"
import React, { FC, useState } from 'react'
import { format, getYear, startOfMonth, subWeeks, addWeeks, addMonths, subMonths, startOfWeek, getWeek, lightFormat } from 'date-fns';
import { WeeklyCalendar, DefaultWeeklyEventItem, WeeklyBody, WeeklyContainer, WeeklyDays, DefaultMonthlyEventItem, MonthlyBody, MonthlyCalendar, MonthlyDay, } from '@zach.codes/react-calendar';
// import '../../../calendar.css'
import ExpendIcon from '../Icons/expend';
import PlusIcon from '../Icons/plus';
import DeleteIcon from '../Icons/delete';

interface EventCalendarProps {
  events: Array<any>;
  newEvent: (option: any) => void;
  showEvent: (option: any) => void;
  newFromGoogleEvent: (option: any) => void;
  deleteEvent: (option: any) => void;
}

const EventCalendar: FC<EventCalendarProps> = ({ events,newFromGoogleEvent, newEvent, showEvent,deleteEvent }) => {
  let [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
  const [mode, setMode] = useState('month');

  const handleNavMonth = (value: any) => {
    value == 'prev' ? setCurrentMonth(subMonths(currentMonth, 1)) : setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleNavWeek = (value: any) => {
    if (value == 'prev') {
      setCurrentWeek(subWeeks(currentWeek, 1));
      setCurrentMonth(startOfMonth(subWeeks(currentWeek, 1)));
    } else {
      setCurrentWeek(addWeeks(currentWeek, 1));
      setCurrentMonth(startOfMonth(addWeeks(currentWeek, 1)));
    }
  };
  const startNewEvent = (date: any) => {
    if (date != "Invalid Date") {
      const fDate = new Date(date.toString().split('GMT')[0] + ' UTC').toISOString().split('T')[0];
      newEvent(fDate)
    }
  }

  return (
    <>
      <div className='flex justify-between mb-5 mt-5'>
        <span>
          <button onClick={() => { mode == 'month' ? handleNavMonth("prev") : handleNavWeek("prev") }} className='btn-outline-light mr-3 py-0' value="prev"><ExpendIcon className='rotate-180 fill-svg-dark hover:fill-svg-success' /></button>
          <button onClick={() => { mode == 'month' ? handleNavMonth("next") : handleNavWeek("next") }} className='btn-outline-light py-0' value="next"><ExpendIcon className='fill-svg-dark hover:fill-svg-success' /></button>
        </span>

        <span className='capitalize c-text-gradient  text-2xl font-bold'>
          {format(currentMonth, getYear(currentMonth) === getYear(new Date()) ? 'LLLL' : 'LLLL yyyy')  }
          </span>
      

        <span>
          {mode == 'week' ?
            <button onClick={() => { setMode("month") }} className='btn-outline-light py-0' value="month">Month</button> :
            <button onClick={() => { setMode("week") }} className='btn-outline-light py-0' value="week">Week</button>}
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
              events={events.map((x: any, i: number) => { x.date = new Date(x.date); return x })}
            >
              <span className='date-wrap' onClick={(e: any) => {
                let target = (e.target) ? e.target : e.srcElement;
                if (target && target.firstChild && target.firstChild.firstChild && target.firstChild.firstChild.innerHTML) {
                  let day = target.firstChild.firstChild.innerHTML;
                  let date = new Date(currentMonth);
                  date.setDate(day)
                  startNewEvent(date)
                }
              }
              }>
                <MonthlyDay<any>
                  renderDay={data =>
                    data.map((item, index) => (
                      <span className={`${item.class} cursor-pointer c-text-success-hover`} key={index} onClick={() => { showEvent(item) }}>
                        <DefaultMonthlyEventItem                 
                          title={item.title}            
                          date={format(item.date, '-')}
                        />
                  
                      </span>
                    ))
                  }
                />

              </span>

            </MonthlyBody>
          </MonthlyCalendar>
        </div>

      }
      {mode == 'week' &&
      
        <div className='cust-cal'>
          <WeeklyCalendar week={currentWeek}>
            <WeeklyContainer>
              <WeeklyDays />
              <WeeklyBody
                events={events.map((x: any, i: number) => { x.date = new Date(x.date); return x })}
                renderItem={({ item, showingFullWeek }) => (
                  <span  key={item.date.toISOString()} className='flex '>
                    <span className={`${item.class} ${item.type=="leave"?"cursor-pointer c-text-success-hover":""}`} onClick={() => { if(item.type=="leave"){ showEvent(item)} }}>
                      <DefaultWeeklyEventItem
                        key={item.date.toISOString()}
                        title={item.title}
                        date={
                          showingFullWeek
                            ? format(item.date, 'MMM do')
                            : format(item.date, 'k:mm')
                        }
                      />  
                    </span>
                    {item.type=="google" &&  <button onClick={()=>{newFromGoogleEvent(item)}}  className='ml-5  btn-link-success py-0 whitespace-nowrap self-center gap-0 pl-1 pr-3'><PlusIcon className='fill-svg-success'/> to Local</button>}
                    {item.type=="leave" &&  <button onClick={()=>{deleteEvent(item._id)}}  className='ml-5  btn-link-error py-0 whitespace-nowrap self-center gap-1 pl-2 pr-3'><DeleteIcon className='fill-svg-error'/> Delete</button>}
                  </span>
                )}
              />
            </WeeklyContainer>
          </WeeklyCalendar>
        </div>
      }
    </>
  );
};


export default EventCalendar;