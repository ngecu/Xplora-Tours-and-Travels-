"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventsControllers_1 = require("../controllers/eventsControllers");
const verifyToken_1 = require("../middlewares/verifyToken");
const event_router = (0, express_1.Router)();
event_router.get("/allEvents", eventsControllers_1.getAllEvents);
event_router.get('/:eventId', eventsControllers_1.getIndividualEvent);
event_router.delete('/:event_id', verifyToken_1.verifyToken, eventsControllers_1.deleteEvent);
event_router.put('/:event_id', verifyToken_1.verifyToken, eventsControllers_1.updateEvent);
event_router.get('/filter/:searchTerm', eventsControllers_1.filterEventsByDestination);
event_router.post('/', verifyToken_1.verifyToken, eventsControllers_1.createEvent);
exports.default = event_router;
