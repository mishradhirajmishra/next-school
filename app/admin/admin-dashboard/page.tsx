import { authOptions } from "@/app/api/auth/[...nextauth]/options";
  
// import { getServerSession } from "next-auth";

 
 const AdminDashboard=async()=> {
    // const session= await getServerSession(authOptions);
    return <>
          <div className="newBlack h-24 w-20">
 
          </div>
    {/* {session && JSON.stringify(session)} */}
    
    </>
}

export default AdminDashboard
