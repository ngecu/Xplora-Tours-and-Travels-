import { Router } from "express";
import { createEvent, deleteEvent, getAlEvents, getIndividualEvent, updateEvent } from "../controllers/eventsControllers";
import { getAllProjects } from "../controllers/projectControlles";
import { verifyToken } from "../middlewares/verifyToken";

const event_router = Router();

event_router.get("/allEvents",verifyToken,getAlEvents)
event_router.get('/:id', verifyToken, getIndividualEvent)
event_router.delete('/:event_id', verifyToken, deleteEvent)
event_router.put('/:event_id', verifyToken, updateEvent)
event_router.post('/', createEvent)


export default event_router;
