import BadgeIcon from "../../shared/Icons/badge"
import BellIcon from "../../shared/Icons/bell"
import CheckListIcon from "../../shared/Icons/checklist"
import ClassIcon from "../../shared/Icons/class"
import DashboardIcon from "../../shared/Icons/dashboard"
import SubjectIcon from "../../shared/Icons/subject"
import DoubleArrowRightIcon from "../../shared/Icons/doubleArrowRight"
import EmployeeIcon from "../../shared/Icons/employee"
import EventNoteIcon from "../../shared/Icons/eventnote"
import LessonPlanIcon from "../../shared/Icons/lessonplan"
import LessonQuestionIcon from "../../shared/Icons/lessonquestion"
import MasterIcon from "../../shared/Icons/master"
import MediaIcon from "../../shared/Icons/media"
import PeriodIcon from "../../shared/Icons/period"
import RoomIcon from "../../shared/Icons/room"
import SpaceDashboardIcon from "../../shared/Icons/spacedashboard"
import TimeListIcon from "../../shared/Icons/timelist"
import ViewCompactIcon from "../../shared/Icons/viewcompact"
import WidgetIcon from "../../shared/Icons/widget"
import SettingIcon from "../../shared/Icons/setting"
import ExamIcon from "../../shared/Icons/exam"
import InstructionIcon from "../../shared/Icons/instruction"
import AllExamIcon from "../../shared/Icons/allexam"
import ExamMarksIcon from "../../shared/Icons/exammarks"
import StudentsIcon from "../../shared/Icons/students"
import HomeWorkIcon from "../../shared/Icons/homework"
import ClassWorkIcon from "../../shared/Icons/classwork"
import RightArrowIcon from "../../shared/Icons/rightarrow"
import MarksheetIcon from "../../shared/Icons/marksheet"
import Library from "../../shared/Icons/library"

