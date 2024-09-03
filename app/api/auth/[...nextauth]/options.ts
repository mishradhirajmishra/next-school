
import Credentials from "next-auth/providers/credentials";
import { AuthOptions} from "next-auth";
import connectDB from "@/app/server/helper/dbconnect";
import { Employee } from "@/app/server/model/employee";
//@ts-ignore
import bcrypt from 'bcrypt';
import { Class } from "@/app/server/model/class";
import { baseHostUrl } from "@/app/server/helper/key";
 

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Welcome Back",
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        connectDB()
        try {
          const emp = await Employee.findOne({ email: credentials?.email }, { emp_id: 1, reg_no: 1, name: 1, gender: 1, mobile: 1, email: 1, password: 1, status: 1, related_to: 1, role: 1, emp_type: 1 })
          if (emp) {
            const validPassword = await bcrypt.compare(credentials?.password, emp.password);
            if (validPassword) {
              if (emp.role == "Teacher") {
                let response = await Class.find({}, { "name": 1, "section.class_teacher": 1, "section.name": 1, "section._id": 1 })
                response.map((cl: any) => {
                  cl.section.map((sec: any) => {
                    if (sec.class_teacher == emp._id) { emp.class = cl._id; emp.section = sec._id; }
                  })
                })
                console.log("llllll", emp)
                return emp;
              } else {
                return emp;
              }

            } else { return null }
          } else { return null }
        } catch (error) { console.log("The error is ", error); }

      },

    }),

  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
       return baseHostUrl 
      },

    async jwt({ token, user, account, profile }) {

      if (user) {
        token._id = user._id.toString();
        token.emp_id = user._id.toString();
        token.reg_no = user.reg_no;
        token.name = user.name;
        token.gender = user.gender;
        token.mobile = user.mobile;
        token.status = user.status;
        token.related_to = user.related_to;
        token.role = user.role;
        token.emp_type = user.emp_type;
        token.class = user.class;
        token.section = user.section;
      }

      return token
    },
    //@ts-ignore
    async session({ session, token }) {
      if (token) {
        session.user = token
      }
      return session
    }
  },
  secret: "nxsbdsajdasnfja",
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, // 1day
  },
  jwt: {
    // secret: process.env.NEXTAUTH_SECRET,
    secret: "nxsbdsajdasnfja",
    // encryption: true,
  },
}


// await getServerSession(authOptions)   used in server page
