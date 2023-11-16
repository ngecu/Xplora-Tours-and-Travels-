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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getOneUser = exports.getAllUsers = exports.checkUserDetails = exports.manageProfile = exports.activateUser = exports.deactivateUser = exports.loginUser = exports.registerUser = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const sqlConfig_1 = require("../config/sqlConfig");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbhelpers_1 = __importDefault(require("../dbhelpers/dbhelpers"));
const validators_1 = require("../validators/validators");
const lodash_1 = require("lodash");
const dbhelper = new dbhelpers_1.default;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        let { full_name, email, phone_number, password } = req.body;
        let { error } = validators_1.registerUserSchema.validate(req.body);
        if (error) {
            console.log(error.details[0].message);
            return res.status(404).json({ error: error.details[0].message });
        }
        const emailTaken = (yield dbhelper.query(`SELECT * FROM users WHERE email = '${email}'`)).recordset;
        const phoneTaken = (yield dbhelper.query(`SELECT * FROM users WHERE phone_number = '${phone_number}'`)).recordset;
        if (!(0, lodash_1.isEmpty)(emailTaken)) {
            return res.json({ error: "This email is already in use" });
        }
        if (!(0, lodash_1.isEmpty)(phoneTaken)) {
            return res.json({ error: "This Phone Number is already in use" });
        }
        let user_id = (0, uuid_1.v4)();
        const hashedPwd = yield bcrypt_1.default.hash(password, 10);
        let result = dbhelper.execute('registerUser', {
            user_id, full_name, email, phone_number, password: hashedPwd
        });
        console.log(result);
        return res.status(200).json({
            message: 'User registered successfully'
        });
    }
    catch (error) {
        return res.json({
            error: error
        });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { email, password } = req.body;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let user = yield (yield pool.request().input("email", email).input("password", password).execute('loginUser')).recordset;
        if (((_a = user[0]) === null || _a === void 0 ? void 0 : _a.email) == email) {
            const CorrectPwd = yield bcrypt_1.default.compare(password, (_b = user[0]) === null || _b === void 0 ? void 0 : _b.password);
            if (!CorrectPwd) {
                return res.status(401).json({
                    error: "Incorrect password"
                });
            }
            if (((_c = user[0]) === null || _c === void 0 ? void 0 : _c.active) === 0) {
                return res.status(401).json({
                    error: "Account deactivated, please contact admin"
                });
            }
            const LoginCredentials = user.map(records => {
                const { password } = records, rest = __rest(records, ["password"]);
                return rest;
            });
            const token = jsonwebtoken_1.default.sign(LoginCredentials[0], process.env.SECRET);
            return res.status(200).json({
                message: "Logged in successfully", token
            });
        }
        else {
            return res.json({
                error: "Email not found"
            });
        }
    }
    catch (error) {
        return res.json({
            error: error
        });
    }
});
exports.loginUser = loginUser;
const deactivateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId; // Assuming you pass the user ID in the request parameters
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.request()
            .input("userId", userId)
            .execute('deactivateUser'); // Assuming you have a stored procedure to deactivate a user
        if (result.rowsAffected[0] > 0) {
            return res.status(200).json({
                message: "User deactivated successfully"
            });
        }
        else {
            return res.status(404).json({
                error: "User not found"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});
exports.deactivateUser = deactivateUser;
const activateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId; // Assuming you pass the user ID in the request parameters
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.request()
            .input("userId", userId)
            .execute('activateUser'); // Assuming you have a stored procedure to activate a user
        if (result.rowsAffected[0] > 0) {
            return res.status(200).json({
                message: "User activated successfully"
            });
        }
        else {
            return res.status(404).json({
                error: "User not found"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});
exports.activateUser = activateUser;
const manageProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { new_password, email } = req.body;
        console.log(req.body);
        // Check if the email exists in the database
        const emailExists = (yield dbhelper.query(`SELECT * FROM users WHERE email = '${email}'`)).recordset;
        if (!emailExists || emailExists.length === 0) {
            return res.status(404).json({ error: "Email not found" });
        }
        // Hash the new password
        const hashedNewPassword = yield bcrypt_1.default.hash(new_password, 10);
        // Update the user's password in the database
        yield dbhelper.execute('manageProfile', {
            new_password: hashedNewPassword,
            user_id: emailExists[0].user_id,
        });
        return res.status(200).json({
            message: 'Password reset successfully'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message
        });
    }
});
exports.manageProfile = manageProfile;
function sendPasswordChangeAttemptEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Email sent to ${email}: Password change attempt detected.`);
    });
}
const checkUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.info) {
        console.log(req.info);
        return res.json({
            info: req.info
        });
    }
});
exports.checkUserDetails = checkUserDetails;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let users = (yield pool.request().execute('fetchAllUsers')).recordset;
        return res.status(200).json({
            users: users
        });
    }
    catch (error) {
        return res.json({
            error: error
        });
    }
});
exports.getAllUsers = getAllUsers;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.params.id;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let user = (yield pool.request().input('user_id', id).execute('fetchOneUser')).recordset;
        return res.status(200).json({
            user: user
        });
    }
    catch (error) {
        return res.json({
            error: error
        });
    }
});
exports.getOneUser = getOneUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        console.log(user_id);
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        // Check if the user exists before attempting deletion
        const userExists = (yield pool
            .request()
            .input('user_id', mssql_1.default.VarChar(100), user_id)
            .execute('fetchOneUser')).recordset;
        if (!userExists.length) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Delete the user
        yield pool.request().input('user_id', mssql_1.default.VarChar(100), user_id).execute('deleteUser');
        return res.status(200).json({ message: "Deleted Successfully" }); // Successful deletion, no content response
    }
    catch (error) {
        return res.status(500).json({
            error: error.message || 'Internal Server Error',
        });
    }
});
exports.deleteUser = deleteUser;
