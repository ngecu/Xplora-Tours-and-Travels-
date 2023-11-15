"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
// import { testConnection } from "./config/sqlConfig";
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, express_1.json)());
// app.use("/", () => {
//   console.log("api is working");
// });
app.use('/user', userRoutes_1.default);
app.use('/category', categoryRoutes_1.default);
app.use('/events', eventRoutes_1.default);
app.use('/booking', bookingRoutes_1.default);
app.use('/review', reviewRoutes_1.default);
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT} `);
});
