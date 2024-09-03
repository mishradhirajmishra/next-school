import Googlebtn from '../components/shared/utils/googlebtn'
import Signinform from '../components/frontend/signinform'
// import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

const Login = async() => {
//  const session= await getServerSession(authOptions)
//  if(session!=null){
//   redirect('/admin/admin-dashboard')
//  }  
  return (
    <div className='flex min-h-screen justify-center items-center'>
      <div className="mt-7 rounded-xl shadow-sm c-border-light">
        <div className="p-4 sm:p-7">       
          <div className="text-center">
            <h1 className="block text-2xl font-bold  c-text-light">Sign in</h1>
            <p className="mt-2 text-sm  c-text-dark">
              Don t have an account yet?
              <a className="ml-2  c-text-success decoration-2 hover:underline font-medium" href="">
                Sign up here
              </a>
            </p>
          </div>
          <div className="mt-5">
            <Googlebtn />
            <div className="or-divider">Or</div>
            <div className="grid gap-y-4">
              <Signinform />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login