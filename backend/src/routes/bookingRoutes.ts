import { Router } from "express";
import { getUserBookings,createBooking, deleteBooking, getAllBookings, getOneBooking } from "../controllers/bookingControllers";
import { verifyToken } from "../middlewares/verifyToken";

const bookingRouter = Router();

bookingRouter.post('/create', createBooking);
bookingRouter.get('/allBookings', verifyToken, getAllBookings);
bookingRouter.get('/:id', verifyToken, getOneBooking);
bookingRouter.get('/user/:id', verifyToken, getUserBookings);

bookingRouter.delete('/:booking_id', verifyToken, deleteBooking);

export default bookingRouter;
