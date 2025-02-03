import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";


export interface IFormDataRegister {
    Name: string;
    Email: string;
    Password: string;
    PasswordConfirmation: string;
}

export interface IFormDataLogin {
    Email: string;
    Password: string;
}

export interface IUser extends User {
    accessToken?: string
    role?: string
}

export interface ISession extends Session {
    user?: IUser;
    accessToken?: string;
}
  
export interface IToken extends JWT {
    user?: IUser
}

export interface IFormDataProduct {
    Name: string;
    Description: string;
    Price: number;
    Stock: number;
}

export interface IProduct {
    ProductID: string;
    Name: string;
    Description: string;
    Price: number;
    Stock: number;
}