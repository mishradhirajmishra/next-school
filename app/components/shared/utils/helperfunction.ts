import { differenceInDays, differenceInMinutes, format } from "date-fns"
import { FeeType } from "../model/feehelper"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { ExamType, IncludeType, Seating, TimeTableType } from "../model/examhelper"
import daylist from "./daylist"
import timelist from "./timelist"
import { GetAllExamInstructionApi, GetAllSettingApi } from "./apis"
import { LessonPlanQuestionShare, Question } from "../model/lessonplanhelper"
import { StudentType } from "../model/studenthelper"
import { ClassOptionType } from "../model/classhelper"

export const DaysInThisMonth = ( ) =>{
  let year =new Date().getFullYear()
  let month =new Date().getMonth()
  return  new Date(year, month+1, 0).getDate();
  }

  export const roundTwoDecimal=(num:number)=>{ return Math.round((num + Number.EPSILON) * 100) / 100}

export const slugify=(val:string)=> {
  return val
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export const CalculatePercentage = (o_mark: number, t_mark: number) => {
  if (o_mark > 0 && t_mark > 0) {
    return (o_mark * 100 / t_mark).toFixed(2)
  } else {
    return ""
  }
}
export const Expendrow = (id: string, rows: any[]) => {
  return rows.map(x => {
    if (x._id == id) {
      x.expend ? x.expend = false : x.expend = true
    } else {
      x.expend = false;
    }
    return x;
  })
}

export const GetEndTimeList = (stimeList: any, start_time: any) => {
  let sdate = Date.parse(`01/01/2011 ${start_time}`);
  let data = JSON.parse(JSON.stringify(stimeList)).map((t: any) => { if (Date.parse(`01/01/2011 ${t.value}`) <= sdate) { t.status = true } else { t.status = false } return t })
  return data;
}

interface ImageSize {
  width: number;
  height: number;
}

export function getImageSize(file: File): Promise<ImageSize> {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      resolve({ width: image.width, height: image.height });
    };
  });
}

export const ImageSizeInMB = (val: number) => {

  return (Math.round(val * 100 / (1024 * 1024)) / 100).toFixed(2)

}

export const ImageSorce = (img: string) => {
  return `http://localhost:3000/uploads/${img}`
}

// ==== dragable

export const handleDragStart = (e: any, item: any) => {
  e.dataTransfer.setData('text/plain', '');
  return item;
};

export const handleDrop = (e: any, targetItem: any, draggingItem: any, rows: any) => {
  if (!draggingItem) return;
  const currentIndex = rows.indexOf(draggingItem);
  const targetIndex = rows.indexOf(targetItem);
  if (currentIndex !== -1 && targetIndex !== -1) {
    rows.splice(currentIndex, 1);
    rows.splice(targetIndex, 0, draggingItem);
    return rows.map((x: any, i: number) => { x.order = i + 1; return x })
  } else {
    return rows
  }
};

// ==== FeeCalculatin

export const calculateTotalFee = (fee: any, fee_discount: number) => {
  return fee.reduce((previousValue: number, currentValue: FeeType) => {
    return previousValue + +calculateLateFeeDiscount(currentValue, +fee_discount) + calculateLateFeeForTotal(currentValue)
  }, 0)
}
const calculateLateFeeDiscount = (fe: FeeType, fee_discount: number) => {
  if (fe.discount_applicable == "Yes") {
    return +fe.amount * (100 - fee_discount) / 100
  } else { return fe.amount }

}


const calculateLateFeeForTotal = (fe: FeeType) => {
  if (fe.late_fee_applicable == "Yes") {
    const diff = differenceInDays(new Date(), new Date(fe.last_date_of_collection)) / +fe.late_fee_reoccur_days
    if (diff > 0) { return Math.floor(diff) * +fe.late_fee_amount; } else { return 0 }
  } else { return 0 }
}

export const calculateLateFee = (fe: FeeType) => {
  if (fe.late_fee_applicable == "Yes") {
    const diff = differenceInDays(new Date(), new Date(fe.last_date_of_collection)) / +fe.late_fee_reoccur_days
    if (diff > 0) { return Math.floor(diff) * +fe.late_fee_amount; } else { return null }
  } else { return null }
}

export const getLogo = () => {
  if (localStorage.getItem("setting")) {
    const setting: any = localStorage.getItem("setting")
    return JSON.parse(setting)?.logo
  } else {
    return "logo.png"
  }
}
export const getRunningYear = () => {
  if (localStorage.getItem("setting")) {
    const setting: any = localStorage.getItem("setting")
    return JSON.parse(setting)?.running_year
  } else {
    return ""
  }
}

