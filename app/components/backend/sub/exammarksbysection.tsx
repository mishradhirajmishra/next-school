"use client"
import React, { FC, useEffect, useState } from 'react'
import { GetExamMarksForApi, GetSpecificStudentsListApi, StartExamMarksApi, UpdateExamMarksApi } from '../../shared/utils/apis';
import { StudentType, Studentinitial } from '../../shared/model/studenthelper';
import { ExamMarksType, TimeTableType, examMarksInit } from '../../shared/model/examhelper';
import NumberField from '../../shared/forms-elements/numberfield-html';
import { getRunningYear } from '../../shared/utils/helperfunction';
import Swall from '../../shared/utils/swal';


interface ExamMarksBysectionProp {
  exam_id: string, class_id: string, section_id: string, timeTable: any, start: any
}

const ExamMarksBysection: FC<ExamMarksBysectionProp> = ({ exam_id, class_id, section_id, timeTable, start }) => {
  const [rows, setrows] = useState<Array<StudentType>>([Studentinitial])
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [marks, setMarks] = useState<Array<ExamMarksType>>([examMarksInit])
  const [marksBacup, setmarksBacup] = useState<Array<ExamMarksType>>([examMarksInit])
  useEffect(() => { getSpecificStudents(); GetExamMarks(); setMarks([examMarksInit]) }, [start])
  const getSpecificStudents = async () => {
    let param = { class: class_id, section: section_id }
    let studentList = await GetSpecificStudentsListApi(param);
    setrows(studentList)
  }
  const GetExamMarks = async () => {
    let examMarks = await GetExamMarksForApi(class_id, section_id, exam_id);
    console.log("examMarks", examMarks);
    setMarks(JSON.parse(JSON.stringify(examMarks)));setmarksBacup(JSON.parse(JSON.stringify(examMarks)))
  }

  const GenerateExamMarks = async () => {
    console.log(marks);
    if (marks == null || marks.length == 0) {
      const emarks = {
        exam: exam_id,
        class: class_id,
        section: section_id,
        subject: "",
        student: "",
        marks: "50",
        running_year: getRunningYear()
      }
      let body: any = []
      timeTable.map((tt: TimeTableType, k: number) => {
        rows.map((stu, i) => { body.push({ ...emarks, student: stu._id, subject: tt.subject_id }) })
      })
      if (rows.length * timeTable.length == body.length) {
        let data = await StartExamMarksApi(body)
        setMarks(data.data)
        seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
      }
    }
  }

 const    UpdateExamMarks= async(newMarks:any)=>{
  let data = await UpdateExamMarksApi(newMarks)
  seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
 }
  return (
    <>


      {rows && rows.length ?
        <>
                <Swall swallData={alertData} />
          {(marks == null || marks.length == 0) ? <>
    
            <table className='w-full'>
          <tbody>
         <tr><td className='text-center'><button className="btn-outline-success py-0 " type="button" onClick={() => { GenerateExamMarks() }}>Generate Exam Marks</button></td></tr>
         </tbody>
         </table>
            
          </>
            : <>
              <table>
                <tbody>
                  {rows && rows.map((stu: any, i: number) => <tr key={i}>
                    <td className='min-w-14 max-w-14 w-14 '> </td>
                    <td className='min-w-14 max-w-14 w-14 '>{i + 1}</td>
                    <td className=' min-w-56 max-w-56 w-56 '>
                      <label className='c-form-label mb-0 text-wrap'>Student : <span className='c-text-success'>{stu.name}</span></label>
                     <label className='c-form-label mb-0'>Roll No :  <span className='c-text-success'>{stu.roll_no}</span></label>
                     <label className='c-form-label mb-0 text-wrap'>Guardian :  <span className='c-text-success'>{stu.guardian.name}</span></label>
                      </td>           
                      <td className=' opacity-90 c-text-success min-w-0 max-w-0 w-0 pl-0 pr-1' >  | </td>
                    {timeTable.length && timeTable.map((tt: TimeTableType, j: number) => {
                      let value = marks.find((mrks: ExamMarksType) => (mrks.student == stu._id && mrks.subject == tt.subject_id));
                      return (<td key={j} className='min-w-32 max-w-32 w-32'>
                        {value != undefined &&
                          <NumberField hideLabel={true} value={value?.marks} label={tt.subject} name={value._id} errors={+value?.marks < +tt.min_mark || +value?.marks > +tt.max_mark  } touched={true}
                            onChange={(e: any) => { setMarks(marks.map((m: any) => { if (m._id == value?._id) { m.marks = e.target.value; return m } else { return m } })) }}
                            onBlur={(e: any) => {
                              let oldMarks=marksBacup.find((mrks: ExamMarksType) => (mrks.student == stu._id && mrks.subject == tt.subject_id));
                              let newMarks=marks.find((mrks: ExamMarksType) => (mrks.student == stu._id && mrks.subject == tt.subject_id));
                              if(oldMarks?.marks !== newMarks?.marks){
                                  UpdateExamMarks(newMarks)
                              }
                                }}
                          />}

                      </td>)
                    }
                    )}
                     <td className=' opacity-90 c-text-success min-w-0 max-w-0 w-0 pl-0 pr-1' >  | </td>
                  </tr>)}
                </tbody>
              </table>
            </>}
        </>
        :  <table className='w-full'>
          <tbody>
         <tr><td className='text-center'><span className='c-text-dark'>No student in this section</span></td></tr>
         </tbody>
         </table>
          
          }
    </>
  )

}

export default ExamMarksBysection;