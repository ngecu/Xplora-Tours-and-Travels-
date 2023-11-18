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
      let {event_name,start_date,destination,description,image,duration,price,category_id} = req.body

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
        event_id,event_name,destination,duration,start_date,price,category_id,description,image
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
  

  export const getIndividualEvent = async (req: Request, res: Response) => {
    try {
      const eventId = req.params.eventId;
  
      const result = await dbhelper.query(`SELECT * FROM events WHERE event_id = '${eventId}'`);
  
      if (result.recordset.length === 0) {
        return res.status(404).json({
          status: 'Not Found',
          error: 'Event not found',
        });
      }
  
      const event = result.recordset[0];
  
     
      const today = new Date();
      const eventStartDate = new Date(event.start_date);
  
      if (eventStartDate > today) {
        event.status = 'Upcoming';
      } else if (eventStartDate.toDateString() === today.toDateString()) {
        event.status = 'Ongoing';
      } else {
        event.status = 'Past';
      }
  
      return res.status(200).json(event);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 'Internal Server Error',
        error: 'Internal server error',
      });
    }
  };
  
  
  

  export const updateEvent = async (req:Request, res:Response) => {
    try {
      const eventId = req.params.eventId;
      const { destination, duration, start_date, price, category_id } = req.body;
  
      console.log(eventId,req.body);
      
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
  



export const deleteEvent = async (req: ExtendedUser, res: Response) => {
  try {
    const { event_id } = req.params;
    console.log(event_id);
    

    const pool = await mssql.connect(sqlConfig);

    const eventExists = (await pool
      .request()
      .input('event_id', mssql.VarChar(100), event_id)
      .execute('deleteEvent')).recordset;

    if (!eventExists.length) {
      return res.status(404).json({ error: 'Event not found' });
    }

    await pool.request().input('event_id', mssql.VarChar(100), event_id).execute('deleteEvent');

    return res.status(200).json({message:"Deleted Successfully"}); // Successful deletion, no content response
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Internal Server Error',
    });
  }
};

export const getAllEvents = async (req: ExtendedUser, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);

    let events = (await pool.request().execute('fetchAllEvents')).recordset;

    // Add status logic to each event
    const today = new Date();
    const eventsWithStatus = events.map(event => {
      const eventStartDate = new Date(event.start_date);
      const eventEndDate = new Date(eventStartDate);
      eventEndDate.setDate(eventEndDate.getDate() + event.duration);

      if (eventStartDate <= today && today <= eventEndDate) {
        return { ...event, status: 'Ongoing' };
      } else if (eventStartDate > today) {
        return { ...event, status: 'Upcoming' };
      } else {
        return { ...event, status: 'Past' };
      }
    });

    return res.status(200).json({
      events: eventsWithStatus,
    });

  } catch (error) {
    return res.json({
      error: error,
    });
  }
};


export const getOneEvent = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;

    const event = (await dbhelper.query(`EXEC getEvntById @event_id = '${id}'`)).recordset;

    return res.status(200).json({
      event: event,
    });

  } catch (error) {
    return res.json({
      error: error,
    });
  }
};



export const deactivateEvent = async (req: Request, res: Response) => {
  try {
      const eventId = req.params.eventId; // Assuming you pass the user ID in the request parameters

      const pool = await mssql.connect(sqlConfig);

      const result = await pool.request()
          .input("eventId", eventId)
          .execute('deactivateevent'); // Assuming you have a stored procedure to deactivate a user

      if (result.rowsAffected[0] > 0) {
          return res.status(200).json({
              message: "Event deactivated successfully"
          });
      } else {
          return res.status(404).json({
              error: "Event not found"
          });
      }
  } catch (error) {
      return res.status(500).json({
          error: error.message
      });
  }
};


export const activateEvent = async (req: Request, res: Response) => {
  try {
      const eventId = req.params.eventId; // Assuming you pass the user ID in the request parameters

      const pool = await mssql.connect(sqlConfig);

      const result = await pool.request()
          .input("eventId", eventId)
          .execute('activateEvent'); // Assuming you have a stored procedure to activate a user

      if (result.rowsAffected[0] > 0) {
          return res.status(200).json({
              message: "Event activated successfully"
          });
      } else {
          return res.status(404).json({
              error: "Event not found"
          });
      }
  } catch (error) {
      return res.status(500).json({
          error: error.message
      });
  }
};

export const filterEventsByDestination = async (req: ExtendedUser, res: Response) => {
  try {
    const searchTerm = req.params.searchTerm;

    const pool = await mssql.connect(sqlConfig);
    console.log(searchTerm);
    
    const result = await pool.request()
      .input('searchTerm', mssql.NVarChar(255), `%${searchTerm}%`)
      .execute('filterEventsBySearchTerm');

    const selectedEvents = result.recordset;

    // Check if any events were found
    if (selectedEvents.length === 0) {
      return res.status(404).json({ error: 'No events found' });
    }

    res.status(200).json({
      events: selectedEvents,
    });

  } catch (error) {
    console.error('Error fetching filtered events:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const updateEventActiveStatus = async (req: ExtendedUser, res: Response) => {
  try {
      const eventId = req.params.event_id;
      const { active } = req.body;

      console.log(req);
      
  
      const updateQuery = `
        UPDATE events
        SET active = @active
        WHERE event_id = @event_id;
        SELECT * FROM events WHERE event_id = @eventId;
      `;
  
      const pool = await mssql.connect(sqlConfig);
  
      const result = await pool.request()
        .input('active', mssql.Int, active)
        .input('eventId', mssql.VarChar(500), eventId)
        .query(updateQuery);
  
      const updatedEvent = result.recordset[0];
  
      // Check if any rows were affected
      if (!updatedEvent) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      res.status(200).json(updatedEvent);
    } catch (error) {
      console.error('Error updating event activation status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};