export const getSchoolName = () => {
  if (localStorage.getItem("setting")) {
    const setting: any = localStorage.getItem("setting")
    return JSON.parse(setting)?.school_name
  } else {
    return ""
  }
}

export const getSchoolAddress = () => {
  if (localStorage.getItem("setting")) {
    const setting: any = localStorage.getItem("setting")
    return JSON.parse(setting)?.address
  } else {
    return ""
  }
}

export const toDataURL = (url: string) => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))

export const toProperCase = (text: string) => {
  if(text && text.length>0){
 return text.split(' ').map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(' ');
  }else{
    return ""
  }
 
}

export const totalFeePaymet = (fee: any) => {
  return fee.reduce((total: number, current: any) => { return total + current.amount }, 0)
}

export const feeDiscount = (fe: any, stu: any) => {
  if (fe.discount_applicable == "Yes") { return stu.fee_discount + " %" } else {
    return "";
  }
}


export const generateFeePDF = async (row: any) => {
  const doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4', putOnlyUsedFonts: true, floatPrecision: "smart", compress:true });
  let schoolAddress = getSchoolAddress()?.line_1 + " - " + getSchoolAddress().city;
  const logoBlob = await toDataURL(ImageSorce(getLogo()))
  //@ts-ignore
  doc.addImage(logoBlob, 'png', 40, 20, 60, 60)

  autoTable(doc, {
    head: [[getSchoolName()]],
    body: [[schoolAddress]],
    margin: { right: 20, left: 140, top: 30, bottom: 30 },
    theme: 'plain',
    headStyles: { fontSize: 20, cellPadding: 0 },
    bodyStyles: { fontSize: 12, cellPadding: 0 }
  });


  const headers = [['SN', 'Particulars', 'Last Date ', 'Amount', 'Late Fee', 'Discount']];
  //@ts-ignore
  const feedata = row?.fee.map((fe: FeeType, i: number) => [i + 1, toProperCase(fe.title), fe.last_date_of_collection, fe.amount, calculateLateFee(fe), feeDiscount(fe, row?.stu)]);

  const name = row?.stu?.name || "";
  const fname = row?.stu?.family_detail.find((f: any) => f.relation == "Father")?.name || "";
  const mname = row?.stu?.family_detail.find((f: any) => f.relation == "Mother")?.name || "";
  const stuclass = row?.stu?.class_name || "";
  const stuSection = row?.stu?.section_name || "";
  const penNo = row?.stu?.pen_no || "";

  const stuData = [
    ["Student Name", toProperCase(name), "Class", stuclass],
    ["Father's Name", toProperCase(fname), "Section", stuSection],
    ["Mothers's Name", toProperCase(mname), "Payment Month", row?.fee[0].collecting_month],
    ["PEN No", penNo, "Payment Date", format(new Date(), 'yyyy-MM-dd')],
  ]
  autoTable(doc, {
    body: stuData,
    didDrawCell: (data) => { },
    margin: [100, 20],
    bodyStyles: { cellPadding: 1 },
    columnStyles: {
      0: { cellWidth: 100, fontStyle: "bold" },
      1: { cellWidth: 300 },
      2: { fontStyle: "bold" },
    },
    styles:{fillColor: [200,200,200]},
    theme: 'striped',
  });
  autoTable(doc, {
    head: headers,
    body: feedata,
    didDrawCell: (data) => { },
    margin: [90, 20],
    theme: 'grid',
    headStyles: { fillColor: "gray" }
  });

  autoTable(doc, {
    body: [["", "", "Total Fee", calculateTotalFee(row?.fee, row.stu.fee_discount)]],
    margin: [90, 20],
    bodyStyles: { cellPadding: 0 },
    columnStyles: {
      0: { cellWidth: 100, fontStyle: "bold" },
      1: { cellWidth: 300 },
      3: { fontStyle: "bold" },
      4: { halign: "right" },
    },
    theme: 'plain',
  });
  const paymentdata = row?.stu.fee_payment.map((fe: any, i: number) => [i + 1, toProperCase(fe.payment_mode), fe.cheque_dd_date, fe.cheque_dd_date, fe.transaction_id, fe.amount, format(fe.createdAt, 'dd-MM-yyyy')]);
  autoTable(doc, {
    head: [["SN.", "Payment Mode", "Cheque/DD No", "Cheque/DD Date", "Transaction Id", "Amount", "Date"]],
    body: paymentdata,
    didDrawCell: (data) => { },
    margin: [90, 15],
    theme: 'striped',
    styles:{fillColor: [200,200,200]},
    headStyles: { fillColor: "gray" }
  });

  autoTable(doc, {
    body: [["", "", "Balance Amount", row?.stu.total_balance_amount,]],
    margin: [0, 20],
    bodyStyles: { cellPadding: 0 },
    columnStyles: {
      0: { cellWidth: 100, fontStyle: "bold" },
      1: { cellWidth: 300 },
      3: { fontStyle: "bold" },
      4: { halign: "right" },
    },
    theme: 'plain',
  });

  autoTable(doc, {
    body: [["Class Teacher Sign", "Accountant Sign"]],
    didDrawCell: (data) => { },
    margin: [290, 15],
    styles: { fontStyle: "bold" },
    columnStyles: {
      0: { halign: "left" },
      1: { halign: "right" }
    },
    theme: 'plain',
  });
  doc.save('studentfee.pdf');
}