export const AdminMenuList = [
  { label: 'Dashboard', path: '/admin/admin-dashboard', icon: <DashboardIcon className="current"  />, multi: false, optionList: [] },

  {
    label: 'Employee', path: '', icon: <BadgeIcon className="current"  />, multi: true,
    optionList: [
      { label: 'All Employee', path: '/admin/employee', icon: <EmployeeIcon className="current"  /> },
      { label: 'Attendance', path: '/admin/employee-attendance', icon: <CheckListIcon className="current"  /> },
    ]
  },
  {
    label: 'Transport', path: '', icon: <BadgeIcon className="current"  />, multi: true,
    optionList: [
      { label: 'Setting', path: '/admin/transport-setting', icon: <EmployeeIcon className="current"  /> },
      { label: 'Vehicle', path: '/admin/vehicle', icon: <EmployeeIcon className="current"  /> },
      { label: 'Driver', path: '/admin/driver', icon: <CheckListIcon className="current"  /> },
      { label: 'Route', path: '/admin/route', icon: <CheckListIcon className="current"  /> },
    ]
  },
  { label: 'Calendar', path: '/admin/calendar', icon: <EventNoteIcon className="current"  />, multi: false, optionList: [] },
  { label: 'Period', path: '/admin/period', icon: <BellIcon className="current"  />, multi: false, optionList: [] },

  { label: 'Class & Section', path: '/admin/class', icon: <WidgetIcon className="current"  />, multi: false, optionList: [] }, 
  { label: 'Section & Subject', path: '/admin/section-subject', icon: <ViewCompactIcon className="current"  />,multi: false, optionList: [] },
  { label: 'Section & Syllabus', path: '', icon: <SpaceDashboardIcon className="current"  />, multi: true,
  optionList: [
    { label: 'Lesson Plan & Syllabus', path: '/admin/lesson-plan', icon: <LessonPlanIcon className="current"  /> },
    { label: 'Lesson Question', path: '/admin/lesson-question', icon: <LessonQuestionIcon className="current"  /> },
  ]
},

  { label: 'Period Alloted', path: '/admin/all-teacher-period', icon: <PeriodIcon className="current"  />, multi: false, optionList: [] },
 
  { label: 'Master Data', path: '', icon: <MasterIcon className="current"  />, multi: true,
  optionList: [
    { label: 'Room', path: '/admin/room', icon: <RoomIcon className="current"  /> },
    { label: 'Subject', path: '/admin/subject', icon: <SubjectIcon className="current"  /> },
    { label: 'Time Option', path: '/admin/timeoption', icon: <TimeListIcon className="current"  /> },
    { label: 'Period Option', path: '/admin/periodoption', icon: <PeriodIcon className="current"  />},
    { label: 'Settings', path: '/admin/setting', icon: <SettingIcon className="current"  /> },
  ]
},
  { label: 'Exam', path: '', icon: <ExamIcon className="current"  />, multi: true,
  optionList: [
    { label: 'Instruction', path: '/admin/exam-instruction', icon: <InstructionIcon className="current"  /> },
    { label: 'All Exam', path: '/admin/exam', icon: <AllExamIcon className="current"  /> },
    { label: 'Exam Seating', path: '/admin/exam-seating', icon: <RoomIcon className="current"  /> },
    { label: 'Exam Marks', path: '/admin/exam-marks', icon: <ExamMarksIcon className="current"  /> },
    { label: 'Marksheet', path: '/admin/marksheet', icon: <MarksheetIcon  className="current"  /> },
  ]
},

  { label: 'Students', path: '', icon: <EmployeeIcon className="current"  />, multi: true,
    optionList: [
      { label: 'All Students', path: '/admin/student', icon: <StudentsIcon className="current"  /> },
      { label: 'Attendance', path: '/admin/student-attendance', icon: <CheckListIcon className="current"  /> },
      { label: 'Class Work', path: '/admin/class-work', icon: <ClassWorkIcon className="current"  /> },
      // { label: 'Home Work', path: '/admin/Home-work', icon: <HomeWorkIcon className="current"  /> },

    ]
  },
  { label: 'Fee', path: '', icon: <EmployeeIcon className="current"  />, multi: true,
    optionList: [
      { label: 'Master Data', path: '/admin/fee', icon: <RightArrowIcon className="current"  /> },
      { label: 'Section wise Fee', path: '/admin/section-fee', icon: <RightArrowIcon className="current"  /> },
      { label: 'Student Fee', path: '/admin/student-fee', icon: <RightArrowIcon className="current"  /> },
    ]
  },
  { label: 'Library', path: '', icon: <Library className="current"  />, multi: true,
  optionList: [
    { label: 'Book', path: '/admin/book', icon: <RightArrowIcon className="current"  /> },
    // { label: 'Book Issue', path: '/admin/book-issue', icon: <RightArrowIcon className="current"  /> },
  ]
},

  // { label: 'Media', path: '/admin/media', icon: <MediaIcon className="current"  />, }
]

export const TeacherMenuList = [
  { label: 'Dashboard', path: '/admin/teacher-dashboard', icon: <DashboardIcon className="current"  />, multi: false, optionList: [] },
  { label: 'All Students', path: '/admin/student', icon: <StudentsIcon className="current"  />, multi: false, optionList: [] },
  { label: 'Attendance', path: '/admin/student-attendance', icon: <CheckListIcon className="current"  />, multi: false, optionList: [] },
  { label: 'Period Alloted', path: '/admin/teacher-period', icon: <PeriodIcon className="current"  />, multi: false, optionList: [] },
  { label: 'Class Work', path: '/admin/class-work', icon: <ClassWorkIcon className="current"  />, multi: false, optionList: [] },
  { label: 'Home Work', path: '/admin/home-work', icon: <HomeWorkIcon className="current"  />, multi: false, optionList: [] },
  { label: 'My Profile', path: '/admin/my-profile', icon: <HomeWorkIcon className="current"  />, multi: false, optionList: [] },
]

export const InitialMenuList = [

  {
    label: '', path: '', icon: <EmployeeIcon className="current"  />, multi: false,
    optionList: [
      { label: '', path: '', icon: <EmployeeIcon className="current"  /> },     
    ]
  }

]