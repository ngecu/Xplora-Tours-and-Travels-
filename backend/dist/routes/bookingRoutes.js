"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookingControllers_1 = require("../controllers/bookingControllers");
const verifyToken_1 = require("../middlewares/verifyToken");
const bookingRouter = (0, express_1.Router)();
bookingRouter.post('/create', bookingControllers_1.createBooking);
bookingRouter.get('/allBookings', verifyToken_1.verifyToken, bookingControllers_1.getAllBookings);
bookingRouter.get('/:id', verifyToken_1.verifyToken, bookingControllers_1.getOneBooking);
bookingRouter.get('/user/:id', verifyToken_1.verifyToken, bookingControllers_1.getUserBookings);
bookingRouter.delete('/:booking_id', verifyToken_1.verifyToken, bookingControllers_1.deleteBooking);
exports.default = bookingRouter;