export const generateTimeTablePDF = async (inc: IncludeType, exam: ExamType) => {
  const doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4', putOnlyUsedFonts: true, floatPrecision: "smart" , compress:true});
  const tempExam = exam.include.filter((inc1: IncludeType) => (inc1.class == inc.class && inc1.same_syllabus_as_section_id == inc.section)).map((inc1: IncludeType) => inc1.section_name);
  const class_name = inc?.class_name || "";
  let section_name = inc?.section_name || "";
  if (tempExam.length) {
    section_name = section_name + ", " + tempExam.join(", ")
  }
  const logoBlob = await toDataURL(ImageSorce(getLogo()))
  //@ts-ignore
  doc.addImage(logoBlob, 'png', 40, 20, 60, 60,'','FAST')
  autoTable(doc, {
    head: [["Time Table"]],
    body: [[exam.title + " Session (" + exam.running_year + ")"], [class_name + "(" + section_name + ")"]],
    margin: { right: 20, left: 50, top: 20, bottom: 20 },
    theme: 'plain',
    headStyles: { fontSize: 20, halign: 'center', cellPadding: 0 },
    bodyStyles: { fontSize: 15, halign: 'center', cellPadding: 0 }
  });
  const headers = [['SN', 'Date', 'Day', 'Time', 'Subject', 'Syllabus',]];
  const timeTable = inc.timeTable.map((inc: TimeTableType, i: number) => [i + 1, inc.date, daylist.find((d: any) => d.value == new Date(inc.date).getDay())?.name, timelist.find((x: any) => x.value == inc.start_time)?.name + " - " + timelist.find((x: any) => x.value == inc.end_time)?.name, inc.subject, inc.syllabus])

  autoTable(doc, {
    head: headers,
    body: timeTable,
    didDrawCell: (data) => { },
    margin: [90, 20],
    theme: 'grid',
    headStyles: { fillColor: "gray" }
  });
  let inst = await GetAllExamInstructionApi()
  let instBody = inst.instructions.map((x: any, i: number) => [i + 1 + ". ", x.title])
  autoTable(doc, {
    head: [["", inst.title]],
    body: instBody,
    didDrawCell: (data) => { },
    margin: [90, 20],
    theme: 'plain',
    headStyles: { fontSize: 15, cellPadding: 0, halign: "left" },
    bodyStyles: { fontSize: 10, }
  });


  doc.save('time-table.pdf');
}

export const generateQuestionPaper = async (quest: LessonPlanQuestionShare) => {
  const doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4', putOnlyUsedFonts: true, floatPrecision: "smart" , compress:true});
  quest.lesson.question.map((ques: any, i: number) => {
    autoTable(doc, {
      head: [[{ content: i + 1 + "- " + ques.title, colSpan: ques.body[0]?.length }]],
      body: ques.body,
      margin: [90, 20],
      theme: ques.type == "plain" ? 'plain' : 'grid',
      headStyles: { textColor: "black", fillColor: "white", cellPadding: { bottom: 5 } },
      // bodyStyles: {cellPadding:{left:20} }
    });
  })
  doc.save('question.pdf');
}



