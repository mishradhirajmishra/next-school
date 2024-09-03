"use client"
import { FC, useEffect, useState } from "react"
import { GetTeacherPeriodAllotedApi } from "../../shared/utils/apis";
import TableHeader from "../../shared/table/tableheader";
import { PeriodPreviewType, PeriodPreviewinitial, periodPreviewheadData } from "../../shared/model/classhelper";

interface PeriodallotmentpreviewProp {
  selectedTeacher: Array<string>
  start_time: string
  end_time: string
  teacherList: Array<any>
}

const Periodallotmentpreview: FC<PeriodallotmentpreviewProp> = ({ start_time, end_time, selectedTeacher, teacherList }) => {
  const [rows, setRows] = useState<Array<PeriodPreviewType>>([PeriodPreviewinitial])
  useEffect(() => {
    if (teacherList.length > 0) {
      GetPeriodTeacherAllotedList();
    }
  }, [teacherList])
  const GetPeriodTeacherAllotedList = async () => {
    let data = await GetTeacherPeriodAllotedApi();
    setRows(data.filter((x: PeriodPreviewType) => (x.start_time == start_time && x.end_time == end_time && x.teacher == selectedTeacher.find((y) => y == x.teacher))))
  }
  return (

    <div className="mt-5 relative   overflow-x-auto pb-5">
      {rows && rows.length ? <>
        <table >
          <thead>
            <TableHeader theadData={periodPreviewheadData} rows={rows} updateRows={(val) => { setRows(val) }} />
          </thead>
          <tbody>
            {rows.map((row: PeriodPreviewType,i:number) => <tr key={i}>
              <td>{row.class}</td>
              <td>{row.section}</td>
              <td>{row.period}</td>
              <td>{row.day}</td>
              <td>{teacherList && teacherList.length && teacherList.find(x => x._id == row.teacher)?.name}</td>
              <td><button className="btn-outline-error">Alloted</button></td>
            </tr>)}
          </tbody>
        </table>
      </> : <></>}

    </div>
  )
}




export default Periodallotmentpreview;