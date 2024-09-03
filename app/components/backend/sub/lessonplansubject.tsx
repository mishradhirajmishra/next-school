"use client"
import React, { FC} from 'react'
import { Lesson, LessonPlanType} from '../../shared/model/lessonplanhelper';
import EditIcon from '../../shared/Icons/edit';
import ViewIcon from '../../shared/Icons/view';
 

interface LessonPlanSubjectProp{
  lessonPlan:LessonPlanType | undefined,
  addsyllabus:(option:LessonPlanType)=>void
}

const LessonPlanSubject: FC<LessonPlanSubjectProp> = ({lessonPlan,addsyllabus }) => {  
  return (
    <table>
      <thead>
        <tr className='opacity-35'><th >SN</th><th >Lesson Title</th><th>Start Date</th><th>End Date</th><th>Status</th><th>Completion Date</th><th>Syllabus</th><th>Action</th></tr>
      </thead>
      <tbody>
      {lessonPlan && lessonPlan.lesson.map((l:Lesson,i)=>
      <tr key={i}>
        <td >{i+1}</td>
        <td className='w-44'>{l.title}</td>
        <td>{l.s_date}</td>
        <td>{l.e_date}</td> 
        <td>{l.c_date}</td> 
        <td>{l.status}</td> 
        <td>{l.syllabus[0]?.title[0] !="" ? <button onClick={() => { addsyllabus({ type: "view-syllabus",_id:lessonPlan._id,lesson:[l],class:"", section:"", subject:"", running_year:""})}} ><ViewIcon  className="fill-svg-success"/></button> :<ViewIcon />} </td> 
        <td>  <button type='button' className='btn-outline-light p-1 mr-3 ' onClick={() => { addsyllabus({ type: "syllabus",_id:lessonPlan._id,lesson:[l],class:"", section:"", subject:"", running_year:""})}}><EditIcon /></button>

      </td>
      </tr>)}
      </tbody>
    </table>
    )
}

export default LessonPlanSubject;