export const generateExamPaperPDF = async (inc: IncludeType, exam: ExamType, timeTable: TimeTableType, questionList: Question[]) => {
  const doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4', putOnlyUsedFonts: true, floatPrecision: "smart" , compress:true});
  const tempExam = exam.include.filter((inc1: IncludeType) => (inc1.class == inc.class && inc1.same_syllabus_as_section_id == inc.section)).map((inc1: IncludeType) => inc1.section_name);
  const class_name = inc?.class_name || "";
  let section_name = inc?.section_name || "";
  if (tempExam.length) {
    section_name = section_name + ", " + tempExam.join(", ")
  }
  const logoBlob = await toDataURL(ImageSorce(getLogo()))
  addWaterMark(doc, logoBlob);
  // //@ts-ignore
  // doc.addImage(logoBlob, 'png', 50, 10, 45, 45,'','FAST')

  autoTable(doc, {
    head: [["", getSchoolName(), ""]],
    body: [["", exam.title + " " + exam.running_year, ""],
    ["", class_name + " (" + section_name + ")", ""],
    ["Time : " + getTimeDiffranceInHrsMins(timeTable.start_time, timeTable.end_time), "Subject - " + timeTable.subject, "Max Marks - " + timeTable.max_mark]
    ],
    margin: { right: 20, left: 20, top: 20, bottom: 20 },
    theme: 'plain',
    headStyles: { fontSize: 15, halign: 'center', cellPadding: 0 },
    bodyStyles: { fontSize: 11, cellPadding: 0 },
    columnStyles: {
      0: { halign: "left" },
      1: { halign: "center" },
      2: { halign: "right" }
    }
  });

  //   doc.addFileToVFS("KrutiDev010.ttf", KrutiDevFontBase64);
  //   doc.addFont("KrutiDev010.ttf", "KrutiDev010", "normal");
  //   doc.setFont("KrutiDev010");
  //   doc.setFontSize(28);
  //  console.log("doc.getFontList()=======")
  //  console.log(doc.getFontList())
  // Add text using the Kruti Dev 010 font
  // doc.text('मंत्री ने अपने बेटे को शहर क्यों भेजा था', 20, 20);

  questionList.map((ques: any, i: number) => {
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [[{ content: i + 1 + "- ", styles: { cellWidth: 15 } }, { content: ques.title, colSpan: ques.body[0]?.length - 2 }, { content: ques?.marks, styles: { cellWidth: 20, halign: "right" } }]],
      margin: { left: 20, right: 20, top: 0, bottom: 0 },
      theme: ques.type == "plain" ? 'plain' : 'grid',
      headStyles: { textColor: "black", fillColor: "white", cellPadding: 0 },
    });
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 5,
      body: ques.body,
      margin: { left: 35, right: 20, top: 0, bottom: 0 },
      theme: ques.type == "plain" ? 'plain' : 'grid',
      bodyStyles: { cellPadding: 1 }
    });
  })
  doc.save('question_paper.pdf');
}

const getTimeDiffranceInHrsMins = (start_time: string, end_time: string) => {
  const totalMinute = differenceInMinutes(new Date("October 13, 2014 " + end_time), new Date("October 13, 2014 " + start_time));
  return `${Math.floor(totalMinute / 60)} Hour ${totalMinute % 60} Minute`
}

const addWaterMark = async (doc: any, logoBlob: any) => {
  var totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.1 }));
    doc.addImage(logoBlob, 'png', doc.internal.pageSize.width / 2 - 150, doc.internal.pageSize.height / 2 - 150, 300, 300,'','FAST')
    doc.setGState(new doc.GState({ opacity: 1 }));
  }
  return doc;
}

export const generateMarksLedgerSingleSubjectPdf = async (exam: ExamType, inc: IncludeType, timeTable: TimeTableType, studentList: StudentType[]) => {
  const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: "a4", putOnlyUsedFonts: true, floatPrecision: "smart", compress:true });
  const class_name = inc?.class_name || "";
  let section_name = inc?.section_name || "";
  const margin = { right: 5, left: 5, top: 25, bottom: 20 };
  const sections = 2;
  const spacing = 5;
  const printWidht = doc.internal.pageSize.width - (margin.left + margin.right);
  const sectionWidth = (printWidht - ((sections - 1) * spacing)) / sections;
  doc.addPage();
  autoTable(doc, {
    head: [["", getSchoolName(), ""]],
    body: [
      ["", exam.title + " " + exam.running_year, ""],
      ["", "Marks Ledger", ""],
      [class_name + " (" + section_name + ")", "Subject - " + timeTable.subject, "Full Marks - " + timeTable.max_mark]
    ],
    margin: { right: 110, left: 5, top: 5, bottom: 15 },
    theme: 'plain',
    headStyles: { fontSize: 10, halign: 'center', cellPadding: 0 },
    bodyStyles: { fontSize: 9, cellPadding: 0 },
    columnStyles: {
      0: { halign: "left" },
      1: { halign: "center" },
      2: { halign: "right" }
    }
  });


  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY + 5,
    head: [["Roll NO", "Student's Name", "Obtain Marks", "Remarks"]],
    body: studentList.map((stu: StudentType, i: number) => { return [stu.roll_no, stu.name, "", ""] }),
    // body: studentList.map((stu:StudentType,i:number)=>{return [i+1,stu.name,"","" ]}), 
    tableWidth: sectionWidth,
    margin,
    rowPageBreak: 'avoid',
    didDrawPage: (data) => {
      const docPage = (doc as any).internal.getNumberOfPages();
      const nextShouldWrap = data.pageNumber % sections;
      if (nextShouldWrap) {
        doc.setPage(docPage - 1);
        data.table.settings.margin.left += sectionWidth + spacing;
      } else {
        data.table.settings.margin.left = margin.left;
      }
    },
    theme: 'grid',
    headStyles: { textColor: "black", fillColor: "white", fontSize: 10, cellPadding: 1 },
    bodyStyles: { fontSize: 12, cellPadding: 1 },
    columnStyles: {
      0: { cellWidth: 10 },
      2: { cellWidth: 15 },
      3: { cellWidth: 18 }
    },
    styles: { lineColor: [128, 128, 128] },
  });
  doc.setPage((doc as any).internal.getNumberOfPages());
  doc.deletePage(1)
  doc.save('marks-ledger.pdf');
}


