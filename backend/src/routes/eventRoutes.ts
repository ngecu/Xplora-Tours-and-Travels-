import { Router } from "express";
import { createEvent, deleteEvent, filterEventsByDestination, getAlEvents, getAllEvents, getIndividualEvent, updateEvent } from "../controllers/eventsControllers";
import { verifyToken } from "../middlewares/verifyToken";

const event_router = Router();

event_router.get("/allEvents",verifyToken,getAllEvents)
event_router.get('/:eventId', verifyToken, getIndividualEvent)
event_router.delete('/:event_id', verifyToken, deleteEvent)
event_router.put('/:event_id', verifyToken, updateEvent)
event_router.get('/filter/:searchTerm', filterEventsByDestination)


event_router.post('/',verifyToken, createEvent)


export default event_router;
