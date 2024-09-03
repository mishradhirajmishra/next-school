"use client"
import React, {  FC, useEffect, useState } from 'react'
import FilterField from '../../shared/forms-elements/filterfield';
import EditIcon from '../../shared/Icons/edit';
import { Delwarn, Delobj } from '../../shared/utils/delwarn';
import Swall from '../../shared/utils/swal';
import TablePagination from '../../shared/table/pegination';
import TableHeader from '../../shared/table/tableheader';
import {   DelBookApi, GetAllBookApi, GetAllBookIssueApi, GetAllClassApi, } from '../../shared/utils/apis';
import {  roomheadData } from '../../shared/model/roomhelper';
import { BookIssueType, BookType, bookHeadData, bookIssueHeadData, bookTypeInit } from '../../shared/model/libraryhelper';
import { Expendrow } from '../../shared/utils/helperfunction';
import ExpendIcon from '../../shared/Icons/expend';
import RightArrowIcon from '../../shared/Icons/rightarrow';
import { ClassType, Classinitial } from '../../shared/model/classhelper';
import Breadcrumb from '../../shared/utils/breadcrumb';
import DoubleArrowRightIcon from '../../shared/Icons/doubleArrowRight';
import LeftArrowIcon from '../../shared/Icons/leftarrow';
export interface AllBookProps {
  newData: BookType,
  reciveDataTobeEdited: (type:string,data: any) => void
}