export const generateMarksLedgerAllSubjectPdf = async (exam: ExamType, inc: IncludeType, studentList: StudentType[]) => {
  const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: "a4", putOnlyUsedFonts: true, floatPrecision: "smart", compress:true });
  const class_name = inc?.class_name || "";
  let section_name = inc?.section_name || "";
  const margin = { right: 5, left: 5, top: 5, bottom: 20 };
  doc.addPage();
  autoTable(doc, {
    head: [[getSchoolName()]],
    body: [
      ["Marks Ledger of " + exam.title + " " + exam.running_year],
      [class_name + " (" + section_name + ") All Subjects"]
    ],
    margin: { right: 10, left: 10, top: 5, bottom: 15 },
    theme: 'plain',
    headStyles: { fontSize: 10, halign: 'center', cellPadding: 0 },
    bodyStyles: { fontSize: 10, cellPadding: 0, halign: 'center' },
  });
  const cellWidth = 140 / (inc.timeTable.length + 1)

  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY + 5,
    head: [["Roll NO", "Student's Name", ...inc.timeTable.map((tt: TimeTableType) => tt.subject), "Remarks"]],
    body: studentList.map((stu: StudentType, i: number) => { return [stu.roll_no, stu.name, "", ""] }),
    // body: studentList.map((stu:StudentType,i:number)=>{return [i+1,stu.name,"","" ]}), 
    margin,
    theme: 'grid',
    headStyles: { textColor: "black", fillColor: "white", fontSize: 10, cellPadding: 1 },
    bodyStyles: { fontSize: 12, cellPadding: 1, cellWidth: cellWidth },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 50 },
      // 2:{cellWidth:15},
      // 3:{cellWidth:18}
    },
    styles: { lineColor: [128, 128, 128] },
  });
  doc.setPage((doc as any).internal.getNumberOfPages());
  doc.deletePage(1)
  doc.save('marks-ledger.pdf');
}
const oddOrEvenMargin = (x: number) => {
  return (x & 1) ? { right: 5, left: 105, top: 5, bottom: 20 } : { right: 5, left: 5, top: 5, bottom: 20 };
}


export const generateAdmtCardPdf = async (exam: ExamType, inc: IncludeType, studentList: StudentType[]) => {
  const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: "a4", putOnlyUsedFonts: true, floatPrecision: "smart", compress:true });
  const margin = { right: 0, left: 0, top: 5, bottom: 20 };
  const sections = 2;
  const spacing = 0;
  const printWidht = doc.internal.pageSize.width - (margin.left + margin.right);
  const sectionWidth = (printWidht - ((sections - 1) * spacing)) / sections;
  doc.addPage();

  autoTable(doc, {

    body: studentList.map((stu: StudentType, i: number) => { return [stu._id] }),
    tableWidth: sectionWidth,
    margin,
    rowPageBreak: 'avoid',
    didDrawCell: function (data) {
      if (data.cell.section === 'body') {
        const student = studentList.find((stu: StudentType) => stu._id == data.cell.text[0]);
        const roll_no = student?.roll_no || "";
        const name = student?.name || "";
        const s_class = inc.class_name || "";
        const section = inc.section_name || "";
        const guardian = student?.guardian?.name || "";
        const gender = student?.gender || "";
        autoTable(doc, {   
          head: [
            [{ content: "Admit Card ", colSpan: 2, styles: {cellPadding:{top:1,},fontSize:10} }],
            [{ content: exam.title + " " + exam.running_year, colSpan: 2, styles: {cellPadding:{bottom:1} } }]
          ],
          body: [
            ["Roll No : " + roll_no, "Gender : " + gender],
            ["Class : " + s_class, "Section : " + section],
            [{ content: "Student's Name : " + toProperCase(name), colSpan: 2 }], [{ content: "Guardian's Name : " + toProperCase(guardian), colSpan: 2 }],
            [{ content: "Exam Controller Sign" }, { content: "Principal's Sign", styles: { halign: 'right' } }]
          ],
          startY: data.cell.y + 4,
          margin: { left: data.cell.x + data.cell.padding('left') + 4 },
          tableWidth: 'wrap',
          theme: 'striped',
          styles:{fillColor: [200,200,200]},
          columnStyles: {
            0: { cellWidth: 49 },
            1: { cellWidth: 48.5 }
          },
          headStyles: { halign: "center", fontStyle: 'bold' , fillColor: "white", cellPadding: 0, fontSize: 8, textColor: "black" }
        });
      }
    },
    didDrawPage: (data) => {
      const docPage = (doc as any).internal.getNumberOfPages();
      const nextShouldWrap = data.pageNumber % sections;
      if (nextShouldWrap) {
        doc.setPage(docPage - 1);
        data.table.settings.margin.left += sectionWidth + spacing;
      } else {
        data.table.settings.margin.left = margin.left;
      }
    },
    theme: 'grid',
    styles: { lineColor: [128, 128, 128] },
    bodyStyles: { fontSize: 1, cellPadding: { top: 5, bottom: 2, left: 0, right: 0 }, minCellHeight: 52, textColor: "white" },
  });
  doc.setPage((doc as any).internal.getNumberOfPages());
  doc.deletePage(1)
  doc.save('admit-card.pdf');
}

