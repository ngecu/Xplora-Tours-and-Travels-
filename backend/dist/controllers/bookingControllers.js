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
exports.deleteBooking = exports.getOneBooking = exports.getUserBookings = exports.getAllBookings = exports.createBooking = void 0;
const uuid_1 = require("uuid");
const dbhelpers_1 = __importDefault(require("../dbhelpers/dbhelpers"));
const dbhelper = new dbhelpers_1.default;
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("booking ", req.body);
        let { event_id, user_id } = req.body;
        let booking_id = (0, uuid_1.v4)();
        let result = yield dbhelper.execute('createBooking', {
            booking_id,
            event_id,
            user_id,
        });
        console.log(result);
        return res.status(200).json({
            message: 'Booking created successfully',
        });
    }
    catch (error) {
        return res.json({
            error: error,
        });
    }
});
exports.createBooking = createBooking;
const getAllBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = (yield dbhelper.query('EXEC fetchAllBookings')).recordset;
        return res.status(200).json({
            bookings: bookings,
        });
    }
    catch (error) {
        return res.json({
            error: error,
        });
    }
});
exports.getAllBookings = getAllBookings;
const getUserBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.params.id;
        const booking = (yield dbhelper.query(`EXEC getBookingById @booking_id = '${id}'`)).recordset;
        return res.status(200).json({
            booking: booking,
        });
    }
    catch (error) {
        return res.json({
            error: error,
        });
    }
});
exports.getUserBookings = getUserBookings;
const getOneBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.params.id;
        const booking = (yield dbhelper.query(`EXEC getBookingById @booking_id = '${id}'`)).recordset;
        return res.status(200).json({
            booking: booking,
        });
    }
    catch (error) {
        return res.json({
            error: error,
        });
    }
});
exports.getOneBooking = getOneBooking;
const deleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { booking_id } = req.params;
        // Check if the booking exists before attempting deletion
        const bookingExists = (yield dbhelper.query(`EXEC getBookingById @booking_id = '${booking_id}'`)).recordset;
        if (!bookingExists.length) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        // Delete the booking
        yield dbhelper.query(`EXEC deleteBooking @booking_id = '${booking_id}'`);
        return res.status(200).json({ message: 'Booking deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({
            error: error.message || 'Internal Server Error',
        });
    }
});
exports.deleteBooking = deleteBooking;
