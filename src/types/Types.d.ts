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
    Picture?: AnyPresentValue;
}

export interface IProduct {
    ProductID?: string;
    Name: string;
    Description: string;
    Price: number;
    Stock: number;
    Picture?: AnyPresentValue;
    CreatedAt?: string;
    UpdatedAt?: string;
}

export interface ICart {
    CartID?: number;
    CreatedAt: string;
    UpdatedAt: string;
    isActive: boolean;
}

export interface ICartItem {
    CartItemID?: number;
    CartID: number;
    ProductID: number;
    Quantity: number;
    Products?: IProduct;
}

export interface IFromDataAddress {
    CartID?: number;
    AddressLine1: string;
    AddressLine2?: string;
    City: string;
    State: string;
    ZipCode: string;
}

export interface IOrder {
    OrderID?: number;
    CartID: number;
    OrderDate: string;
    TotalAmount: number;
}