export const generateDeskSlipPdf =  async (exam: ExamType, inc: IncludeType, studentList: StudentType[]) => {
  const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: "a4", putOnlyUsedFonts: true, floatPrecision: "smart", compress:true });
  const margin = { right: 0, left: 0, top: 5, bottom: 20 };
  const sections = 2;
  const spacing = 0;
  const printWidht = doc.internal.pageSize.width - (margin.left + margin.right);
  const sectionWidth = (printWidht - ((sections - 1) * spacing)) / sections;
  doc.addPage();

  autoTable(doc, {

    body: studentList.map((stu: StudentType, i: number) => { return [stu._id] }),
    tableWidth: sectionWidth,
    margin,
    rowPageBreak: 'avoid',
    didDrawCell: function (data) {
      if (data.cell.section === 'body') {
        const student = studentList.find((stu: StudentType) => stu._id == data.cell.text[0]);
        const roll_no = student?.roll_no || "";
        const name = student?.name || "";
        const s_class = inc.class_name || "";
        const section = inc.section_name || "";
        const guardian = student?.guardian?.name || "";
        const gender = student?.gender || "";
        autoTable(doc, {
          head: [
            [{ content: "Desk Slip", colSpan: 2, styles: {cellPadding:{top:1,},fontSize:10} }],
            [{ content: exam.title + " " + exam.running_year, colSpan: 2, styles: {cellPadding:{bottom:1} } }]
          ],
 
          body: [     
            [{ content: "Name : " + toProperCase(name) ,styles:{cellWidth:66}},{content:"Roll No : " + roll_no,styles:{cellWidth:35}}],       
            [ "Class : " + s_class, "Section : " + section],   
          ],
          startY: data.cell.y + 1,
          margin: { left: data.cell.x + data.cell.padding('left') +2},
          tableWidth: 'wrap',
          theme: 'striped',
          styles:{fillColor: [200,200,200]}, 
          headStyles: { halign: "center", fontStyle: 'bold',   fontSize: 8, textColor: "black" }
        });
      }
    },
    didDrawPage: (data) => {
      const docPage = (doc as any).internal.getNumberOfPages();
      const nextShouldWrap = data.pageNumber % sections;
      if (nextShouldWrap) {
        doc.setPage(docPage - 1);
        data.table.settings.margin.left += sectionWidth + spacing;
      } else {
        data.table.settings.margin.left = margin.left;
      }
    },
    theme: 'grid',
    styles: { lineColor: [128, 128, 128] },
    bodyStyles: { fontSize: 1, cellPadding: { top: 2, bottom: 2, left: 0, right: 0 }, minCellHeight: 27, textColor: "white" },
  });
  doc.setPage((doc as any).internal.getNumberOfPages());
  doc.deletePage(1)
  doc.save('desk-slip.pdf');
}



