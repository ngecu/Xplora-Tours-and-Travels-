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
exports.deleteEvent = exports.getAlEvents = exports.updateEvent = exports.getIndividualEvent = exports.createEvent = void 0;
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
            let { start_date, destination, duration, price, category_id } = req.body;
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
                event_id, destination, duration, start_date, price, category_id,
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
        const result = yield dbhelper.query('SELECT * FROM events WHERE event_id = ?', [eventId]);
        if (result.recordset.length === 0) {
            return res.status(404).json({
                error: 'Event not found',
            });
        }
        const event = result.recordset[0];
        return res.status(200).json(event);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
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
const getAlEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let events = (yield pool.request().execute('fetchAllEvents')).recordset;
        return res.status(200).json({
            events: events
        });
    }
    catch (error) {
        return res.json({
            error: error
        });
    }
});
exports.getAlEvents = getAlEvents;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { event_id } = req.params;
        console.log(event_id);
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const userExists = (yield pool
            .request()
            .input('user_id', mssql_1.default.VarChar(100), event_id)
            .execute('fetchOneEvent')).recordset;
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
