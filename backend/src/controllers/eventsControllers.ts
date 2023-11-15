import { Request, Response } from "express";
import { createEventSchema } from "../validators/validators";
import mssql from 'mssql'
import {v4} from 'uuid'

import jwt from 'jsonwebtoken'
import Connection from '../dbhelpers/dbhelpers'
import { ExtendedUser } from "../middlewares/verifyToken";
import { sqlConfig } from "../config/sqlConfig";
import { isEmpty } from 'lodash'

const dbhelper = new Connection

export async function createEvent(req:Request, res:Response) {
    try {
      let {start_date,destination,duration,price,category_id} = req.body

      console.log(req.body);
      
      let {error} = createEventSchema.validate(req.body)

      if(error){
        return res.status(404).json({error: error.details[0].message})
    }

    const eventExists = (await dbhelper.query(`SELECT * FROM events WHERE destination = '${destination}'`)).recordset


    if(!isEmpty(eventExists)){
        return res.json({error: "This event already exists"})
    }

    let event_id = v4()

    let result = dbhelper.execute('createEvent', {
        event_id,destination,duration,start_date,price,category_id,
    })

    console.log(result);

    return res.status(200).json({
        message: 'Event created successfully'
    })


    } catch (error) {
      console.log(error);
      
      res.status(400).send(error);
    }
  }
  

  export const getIndividualEvent = async (req:Request, res:Response) => {
    try {
      const eventId = req.params.eventId;
  
      const result = await dbhelper.query('SELECT * FROM events WHERE event_id = ?', [eventId]);
  
      if (result.recordset.length === 0) {
        return res.status(404).json({
          error: 'Event not found',
        });
      }
  
      const event = result.recordset[0];
  
      return res.status(200).json(event);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  };
  

  export const updateEvent = async (req:Request, res:Response) => {
    try {
      const eventId = req.params.eventId;
      const { destination, duration, start_date, price, category_id } = req.body;
  
      // Validate input data here if needed
  
      const result = await dbhelper.execute('UPDATE events SET destination=?, duration=?, start_date=?, price=?, category_id=? WHERE event_id=?', [
        destination,
        duration,
        start_date,
        price,
        category_id,
        eventId,
      ]);
  
      console.log(result);
  
      return res.status(200).json({
        message: 'Event updated successfully',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  };
  

  export const getAlEvents =  async (req:ExtendedUser, res:Response)=>{
    try {

        const pool = await mssql.connect(sqlConfig)

        let events = (await pool.request().execute('fetchAllEvents')).recordset
       

        return res.status(200).json({
          events: events
        })
        
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

export const deleteEvent = async (req: ExtendedUser, res: Response) => {
  try {
    const { event_id } = req.params;
    console.log(event_id);
    

    const pool = await mssql.connect(sqlConfig);

    const userExists = (await pool
      .request()
      .input('user_id', mssql.VarChar(100), event_id)
      .execute('fetchOneEvent')).recordset;

    if (!userExists.length) {
      return res.status(404).json({ error: 'Event not found' });
    }

    await pool.request().input('user_id', mssql.VarChar(100), event_id).execute('deleteEvent');

    return res.status(200).json({message:"Deleted Successfully"}); // Successful deletion, no content response
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Internal Server Error',
    });
  }
};