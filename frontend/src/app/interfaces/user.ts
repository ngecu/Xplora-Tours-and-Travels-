export interface User {
    user_id?:string;
    full_name: string;
    email: string;
    phone_number: string;
    password?: string;
    confirm_password?: string;
    active?:number
}