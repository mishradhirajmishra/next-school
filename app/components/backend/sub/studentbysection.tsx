"use client"
import React, { FC, useEffect, useState } from 'react'
import { GetAllSettingApi, GetExamMarkSheetForStudentsApi, GetExamMarksForApi, GetSpecificStudentsListApi, GetStudentAttendanceForExamMarkSheetApi, StartExamMarksApi, UpdateExamMarksApi } from '../../shared/utils/apis';
import { StudentType, Studentinitial } from '../../shared/model/studenthelper';
import { ExamMarksType, ExamType, IncludeType, TimeTableType, examMarksInit } from '../../shared/model/examhelper';
import NumberField from '../../shared/forms-elements/numberfield-html';
import { CalculatePercentage, generateMarksheetSinglePDF, getRunningYear, sudentWiseTotalMark } from '../../shared/utils/helperfunction';
import Swall from '../../shared/utils/swal';
import ViewCompactIcon from '../../shared/Icons/viewcompact';
import { SubjectType } from '../../shared/model/subjecthelper';


interface StudentsBysectionProp {
  class_id: string,
  class_name: string,
  section_id: string,
  section_name: string,
  examList: any,
  classExamMarks: any,
  sectionExamMarks: any,
  passRule: string
}

const StudentsBysection: FC<StudentsBysectionProp> = ({ class_id, class_name, section_id, section_name, examList, classExamMarks, sectionExamMarks, passRule }) => {
  const [rows, setrows] = useState<Array<StudentType>>([Studentinitial])
  const [classRankList, setClassRankList] = useState<Array<any>>()
  const [sectionRankList, setSectionRankList] = useState<Array<any>>()

  useEffect(() => { getSpecificStudents() }, [])
  const getSpecificStudents = async () => {
    let param = { class: class_id, section: section_id }
    let studentList = await GetSpecificStudentsListApi(param);
    setrows(studentList)
  }

useEffect(()=>{ studentRank()},[classExamMarks,examList])

  const studentRank =  ( ) => {  
   let sudentWiseTotal = sudentWiseTotalMark(classExamMarks ,examList) 
   setClassRankList(sudentWiseTotal.sort((a:any, b:any) => b.percentage - a.percentage).map((x:any,i:number)=>({...x,rank:i+1})))
   setSectionRankList(sudentWiseTotal.filter((x:any)=>(x.section==section_id)).sort((a:any, b:any) => b.percentage - a.percentage).map((x:any,i:number)=>({...x,rank:i+1})))
   }



    const GetExamMarkSheet = async (stu: StudentType) => {
     let studentAttendance = await GetStudentAttendanceForExamMarkSheetApi({ class: class_id, section: section_id, student: stu._id, running_year:getRunningYear() });
     let attendance ={
        total:studentAttendance?.length,
        present:studentAttendance.filter((x:any)=>x.attendance== "Present")?.length ,
        absent:studentAttendance.filter((x:any)=>x.attendance== "Absent")?.length ,
        leave:studentAttendance.filter((x:any)=>x.attendance== "Leave")?.length ,
     }
 
    let examMarks = sectionExamMarks.filter((x:any)=>(x.student==stu._id));   var f_result: any = { content: "Pass", styles: { textColor: "green" } }
    var result: any = []
    var total: any = []
    var g_total = [{ content: 0 }, { content: 0 }, { content: 0, styles: {} }]
    let base_header = [{ content: "Max Mark" }, { content: "Min Mark" }, { content: "Mark" }]
    var table_header = [...base_header]
    examList.map((exm: any) => {
      if (result.length == 0) {
        return exm.subjectMarks.map((sm: any) => {
          var marks = examMarks.find((x: any) => (x.subject == sm.subject_id && x.exam == exm._id))?.marks
          result.push([sm.subject, sm.max_mark, sm.min_mark, { content: marks, styles: { textColor: +sm.min_mark > +marks ? "red" : "green" } }])
          if (passRule == "Must score Min Mark in each subject in Each Exam" && +sm.min_mark > +marks) {
            f_result = { content: "Fail", styles: { textColor: "red" } }
          }
          total.push([sm.max_mark, sm.min_mark, { content: marks }])
        })
      } else {
        result = exm.subjectMarks.map((sm: any, i: number) => {
          table_header = [...table_header, ...base_header]
          var marks = examMarks.find((x: any) => (x.subject == sm.subject_id && x.exam == exm._id))?.marks
          total[i][0] = +total[i][0] + +sm.max_mark;
          total[i][1] = +total[i][1] + +sm.min_mark;
          total[i][2].content = +total[i][2].content + +marks;
          if (passRule == "Must score Min Mark in each subject in Each Exam" && +sm.min_mark > +marks) {
            f_result = { content: "Fail", styles: { textColor: "red" } }
          }
          return [...result[i], sm.max_mark, sm.min_mark, { content: marks, styles: { textColor: +sm.min_mark > +marks ? "red" : "green" } }]
        })
      }
    })

    let new_total = total.map((t: any, i: number) => {
      g_total[0].content = +g_total[0].content + t[0]
      g_total[1].content = +g_total[1].content + t[1]

      g_total[2] = { content: +g_total[2].content + +t[2].content, styles: { textColor: +g_total[1].content > (+g_total[2].content + +t[2].content) ? "red" : "green" } }
      if (passRule == "Must score Min Mark in each subject in Grand Total" && +g_total[1].content > (+g_total[2].content + +t[2].content)) {
        f_result = { content: "Fail", styles: { textColor: "red" } }
      }

      t[2] = { content: t[2].content, styles: { textColor: +t[1] > +t[2].content ? "red" : "green" } }
      if (passRule == "Must score Min Mark in each subject in Total" && +t[1] > +t[2].content) {
        f_result = { content: "Fail", styles: { textColor: "red" } }
      }
      return t;
    })
    generateMarksheetSinglePDF({ ...stu, class_name: class_name, section_name: section_name }, examList, result, new_total, g_total, [...table_header, base_header], f_result,classRankList,sectionRankList,attendance)
  }



  return (<>


    {rows && rows.length ?
      <>
        <>
          <table>
            <tbody>
              {rows && rows.map((stu: any, i: number) => <tr key={i}>

                <td className='min-w-14 max-w-14 w-14 '> </td>
                <td className='min-w-14 max-w-14 w-14 '>{i + 1}</td>
                <td className=' min-w-64 max-w-64 w-64 '>
                  <label className='c-form-label mb-0 text-wrap'>Student : <span className='c-text-success'>{stu.name}</span></label>
                  <label className='c-form-label mb-0'>Roll No :  <span className='c-text-success'>{stu.roll_no}</span></label>
                  <label className='c-form-label mb-0 text-wrap'>Guardian :  <span className='c-text-success'>{stu.guardian.name}</span></label>
                </td>
                <td className=' opacity-90 c-text-success min-w-0 max-w-0 w-0 pl-0 pr-1' >  | </td>
                <td className='min-w-14 max-w-14 w-14 '> <button onClick={() => {
                   GetExamMarkSheet(stu)
                  
                }}><ViewCompactIcon className='fill-svg-light' /></button></td>
                <td className=' opacity-90 c-text-success min-w-0 max-w-0 w-0 pl-0 pr-1' >  | </td>
              </tr>)}
            </tbody>
          </table>
        </>
      </>
      : <table className='w-full'>
        <tbody>
          <tr><td className='text-center'><span className='c-text-dark'>No student in this section</span></td></tr>
        </tbody>
      </table>

    }
  </>
  )

}

export default StudentsBysection;