import { Request, Response } from "express";
import { createEventSchema } from "../validators/validators";
import mssql from 'mssql'
import {v4} from 'uuid'

import jwt from 'jsonwebtoken'
import Connection from '../dbhelpers/dbhelpers'

const dbhelper = new Connection

export async function createEvent(req:Request, res:Response) {
    try {
      let {destination,duration,price,category_id} = req.body
      let {error} = createEventSchema.validate(req.body)

      if(error){
        return res.status(404).json({error: error.details})
    }

    const eventExists = (await dbhelper.query(`SELECT * FROM events WHERE destination = '${destination}'`)).recordset


    if(!isEmpty(eventExists)){
        return res.json({error: "This event already exists"})
    }

    let event_id = v4()

    let result = dbhelper.execute('createEvent', {
        event_id,destination,duration,price,category_id
    })

    console.log(result);

    return res.status(200).json({
        message: 'Event created successfully'
    })


    } catch (error) {
      res.status(400).send(error);
    }
  }
  


  export async function getEvents(req:Request, res:Response) {
    try {
      const events = await Event.find();
      res.status(200).send(events);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  