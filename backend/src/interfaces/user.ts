import { Request } from "express";

export interface User {
    user_id: string,
    full_name: string,
    email: string,
    phone_number: string,
    password: string,
    role: number
}

export interface LoginUser extends Request {
    email: string,
    password: string
}