export const generateMarksheetSinglePDF = async (stu: StudentType, examList: any, result: any, total: any, g_total: any,table_header:any,f_result:any,classRankList:any,sectionRankList:any,attendance:any) => {
  const doc = new jsPDF({ orientation: 'l', unit: 'pt', format: 'a4', putOnlyUsedFonts: true, floatPrecision: "smart",compress:true });
  let schoolAddress = getSchoolAddress()?.line_1 + " - " + getSchoolAddress().city;
  const logoBlob = await toDataURL(ImageSorce(getLogo()))
  //@ts-ignore
  doc.addImage(logoBlob, 'png', 40, 20, 60, 60,'','FAST')

  autoTable(doc, {
    head: [[getSchoolName()]],
    body: [[schoolAddress], [{ content: "Annual Progress Repoert " + getRunningYear(), styles: { fontStyle: 'bold' } }]],
    margin: { right: 110, left: 110, top: 30, bottom: 30 },
    theme: 'plain',
    headStyles: { fontSize: 20, cellPadding: 0, halign: 'center' },
    bodyStyles: { fontSize: 12, cellPadding: 0, halign: 'center' }
  });

  const roll_no = stu?.roll_no || "";
  const name = stu?.name || "";
  const s_class = stu?.class_name || "";
  const section = stu?.section_name || "";
  const guardian = stu?.guardian?.name || "";
  const dob = stu?.dob || "";

  // autoTable(doc, {
  //   body: [
  //     [{ content: "Student's Name : " + toProperCase(name), colSpan: 2 }, { content: "Guardian's Name : " + toProperCase(guardian), colSpan: 2 }],
  //     ["Roll No : " + roll_no, "Class : " + s_class, "Section : " + section, "Date of Birth : " + dob],
  //   ],
  //   margin: { right: 20, left: 20, top: 30, bottom: 30 },
  //   theme: 'plain',
  //   styles: { lineColor: [128, 128, 128], cellPadding: 3,fontStyle: 'bold' },
  // });
  autoTable(doc, { 
    startY: (doc as any).lastAutoTable.finalY+5,
    head: [
      [{content:"Subjects",rowSpan:2,styles:{valign:'middle',halign:'center'}},...examList.map((exm: any) => ({ content: exm.title,colSpan:3, styles: { halign: 'center'}})),{ content: "Total",colSpan:3, styles: { halign: 'center'}}],
      [...table_header]
    ],
    body: [
   
     ...result.map((res: any, i: number) => [...res, ...total[i]]),
     [{ content: "Grand Total", colSpan: result[0].length, styles: { halign: 'right', cellPadding: { right: 10, top: 4 }, fontStyle: 'bold' } }, ...g_total]
    ],
    margin: { right: 15, left: 15, top: 30, bottom: 0 },
    theme: 'grid',
    styles: { lineColor: [128, 128, 128], cellPadding: 3,halign:'center'  },
    headStyles: { lineWidth:1, lineColor: [128, 128, 128], fillColor: "white",  textColor: "black"},
    columnStyles:{0:{halign:'left', textColor: "black"}}
  });
  const result_rule= await GetAllSettingApi()
 
  let percentage= CalculatePercentage(+g_total[2].content,+g_total[0].content)
   var alpplied_rule =result_rule.result.find((rr:any)=>(+rr.percentage_from<= +percentage && +rr.percentage_to>= +percentage))
 
  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY+5  ,
    body: [
      ["Student's Name" ,toProperCase(name),{content:alpplied_rule.remarks,rowSpan:8,styles:{halign:'center',valign:'middle'}}, "HM in Class",classRankList[0].percentage,"HM in Section",sectionRankList[0].percentage], 
      ["Guardian's Name" , toProperCase(guardian),"Rank In Class",classRankList.find((x:any)=>x.student==stu._id)?.rank,"Rank In Section",sectionRankList.find((x:any)=>x.student==stu._id)?.rank],
      ["Roll No" , roll_no,"Result",f_result, "Percentage",percentage+" %" ],
      ["Class" , s_class,"Division",alpplied_rule.division, "Grade",alpplied_rule.grade],
      ["Section" , section,{content:"Attendance Record",colSpan:4,styles:{textColor:"green",halign:'center'}}] ,
      ["Date of Birth" , dob,"School Days",attendance?.total, "Present",attendance?.present], 
      ["","","Absent",attendance?.absent, "Leave",attendance?.leave ] ,
    ],
    margin: { right: 15, left: 15, top: 0, bottom: 0 },
    theme: 'grid',
    styles: { lineColor: [128, 128, 128], cellPadding: 3,fontStyle: 'bold' },
    columnStyles: {
      0: { cellWidth: 90,textColor:"black",fontSize:10 },
      1: { cellWidth: 140 ,textColor:"green" ,fontSize:10},
      3: { cellWidth: 90 },
      4: { cellWidth: 70 },
      5: { cellWidth: 90 },
      6: { cellWidth: 50 },
    },
  });

  autoTable(doc, {
    startY:460,
    body: [
      [{content:"-----------------------",styles:{halign:'left'}},{content:"-----------------------",styles:{halign:'center'}},{content:"-----------------------",styles:{halign:'right'}}],
      [{content:"Class Teacher",styles:{halign:'left'}},{content:"Exam Controller",styles:{halign:'center'}},{content:"Principal",styles:{halign:'right'}}]
 
    ],
    margin: { right: 110, left: 110, top: 0, bottom: 0 },
    theme: 'plain',
    styles: { lineColor: [128, 128, 128], cellPadding: 3,fontStyle: 'bold' ,halign:'center'},
    
  });

 
  autoTable(doc, {
    startY:500,
    head:[["Percentage","Division","Grade","Remarks"]],
    body:  [
      ...result_rule.result.map((rr:any)=>[rr.percentage_from + "% to " +rr.percentage_to+ "%",rr.division,rr.grade,rr.remarks]),
      [ {content:"Passing Rule : "+result_rule.pass_rule,colSpan:4, styles:{cellPadding:2,textColor:"red"}}]

    ]  ,
    margin: { right: 15, left: 15, top: 30, bottom: 0 },
    theme: 'striped',
    styles: {fillColor: [200,200,200],   cellPadding: 1,halign:'center' ,textColor: "black",fontSize:10 },
  });
   let filename =stu.name.trim().toLowerCase().replace(/ /g, "-")+"_Mark-sheet.pdf"
  doc.save(filename);
}

