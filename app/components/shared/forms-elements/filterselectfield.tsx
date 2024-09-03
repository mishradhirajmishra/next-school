// "use client"
// import React, { FC, useState } from 'react'
// import PlusIcon from '../Icons/plus';
// import SearchIcon from '../Icons/search';

// interface FilterSelectFieldProps { 
//   rowsBacup: Array<any>,
//   rows: Array<any>,
//   options: Array<any>,
//   handleChange:(option:any)=>void
// }

// const FilterSelectField: FC<FilterSelectFieldProps> = ({rowsBacup,options, rows, handleChange }) => {
//   const [text,settext]=useState("")
//   return (
//     <div className="relative max-w-sm">
//     <select
//     value={text}
//      className="c-input pl-8"   
//       onChange={(e)=>{
//         let searchText = e.target.value
//         settext(searchText)    
      
//       }}
//        >
// {options.map((option, index) => <option key={index} value={option} >{option.name}</option>)}
 
//        </select>
 
//  </div>
//   )
// }

// export default FilterSelectField;