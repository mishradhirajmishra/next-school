import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
declare module "next-auth" {
  interface Session {
    user: {
        _id: String;
        email: String;
        reg_no: String;
        name: String | null | undefined;
        gender: String;
        mobile: String;
        status: String;
        related_to: String
        emp_type: String;
        role?: String;
        class?:String;
        section?:String;
    } 

  }

  interface JWT {
    token: {
        _id: String;
        email: String;
        reg_no: String;
        name: String | null | undefined;
        gender: String;
        mobile: String;
        status: String;
        related_to: String
        emp_type: String;
        role?: String;
        class?:String;
        section?:String;
    } 
  }

  interface DefaultUser {
    _id: String;
    email: String;
    reg_no: String;
    name: String | null | undefined;
    gender: String;
    mobile: String;
    status: String;
    related_to: String
    emp_type: String;
    role?: String;
    class?:String;
    section?:String;
  }
}





declare module "next-auth/jwt" {
  interface JWT {
     _id: String;
    email: String;
    reg_no: String;
    name: String | null | undefined;
    gender: String;
    mobile: String;
    status: String;
    related_to: String
    emp_type: String;
    role?: String;
    class?:String;
    section?:String;
  }
}