export const sudentWiseTotalMark =  (examMarks:any ,examList:any) => {  
  let classStudentaList =examMarks.map((x:any)=>x.student).filter((value:any, index:number, array:any) => array.indexOf(value) === index)
  return classStudentaList.map((x:any)=>{
    return { student:x, ...examMarks.filter((y:any)=>(y.student==x)).map((z:any)=>{
     let subjectMarks= examList.find((el:any)=>el._id ==z.exam)?.subjectMarks.find((sm:any)=>sm.subject_id==z.subject) 
     return {exam:z.exam,class:z.class,section:z.section,marks:z.marks,max_mark:subjectMarks.max_mark,min_mark:subjectMarks.min_mark}    
    }).reduce((result:any,current:any)=>{
               return {...current,marks: +result.marks + +current.marks , max_mark: +result.max_mark + +current.max_mark , min_mark:  +result.min_mark + +current.min_mark }
    }, {marks: 0, max_mark: 0, min_mark: 0}) }
  }).map((x:any)=>{
    return {...x,percentage:CalculatePercentage(+x.marks, +x.max_mark)}
  }) 
 }

 export  const calculateUsedRoomCapcity=(seating:Seating[])=>{
  return  seating.reduce((result:number,current:Seating)=>{
     if(+current.roll_no_to!=0 &&  +current.roll_no_from !=0){
      return result  + (+current.roll_no_to - +current.roll_no_from)+1 
     }else{  return 0 }    
    },0)
 }
export const seatingPlanPdf =(exam:ExamType,classList:ClassOptionType[])=>{
  const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: "a4", putOnlyUsedFonts: true, floatPrecision: "smart", compress:true });
  autoTable(doc, {
    head: [[getSchoolName()]],
    body: [
      ["Seating Plan of " + exam.title + " " + exam.running_year],
    ],
    margin: { right: 10, left: 10, top: 5, bottom: 15 },
    theme: 'plain',
    headStyles: { fontSize: 10, halign: 'center', cellPadding: 0 },
    bodyStyles: { fontSize: 10, cellPadding: 0, halign: 'center' },
 
  });
  exam.exam_seating?.map((seat:any)=>{ 
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY+5  ,
      head:[[{content:seat.room_id.name,colSpan:2},seat.room_id.type,"Total Seat : "+seat.room_id.seat_capcity]],
      body: [["Class","Section", "Roll No From","Roll No To"],
           ...seat.seating.map((se:any)=>{ 
        let cls = classList.find((cl:any)=>cl._id==se.class_id) ;  
        let sec = cls?.section.find((s:any)=>s._id==se.section_id) ; 
         return [cls?.name,sec?.name,se.roll_no_from,se.roll_no_to ]})],      
      margin: { right: 10, left: 10, top: 5, bottom: 15 },
      theme:  'grid',
      bodyStyles:{lineWidth:1,  lineColor: [128, 128, 128],fontSize: 20,},  
      headStyles: { textColor: "black", fillColor: "white", fontStyle:'bold',fontSize: 20,  }, 
    });
  })

  doc.save("exam-seating-plan.pdf");
}