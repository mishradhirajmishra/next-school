import React, { FC, useEffect, useState } from 'react'

interface TabBarProps {
  tabs: Array<String>
  selectedIndex?: Number
  onOptionClick: (option: number) => void    
}

const TabBar: FC<TabBarProps> = ({ tabs ,onOptionClick,selectedIndex=0}) => {  
  const [activeTab, setActiveTab] = useState(0);
   useEffect(()=>{
   // @ts-ignore
    setActiveTab(selectedIndex)
   },[selectedIndex])

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        {tabs.map((title, index) =>
          <li className="mr-2" key={index}>
            <button onClick={() => { setActiveTab(index);onOptionClick(index) }} className={`${activeTab == index ? "active-tab" : "in-active-tab"}`}>
              {title}
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default TabBar;