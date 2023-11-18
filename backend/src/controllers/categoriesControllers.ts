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

  export const getCategoriesWithTours = async (req: Request, res: Response) => {
    try {
      // Perform a SQL query to fetch categories and their associated tours
      const query = `
        SELECT
          c.category_id,
          c.category_name,
          e.event_id,
          e.event_name,
          e.image,
          e.destination,
          e.description,
          e.duration,
          e.start_date,
          e.price
        FROM
          categories c
        LEFT JOIN
          events e ON c.category_id = e.category_id
        WHERE
          e.active = 1;`;
  
      const result = await dbhelper.query(query);
  
      // Organize the data into a structure where each category has an array of associated tours
      const categories = result.recordset.reduce((acc, row) => {
        if (!acc[row.category_id]) {
          acc[row.category_id] = {
            category_id: row.category_id,
            category_name: row.category_name,
            tours: [],
          };
        }
  
        if (row.event_id) {
          acc[row.category_id].tours.push({
            event_id: row.event_id,
            event_name: row.event_name,
            image: row.image,
            destination: row.destination,
            description: row.description,
            duration: row.duration,
            start_date: row.start_date,
            price: row.price,
          });
        }
  
        return acc;
      }, {});
  
      const categoriesArray = Object.values(categories);
  
      return res.status(200).json(categoriesArray);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

export const getCategoryWithTours = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId;

    // Perform a SQL query to fetch a specific category and its associated tours
    const query = `
      SELECT
        c.category_id,
        c.category_name,
        e.event_id,
        e.event_name,
        e.image,
        e.destination,
        e.description,
        e.duration,
        e.start_date,
        e.price
      FROM
        categories c
      LEFT JOIN
        events e ON c.category_id = e.category_id
      WHERE
        c.category_id = @categoryId
        AND e.active = 1;`;

    const result = await dbhelper.query(query, { categoryId });

    // Check if the category exists
    if (result.recordset.length === 0) {
      return res.status(404).json({
        error: 'Category not found',
      });
    }

    // Organize the data into a structure where the category has an array of associated tours
    const category = {
      category_id: result.recordset[0].category_id,
      category_name: result.recordset[0].category_name,
      tours: result.recordset
        .filter((row) => row.event_id !== null)
        .map((row) => ({
          event_id: row.event_id,
          event_name: row.event_name,
          image: row.image,
          destination: row.destination,
          description: row.description,
          duration: row.duration,
          start_date: row.start_date,
          price: row.price,
        })),
    };

    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};
