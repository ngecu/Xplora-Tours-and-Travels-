import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { ExtendedUser } from '../middlewares/verifyToken';
import Connection from '../dbhelpers/dbhelpers';

const dbhelper = new Connection;

export const createBooking = async (req: Request, res: Response) => {
  try {
    console.log("booking ",req.body);

    let  event_id = req.body.event_id.event_id;
    let  user_id = req.body.user_id;

    let booking_id = v4();
    

    let result = await dbhelper.execute('createBooking', {
      booking_id,
      event_id,
      user_id,
    });

    console.log(result);

    return res.status(200).json({
      message: 'Booking created successfully',
    });

  } catch (error) {
    console.log(error);

    return res.json({
      error: error,
    });
  }
};

export const getAllBookings = async (req: ExtendedUser, res: Response) => {
  try {
    const bookings = (await dbhelper.query('EXEC fetchAllBookings')).recordset;

    return res.status(200).json({
      bookings: bookings,
    });

  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

export const getUserBookings = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;

    const booking = (await dbhelper.query(`EXEC getBookingById @booking_id = '${id}'`)).recordset;

    return res.status(200).json({
      booking: booking,
    });

  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

export const getOneBooking = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;

    const booking = (await dbhelper.query(`EXEC getBookingById @booking_id = '${id}'`)).recordset;

    return res.status(200).json({
      booking: booking,
    });

  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

export const deleteBooking = async (req: ExtendedUser, res: Response) => {
  try {
    const { booking_id } = req.params;

    // Check if the booking exists before attempting deletion
    const bookingExists = (await dbhelper.query(`EXEC getBookingById @booking_id = '${booking_id}'`)).recordset;

    if (!bookingExists.length) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Delete the booking
    await dbhelper.query(`EXEC deleteBooking @booking_id = '${booking_id}'`);

    return res.status(200).json({ message: 'Booking deleted successfully' });

  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Internal Server Error',
    });
  }
};

