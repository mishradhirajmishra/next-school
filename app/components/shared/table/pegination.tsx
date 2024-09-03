import React, { FC, useEffect, useState } from 'react'
import LeftArrowIcon from '../Icons/leftarrow';
import RightArrowIcon from '../Icons/rightarrow';

interface TablePaginationProps {
    rowsPerPage: number,
    page: number,
    count: number,
    onPageChange: (newPage: number) => void
    onShowBtnClick: (option: number) => void
    setPage: (option: number) => void
}

const TablePagination: FC<TablePaginationProps> = ({ rowsPerPage, page, count, onPageChange, onShowBtnClick, setPage }) => {
    const [active, setactive] = useState(0)
    const [showLimit, setshowLimit] = useState(1)    
    const [totalPage, settotalPage] = useState(0)
    useEffect(() => { settotalPage(Math.ceil(count / rowsPerPage)) }, [count,rowsPerPage])
    return (
        <div className="flex items-center justify-between mt-3">
            <div className='whitespace-nowrap c-text-dark pt-3 mr-4 c-border-t-light'>COUNT : {count}</div>
            {rowsPerPage != count &&
                <div className=" w-full  flex items-center justify-between c-border-t-light">
                    <button disabled={active == 0} onClick={() => { if (active > 0) { onPageChange(active - 1); setactive(active - 1) } }} className="peg-no-prev-next mr-3"> <LeftArrowIcon /><p className="ml-2">Prev</p></button>
                    <div className="sm:flex hidden">
                        {count > 50 ? <>  {active > showLimit + 1 && <>
                            <button onClick={() => { onPageChange(0); setactive(0) }} className={`peg-no`}>{0 + 1}</button>
                            <span className='mt-2 mx-3'> ...</span></>}                       
                            {Array.from(Array(totalPage).keys()).map((pg, i) => {
                                if (i <= showLimit + active) {
                                    return <button hidden={active - i > showLimit} onClick={() => { onPageChange(pg); setactive(pg) }} key={i} className={`${active == i ? "peg-no-act" : "peg-no"}`}>{pg + 1}</button>
                                }
                            }
                            )}
                            {totalPage - active > showLimit + 1 && <>
                                <span className='mt-2 mx-3'>...</span>
                                <button onClick={() => { onPageChange(totalPage - 1); setactive(totalPage - 1) }} className={`peg-no`}>{totalPage}</button>
                            </>}
                        </> :
                            <>                             
                                {Array.from(Array(totalPage).keys()).map((pg, i) =>
                                    <button onClick={() => { onPageChange(pg); setactive(pg) }} key={i} className={`${active == i ? "peg-no-act" : "peg-no"}`}>{pg + 1}</button>
                                )}
                            </>
                        }
                    </div>
                    <button disabled={active == totalPage - 1} onClick={() => { if (active < totalPage - 1) { onPageChange(active + 1); setactive(active + 1) } }} className="peg-no-prev-next ml-3"><p className="mr-2">Next</p><RightArrowIcon /></button>
                </div>}
            <div className='pt-3 ml-4 c-border-t-light'>
                <button className='btn-link-success py-0 whitespace-nowrap' onClick={() => { setPage(0); setactive(0); if (rowsPerPage == count) { onShowBtnClick(10) } else { onShowBtnClick(count) } }}>{rowsPerPage == count ? "SHOW 10" : "SHOW ALL"}
                </button>
            </div>
        </div>
    )
}

export default TablePagination;