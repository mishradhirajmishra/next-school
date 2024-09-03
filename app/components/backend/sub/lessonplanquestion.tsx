"use client"
import React, { FC} from 'react'
import { Lesson, LessonPlanType, LessonPlanQuestionShare,LessonPlanQuestionShareinit} from '../../shared/model/lessonplanhelper';
import EditIcon from '../../shared/Icons/edit';
import ViewIcon from '../../shared/Icons/view';
 

interface LessonPlanQuestionProp{
  lessonPlan:LessonPlanType | undefined,
  addLessonQuestion:(option:LessonPlanQuestionShare)=>void
}

const LessonPlanQuestion: FC<LessonPlanQuestionProp> = ({lessonPlan,addLessonQuestion }) => {  
  return (
    <table>
      <thead>
        <tr className='opacity-35'><th >SN</th><th >Lesson Title</th><th>Total Question</th><th colSpan={2}>Action</th></tr>
      </thead>
      <tbody>
      {lessonPlan && lessonPlan.lesson.map((l:Lesson,i)=>
      <tr key={i}>
        <td >{i+1}</td>
        <td className='w-44'>{l.title}</td>
        {/* <td>{l.s_date}</td>
        <td>{l.e_date}</td> 
        <td>{l.c_date}</td>  */}
        <td>{l.question.length}</td> 
        <td>{l.question[0]?.body[0] !="" ? <button className='btn-outline-light p-1 mr-3 '  onClick={() => { 
          addLessonQuestion({ 
            ...LessonPlanQuestionShareinit,          
            type: "view-question",
            lesson_plan_id:lessonPlan._id,
            lesson:l ,
            question:l.question          
            })}} ><ViewIcon  className="fill-svg-success"/></button> :<ViewIcon />} </td> 
        <td>   <button type='button' className='btn-outline-light p-1 mr-3 '   onClick={() => { 
         
          addLessonQuestion({     
            ...LessonPlanQuestionShareinit,
            type: "question",
            lesson_plan_id:lessonPlan._id,
            lesson:l,
            question:l.question             
            })
          }}
            ><EditIcon /></button>

      </td>
      </tr>)}
      </tbody>
    </table>
    )
}

export default LessonPlanQuestion;