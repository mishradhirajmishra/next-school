"use client"
import React, { FC, useEffect, useState } from 'react'
import { format, subHours } from 'date-fns';
import EventCalendar from '../../shared/calendar/EventCalendar';
import { CreateLeaveApi, DelLeaveApi, GetAllLeveApi, HolidaysInIndiaApi } from '../../shared/utils/apis';
import { LeaveType, Leaveinitial } from '../../shared/model/eventhelper';
import Swall from '../../shared/utils/swal';
const initialValue = Leaveinitial
interface LeavecalendarProps {
  newData: any,
  reciveDataTobeEdited: (option: any) => void
}
const Leavecalendar: FC<LeavecalendarProps> = ({ newData, reciveDataTobeEdited }) => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [leaves, setleaves] = useState<Array<LeaveType>>([initialValue])
  const [leavesGoogle, setleavesGoogle] = useState<Array<LeaveType>>([initialValue])
  const [data, setdata] = useState<Array<LeaveType>>([initialValue])
  const [show, setshow] = useState("local")

  useEffect(() => { if (leaves.length = 1) { getLeaves(false) } }, [newData])
  const getLeaves = async (con: boolean) => {
    let data = await GetAllLeveApi()
    setleaves(data.data);
    if (con) { setdata([...leavesGoogle, ...data.data]); setshow("both") } else { setdata(data.data) }
  }
  const deleteEvent = async (_id: string) => {
    let data = await DelLeaveApi(_id)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    getLeaves(true)
  }
  const createEvent = async (val: any) => { 
    if (leaves.find(x => ( x.title == val.title && format(new Date(x.date), 'yyyy-MM-dd') == val.date ))) {
      seAlertData({ showSwall: Math.random(), className: "error", message: "Duplicate entry not allowed" })
    } else {
      let data = await CreateLeaveApi([val])
      seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
      getLeaves(true)
    }
  }

  useEffect(() => { if (leaves.length = 1) { getLeavesFromGoogle() } }, [newData])
  const getLeavesFromGoogle = async () => {
    let data = await HolidaysInIndiaApi()
    setleavesGoogle(data);
  }

  const newFromGoogleEvent = async (val: any) => {
    createEvent({ date: format(val.date, 'yyyy-MM-dd'), title: val.title, type: "leave" })
  }

  const showEvent = (val: any) => { reciveDataTobeEdited({ type: "exist", data: val }) }
  const newEvent = (val: any) => { reciveDataTobeEdited({ type: "new", data: val }) }

  return (
    <>
      <Swall swallData={alertData} />
      <span className='absolute top-14 right-4 gap-1 flex'>
        <button onClick={() => { setshow("local"); setdata([...leaves]) }} className={`${show == "local" ? "btn-outline-success" : "btn-outline-light"} py-0`}  >Local </button>
        <button onClick={() => { setshow("google"); setdata([...leavesGoogle]) }} className={`${show == "google" ? "btn-outline-success" : "btn-outline-light"} py-0`}  >Google </button>
        <button onClick={() => { setshow("both"); setdata([...leavesGoogle, ...leaves]) }} className={`${show == "both" ? "btn-outline-success" : "btn-outline-light"} py-0`} >both </button>
      </span>
      <EventCalendar deleteEvent={deleteEvent} events={data} showEvent={showEvent} newEvent={newEvent} newFromGoogleEvent={newFromGoogleEvent} />

    </>
  )
}

export default Leavecalendar;