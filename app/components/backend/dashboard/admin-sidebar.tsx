import React, { FC, useEffect, useState } from 'react'
import SingleMenu from './single-menu';
import MultiMenu from './multiple-menu';
import { AdminMenuList, TeacherMenuList, InitialMenuList } from './menuList';
import { useSession } from 'next-auth/react';

interface AdminSidebarProps { open: boolean }
const AdminSidebar: FC<AdminSidebarProps> = ({ open }) => {
  const { data: session, status } = useSession()
  const [menuList, setMenuList] = useState(InitialMenuList)
  useEffect(() => {
    if (session?.user.role == "Admin") { setMenuList(AdminMenuList) }
    if (session?.user.role == "Teacher") { setMenuList(TeacherMenuList) }
  }, [session])

  return (
    <ul className=''>
      {menuList != null && menuList.map((menu, i) => <li key={i} >
        {menu.multi ? <MultiMenu open={open} menudata={menu} /> : <SingleMenu open={open} menudata={menu} />}
      </li>)}
    </ul>
  )
}

export default AdminSidebar;