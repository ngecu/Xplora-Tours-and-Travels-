import { Router } from "express";
import { getAllProjects } from "../controllers/projectControlles";

const event_router = Router();

event_router.get("/event", getAllProjects);

export default event_router;
