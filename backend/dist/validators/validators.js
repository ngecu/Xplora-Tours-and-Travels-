"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventSchema = exports.manageProfileSchema = exports.registerUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerUserSchema = joi_1.default.object({
    full_name: joi_1.default.string(),
    email: joi_1.default.string().email(),
    phone_number: joi_1.default.string().min(10),
    password: joi_1.default.string(),
    confirm_password: joi_1.default.string()
});
exports.manageProfileSchema = joi_1.default.object({
    current_password: joi_1.default.string(),
    new_password: joi_1.default.string(),
});
exports.createEventSchema = joi_1.default.object({
    destination: joi_1.default.string().required(),
    start_date: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    image: joi_1.default.string().required(),
    event_name: joi_1.default.string().required(),
    duration: joi_1.default.number().integer().positive().required(),
    price: joi_1.default.number().precision(2).positive().required(),
    category_id: joi_1.default.string().required(),
});
