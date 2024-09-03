"use client"

export default function Rightsidebar({children,drawerWidth,openDrawer,setOpenDrawer}: { children: React.ReactNode,drawerWidth:string,openDrawer:boolean,setOpenDrawer:(option:boolean)=>void}) {
  return (
      <aside className={`${openDrawer ? "w-full" : "w-0"} duration-0 cursor-pointer z-0 right-0 absolute min-h-[calc(100vh-48px)]`}>
        <div onClick={() => { setOpenDrawer(false) }} className="c-bg-dark bg-opacity-50  h-[calc(100vh-48px)] absolute w-full"></div>
        <div className={`${openDrawer ? drawerWidth : "w-0"} c-bg-dark cursor-default z-10 duration-500 pt-5 right-0 absolute h-[calc(100vh-48px)]`}>
          <div className={`${openDrawer ? drawerWidth : "hidden"}`}></div>
          {children}
        </div>     
      </aside >   
  )
}

