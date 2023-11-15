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


export const createCategory = async (req:Request, res:Response) => {
    try {
      const {  category_name } = req.body;
  
      // Validate input data here if needed
      let category_id = v4()
      let result = dbhelper.execute('createCategory', {
        category_id,
        category_name
        })

  
      console.log(result);
  
      return res.status(201).json({
        message: 'Category created successfully',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  };
  

  export const getCategory = async (req: Request, res: Response) => {
    try {
      const categoryId = req.params.categoryId;
  
      const result = await dbhelper.query('SELECT * FROM categories WHERE category_id = ?', [categoryId]);
  
      if (result.recordset.length === 0) {
        return res.status(404).json({
          error: 'Category not found',
        });
      }
  
      const category = result.recordset[0];
  
      return res.status(200).json(category);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  };

  
  export const updateCategory = async (req: Request, res: Response) => {
    try {
      const categoryId = req.params.categoryId;
      const { category_name } = req.body;
  
      // Validate input data here if needed
  
      const result = await dbhelper.execute('UPDATE categories SET category_name=? WHERE category_id=?', [
        category_name,
        categoryId,
      ]);
  
      console.log(result);
  
      return res.status(200).json({
        message: 'Category updated successfully',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  };

  
  export const deleteCategory = async (req: Request, res: Response) => {
    try {
      const categoryId = req.params.categoryId;
  
      const result = await dbhelper.execute('DELETE FROM categories WHERE category_id=?', [categoryId]);
  
      console.log(result);
  
      return res.status(200).json({
        message: 'Category deleted successfully',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  };
  

  export const getAllCategories = async (req: Request, res: Response) => {
    try {
      const pool = await mssql.connect(sqlConfig)

      let categories = (await pool.request().execute('fetchAlCategories')).recordset
     

      return res.status(200).json({
        categories: categories
      })

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  };