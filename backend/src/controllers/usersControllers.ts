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
        const phoneTaken = (await dbhelper.query(`SELECT * FROM users WHERE phone_number = '${phone_number}'`)).recordset

        if(!isEmpty(emailTaken)){
            return res.json({error: "This email is already in use"})
        }

           if(!isEmpty(phoneTaken)){
            return res.json({error: "This Phone Number is already in use"})
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


export const loginUser = async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const pool = await mssql.connect(sqlConfig);

        let user = await (await pool.request().input("email", email).input("password", password).execute('loginUser')).recordset;

        if (user[0]?.email == email) {
            const CorrectPwd = await bcrypt.compare(password, user[0]?.password);

            if (!CorrectPwd) {
                return res.status(401).json({
                    error: "Incorrect password"
                });
            }

            if (user[0]?.active === 0) {
                return res.status(401).json({
                    error: "Account deactivated, please contact admin"
                });
            }

            const LoginCredentials = user.map(records => {
                const { phone_number, password, ...rest } = records;
                return rest;
            });

            const token = jwt.sign(LoginCredentials[0], process.env.SECRET as string);

            return res.status(200).json({
                message: "Logged in successfully", token
            });
        } else {
            return res.json({
                error: "Email not found"
            });
        }
    } catch (error) {
        return res.json({
            error: error
        });
    }
};


export const deactivateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId; // Assuming you pass the user ID in the request parameters

        const pool = await mssql.connect(sqlConfig);

        const result = await pool.request()
            .input("userId", userId)
            .execute('deactivateUser'); // Assuming you have a stored procedure to deactivate a user

        if (result.rowsAffected[0] > 0) {
            return res.status(200).json({
                message: "User deactivated successfully"
            });
        } else {
            return res.status(404).json({
                error: "User not found"
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};


export const activateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId; // Assuming you pass the user ID in the request parameters

        const pool = await mssql.connect(sqlConfig);

        const result = await pool.request()
            .input("userId", userId)
            .execute('activateUser'); // Assuming you have a stored procedure to activate a user

        if (result.rowsAffected[0] > 0) {
            return res.status(200).json({
                message: "User activated successfully"
            });
        } else {
            return res.status(404).json({
                error: "User not found"
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};




export const manageProfile = async (req: Request, res: Response) => {
    try {
        const { current_password, new_password, email } = req.body;
        console.log(req.body);
        
        // Validate the request body using Joi or your preferred validation library
        // I'm assuming you have a validation schema named manageProfileSchema
        // const { error } = manageProfileSchema.validate(req.body);
        // if (error) {
        //     return res.status(400).json({ error: error.details[0].message });
        // }

        // Check if the email exists in the database
        const emailExists = (await dbhelper.query(`SELECT * FROM users WHERE email = '${email}'`)).recordset;

        if (!emailExists || emailExists.length === 0) {
            return res.status(404).json({ error: "Email not found" });
        }

        // Check if the current password matches the stored hashed password
        const storedPassword = emailExists[0].password;
        const isPasswordValid = await bcrypt.compare(current_password, storedPassword);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Incorrect current password" });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(new_password, 10);

        // Update the user's password in the database
        await dbhelper.execute('manageProfile', {
            new_password: hashedNewPassword,
            user_id: emailExists[0].user_id,
        });

        return res.status(200).json({
            message: 'Password reset successfully'
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
        console.log(req.info);
        
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
  