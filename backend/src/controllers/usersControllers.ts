import { Request, Response } from 'express'
import mssql from 'mssql'
import {v4} from 'uuid'
import bcrypt from 'bcrypt'
import { sqlConfig } from '../config/sqlConfig'
import jwt from 'jsonwebtoken'
import Connection from '../dbhelpers/dbhelpers'
import { manageProfileSchema, registerUserSchema } from '../validators/validators'
import { isEmpty } from 'lodash'
import { ExtendedUser } from '../middlewares/verifyToken'

const dbhelper = new Connection
 
export const registerUser = async(req:Request, res: Response) =>{
    try {
        console.log(req.body);
        
        let {full_name,email,phone_number,password} = req.body

        let {error} = registerUserSchema.validate(req.body)

        if(error){
            console.log(error.details[0].message);
            
            return res.status(404).json({error: error.details[0].message})
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


export const manageProfile = async (req: Request, res: Response) => {
    try {
        const { current_password,new_password,email } = req.body;

        const { error } = manageProfileSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const emailTaken = (await dbhelper.query(`SELECT * FROM users WHERE email = '${email}'`)).recordset;

        if (!isEmpty(emailTaken)) {
            return res.status(409).json({ error: "This email is already in use" });
        }

        // const user_id = uuidv4();

        const hashedPwd = await bcrypt.hash(new_password, 10);

        await dbhelper.execute('manageProfile', {
            new_password: hashedPwd
        });

        return res.status(200).json({
            message: 'Profile managed successfully'
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};




async function sendPasswordChangeAttemptEmail(email: string) {
    console.log(`Email sent to ${email}: Password change attempt detected.`);
}

export const checkUserDetails = async (req:ExtendedUser, res:Response)=>{
    
    if(req.info){

        return res.json({
            info: req.info 
        })
    }
    
}


export const getAllUsers =  async (req:ExtendedUser, res:Response)=>{
    try {

        const pool = await mssql.connect(sqlConfig)

        let users = (await pool.request().execute('fetchAllUsers')).recordset
       

        return res.status(200).json({
            users: users
        })
        
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

export const getOneUser = async(req:Request, res:Response)=>{
    try {

        let id = req.params.id 

        const pool = await mssql.connect(sqlConfig)

        let user = (await pool.request().input('user_id',id).execute('fetchOneUser')).recordset

        return res.status(200).json({
            user: user
        })
        
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

export const deleteUser = async (req: ExtendedUser, res: Response) => {
    try {
      const { user_id } = req.params;
      console.log(user_id);
      
  
      const pool = await mssql.connect(sqlConfig);
  
      // Check if the user exists before attempting deletion
      const userExists = (await pool
        .request()
        .input('user_id', mssql.VarChar(100), user_id)
        .execute('fetchOneUser')).recordset;
  
      if (!userExists.length) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Delete the user
      await pool.request().input('user_id', mssql.VarChar(100), user_id).execute('deleteUser');
  
      return res.status(200).json({message:"Deleted Successfully"}); // Successful deletion, no content response
    } catch (error) {
      return res.status(500).json({
        error: error.message || 'Internal Server Error',
      });
    }
  };
  