const AllBook: FC<AllBookProps> = ({ newData, reciveDataTobeEdited }) => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [deleteData, seDeleteData] = useState({ showDelwarn: 0, _id: "" })
  const [rows, setrows] = useState<Array<BookType>>([bookTypeInit])
  const [rowsBacup, setrowsBacup] = useState<Array<BookType>>([bookTypeInit])
  const [classList, setClassList] = useState<Array<ClassType>>([Classinitial])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (newPage: number) => { setPage(newPage); };

  useEffect(() => { getClass() }, [newData])
  const getClass = async () => {
    const data = await GetAllClassApi(); 
    console.log(data.data)
    setClassList(data.data);
  }

  useEffect(() => { getBooks() }, [newData])
  const getBooks = async () => {
    let books = await GetAllBookApi();
    let bookissue = await GetAllBookIssueApi();
    const classList = await GetAllClassApi(); 
    const newBook = books.map((book:BookType)=>{
      book.issue=bookissue.filter((issue:BookIssueType)=>issue.book_id==book._id);

      if(book.issue?.length){       
        book.issue.map((issue:BookIssueType)=>{
           if(issue.student_id !=""){
            let sclass = classList.data.find((cl:ClassType)=>cl._id==issue.class)
            if(sclass){
              issue.class=sclass.name;issue.section=sclass.section.find((se:any)=>se._id==issue.section)?.name
            }
    
           }
          ; return issue})
      }

      return book})
 
    setrows(newBook); setrowsBacup( newBook)
  }
  const delBook = async (val: Delobj) => {
    if (val.delete) {
      let data = await  DelBookApi(val._id)
      getBooks()
      seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    }
  }

  return (
    <>
      <Swall swallData={alertData} />
      <Delwarn deleteData={deleteData} handeleDealate={(val) => { delBook(val) }} />
      <div className='absolute top-1'>
        <FilterField rows={rows} rowsBacup={rowsBacup} handleChange={(val: any) => { setrows(val) }} />
      </div>
      <div className="mt-5 relative   overflow-x-auto pb-5">
        <table >
          <thead>
            <TableHeader theadData={bookHeadData} rows={rows} updateRows={(val) => { setrows(val) }} />
          </thead>
          {rowsBacup && rowsBacup.length && rowsBacup[0]._id  ? <>
            {rows && (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((book, i) =>
              <tbody key={book._id}>
                <tr >
                <td className='cursor-pointer w-14'  onClick={() => { if(book.issue && book.issue.length) {setrows(Expendrow(book._id, rows))} }}><ExpendIcon  className={`${book.expend ? "rotate-90 " : ""}fill-svg-light duration-300 m-auto`} /></td>
                 <td>{book.sn}</td>
                  <td>{book.book_code}</td>
                  <td>{book.book_copy_code}</td>
                  <td>{book.title}</td> 
                  {book.issue && book.issue.length && book.issue?.find((bss:any)=>bss.return_date=="") ?
                      <td className={`${book.status=="Lost" ? "c-text-error":"c-text-dark"}`}>Not Available</td>  :
                      <td className={`${book.status=="Lost" ? "c-text-error":"c-text-success"}`}>{book.status}</td>  
                  }
                   
                  <td >{book.type}</td>       
                  <td className=' whitespace-nowrap'>
                    <button type='button' className='btn-outline-light p-1 mr-3 ' onClick={() => { reciveDataTobeEdited("edit",book) }}><EditIcon /></button>
                    {book.issue && book.issue.length && book.issue?.find((bss:any)=>bss.return_date=="") ?
                     <button type='button'disabled={true} className='btn-outline-light p-1 mr-3 ' > Issue <RightArrowIcon className ="fill-svg-success"/></button>:
                    <button type='button' className='btn-outline-light p-1 mr-3 ' onClick={() => { reciveDataTobeEdited("issue",book) }}> Issue <RightArrowIcon className ="fill-svg-success"/></button>}
                    {/* <button type='button' className='btn-outline-light p-1' onClick={() => { seDeleteData({ showDelwarn: Math.random(), _id: book._id }) }}><DeleteIcon /></button> */}
                  </td>
                </tr>
                {book.expend && <tr className='fade-in nested'>
                  <td className='p-1' colSpan={8} >
                    <span className='flex justify-center rows-center'>
                      <table>
                        <thead className='opacity-50'>
                        <TableHeader theadData={bookIssueHeadData} rows={rows} updateRows={(val) => { setrows(val) }} />
                        </thead>
                        <tbody>
                        {book.issue && book.issue.length && book.issue.map((bs:BookIssueType,i:number)=>
                        <tr key={bs._id}>
                          <td>{i+1}</td>
                          <td>
                         {bs.student_id !="" && <span>
                            <span className='block'>{bs.student_id?.name}</span>
                            <span className='opacity-35 text-xs flex gap-2'><span>{bs.class}</span> <RightArrowIcon/> <span>{bs.section}</span></span>
                             
                            </span>}
                            </td>
                          <td>
                            <span className='block'>{bs.employee_id?.name}</span>
                            <span className='opacity-35 text-xs flex gap-2'>{bs.employee_id?.role}</span>
                            </td>
                          <td>{bs.date_from}</td>
                          <td>{bs.date_to}</td>
                          <td>{bs.return_date}</td>
                          <td className=' whitespace-nowrap'>
                    <button disabled={bs.return_date !=""} type='button' className='btn-outline-light p-1 mr-3 ' onClick={() => { reciveDataTobeEdited("book-return",bs) }}><LeftArrowIcon className ="fill-svg-success"/> Return </button> </td>
                        </tr>
                        )}
                        </tbody>
                      </table>
                    </span>
                  </td>
                </tr>
                }
              </tbody>
            )}
          </> : <tbody><tr><td colSpan={8} className='text-center c-text-dark'>No Book found.</td></tr></tbody>}
   
        </table>
        {rowsBacup && rowsBacup.length>rowsPerPage && rowsBacup[0]._id  ?
                  <div className='max-w-[600px]'>
                <TablePagination
                  rowsPerPage={rowsPerPage}
                  page={page}
                  count={rows.length}
                  onPageChange={handleChangePage}
                  onShowBtnClick={(val) => { setRowsPerPage(val) }}
                  setPage={(val) => { setPage(val) }}
                />
              </div>: <></>}
      </div>
    </>
  )
}

export default AllBook;