import { Request, Response } from 'express'
import mssql from 'mssql'
import {v4} from 'uuid'
import bcrypt from 'bcrypt'
import { sqlConfig } from '../config/sqlConfig'
import jwt from 'jsonwebtoken'
// import dotenv from 'dotenv'
import { LoginUser } from '../interfaces/employee'
import { ExtendedUser } from '../middleware/verifyToken'
import Connection from '../dbhelpers/dbhelpers'
import { registerUserSchema } from '../validators/validators'
import { isEmpty } from 'lodash'

const dbhelper = new Connection
 
export const registerUser = async(req:Request, res: Response) =>{
    try {
        let {full_name,email,phone_number,password} = req.body

        let {error} = registerUserSchema.validate(req.body)

        if(error){
            return res.status(404).json({error: error.details})
        }

        const emailTaken = (await dbhelper.query(`SELECT * FROM users WHERE email = '${email}'`)).recordset

        if(!isEmpty(emailTaken)){
            return res.json({error: "This email is already in use"})
        }
        
        let user_id = v4()

        const hashedPwd = await bcrypt.hash(password, 10)
        
        let result = dbhelper.execute('registerUser', {
            user_id, full_name, email, phone_number, password: hashedPwd
        })
        
        console.log(result);

        return res.status(200).json({
            message: 'User registered successfully'
        })
        
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

export const loginUser = async(req:Request, res: Response) =>{
    try {
        const {email, password} = req.body

        const pool = await mssql.connect(sqlConfig)

        let user = await (await pool.request().input("email", email).input("password", password).execute('loginUser')).recordset
        
        if(user[0]?.email  == email){
            const CorrectPwd = await bcrypt.compare(password, user[0]?.password)

            if(!CorrectPwd){
                return res.status(401).json({
                    error: "Incorrect password"
                })
            }

            const LoginCredentials = user.map(records =>{
                const {phone_number,password, ...rest}=records

                return rest
            })

            console.log(LoginCredentials);

           
            const token = jwt.sign(LoginCredentials[0], process.env.SECRET as string, {
                expiresIn: '3600s'
            }) 

            return res.status(200).json({
                message: "Logged in successfully", token
            })
            
        }else{
            return res.json({
                error: "Email not found"
            })
        }

    } catch (error) {
        return res.json({
            error: error
        })
    }
}
