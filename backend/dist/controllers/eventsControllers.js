"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterEventsByDestination = exports.activateEvent = exports.deactivateEvent = exports.getOneEvent = exports.getAllEvents = exports.deleteEvent = exports.updateEvent = exports.getIndividualEvent = exports.createEvent = void 0;
const validators_1 = require("../validators/validators");
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const dbhelpers_1 = __importDefault(require("../dbhelpers/dbhelpers"));
const sqlConfig_1 = require("../config/sqlConfig");
const lodash_1 = require("lodash");
const dbhelper = new dbhelpers_1.default;
function createEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { event_name, start_date, destination, description, image, duration, price, category_id } = req.body;
            console.log(req.body);
            let { error } = validators_1.createEventSchema.validate(req.body);
            if (error) {
                return res.status(404).json({ error: error.details[0].message });
            }
            const eventExists = (yield dbhelper.query(`SELECT * FROM events WHERE destination = '${destination}'`)).recordset;
            if (!(0, lodash_1.isEmpty)(eventExists)) {
                return res.json({ error: "This event already exists" });
            }
            let event_id = (0, uuid_1.v4)();
            let result = dbhelper.execute('createEvent', {
                event_id, event_name, destination, duration, start_date, price, category_id, description, image
            });
            console.log(result);
            return res.status(200).json({
                message: 'Event created successfully'
            });
        }
        catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    });
}
exports.createEvent = createEvent;
const getIndividualEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.eventId;
        const result = yield dbhelper.query(`SELECT * FROM events WHERE event_id = '${eventId}'`);
        if (result.recordset.length === 0) {
            return res.status(404).json({
                status: 'Not Found',
                error: 'Event not found',
            });
        }
        const event = result.recordset[0];
        // Calculate status based on start date
        const today = new Date();
        const eventStartDate = new Date(event.start_date);
        if (eventStartDate > today) {
            event.status = 'Upcoming';
        }
        else if (eventStartDate.toDateString() === today.toDateString()) {
            event.status = 'Ongoing';
        }
        else {
            event.status = 'Past';
        }
        return res.status(200).json(event);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'Internal Server Error',
            error: 'Internal server error',
        });
    }
});
exports.getIndividualEvent = getIndividualEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.eventId;
        const { destination, duration, start_date, price, category_id } = req.body;
        // Validate input data here if needed
        const result = yield dbhelper.execute('UPDATE events SET destination=?, duration=?, start_date=?, price=?, category_id=? WHERE event_id=?', [
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal server error',
        });
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { event_id } = req.params;
        console.log(event_id);
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const userExists = (yield pool
            .request()
            .input('user_id', mssql_1.default.VarChar(100), event_id)
            .execute('deleteEvent')).recordset;
        if (!userExists.length) {
            return res.status(404).json({ error: 'Event not found' });
        }
        yield pool.request().input('user_id', mssql_1.default.VarChar(100), event_id).execute('deleteEvent');
        return res.status(200).json({ message: "Deleted Successfully" }); // Successful deletion, no content response
    }
    catch (error) {
        return res.status(500).json({
            error: error.message || 'Internal Server Error',
        });
    }
});
exports.deleteEvent = deleteEvent;
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let events = (yield pool.request().execute('fetchAllEvents')).recordset;
        // Add status logic to each event
        const today = new Date();
        const eventsWithStatus = events.map(event => {
            const eventStartDate = new Date(event.start_date);
            const eventEndDate = new Date(eventStartDate);
            eventEndDate.setDate(eventEndDate.getDate() + event.duration);
            if (eventStartDate <= today && today <= eventEndDate) {
                return Object.assign(Object.assign({}, event), { status: 'Ongoing' });
            }
            else if (eventStartDate > today) {
                return Object.assign(Object.assign({}, event), { status: 'Upcoming' });
            }
            else {
                return Object.assign(Object.assign({}, event), { status: 'Past' });
            }
        });
        return res.status(200).json({
            events: eventsWithStatus,
        });
    }
    catch (error) {
        return res.json({
            error: error,
        });
    }
});
exports.getAllEvents = getAllEvents;
const getOneEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.params.id;
        const event = (yield dbhelper.query(`EXEC getEvntById @event_id = '${id}'`)).recordset;
        return res.status(200).json({
            event: event,
        });
    }
    catch (error) {
        return res.json({
            error: error,
        });
    }
});
exports.getOneEvent = getOneEvent;
const deactivateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.eventId; // Assuming you pass the user ID in the request parameters
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.request()
            .input("eventId", eventId)
            .execute('deactivateevent'); // Assuming you have a stored procedure to deactivate a user
        if (result.rowsAffected[0] > 0) {
            return res.status(200).json({
                message: "Event deactivated successfully"
            });
        }
        else {
            return res.status(404).json({
                error: "Event not found"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});
exports.deactivateEvent = deactivateEvent;
const activateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.eventId; // Assuming you pass the user ID in the request parameters
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.request()
            .input("eventId", eventId)
            .execute('activateEvent'); // Assuming you have a stored procedure to activate a user
        if (result.rowsAffected[0] > 0) {
            return res.status(200).json({
                message: "Event activated successfully"
            });
        }
        else {
            return res.status(404).json({
                error: "Event not found"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});
exports.activateEvent = activateEvent;
const filterEventsByDestination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { destination } = req.params;
        if (!destination) {
            return res.status(400).json({
                error: 'Destination parameter is missing.',
            });
        }
        const query = `EXEC filterEventsByDestination @destination = '${destination}'`;
        const filteredEvents = (yield dbhelper.query(query)).recordset;
        return res.status(200).json({
            filteredEvents: filteredEvents,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});
exports.filterEventsByDestination = filterEventsByDestination;
