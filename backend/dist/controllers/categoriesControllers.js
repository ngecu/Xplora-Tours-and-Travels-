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
exports.getAllCategories = exports.deleteCategory = exports.updateCategory = exports.getCategory = exports.createCategory = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const sqlConfig_1 = require("../config/sqlConfig");
const dbhelpers_1 = __importDefault(require("../dbhelpers/dbhelpers"));
const dbhelper = new dbhelpers_1.default;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category_name } = req.body;
        // Validate input data here if needed
        let category_id = (0, uuid_1.v4)();
        let result = dbhelper.execute('createCategory', {
            category_id,
            category_name
        });
        console.log(result);
        return res.status(201).json({
            message: 'Category created successfully',
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal server error',
        });
    }
});
exports.createCategory = createCategory;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        const result = yield dbhelper.query('SELECT * FROM categories WHERE category_id = ?', [categoryId]);
        if (result.recordset.length === 0) {
            return res.status(404).json({
                error: 'Category not found',
            });
        }
        const category = result.recordset[0];
        return res.status(200).json(category);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal server error',
        });
    }
});
exports.getCategory = getCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        const { category_name } = req.body;
        // Validate input data here if needed
        const result = yield dbhelper.execute('UPDATE categories SET category_name=? WHERE category_id=?', [
            category_name,
            categoryId,
        ]);
        console.log(result);
        return res.status(200).json({
            message: 'Category updated successfully',
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal server error',
        });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        const result = yield dbhelper.execute('DELETE FROM categories WHERE category_id=?', [categoryId]);
        console.log(result);
        return res.status(200).json({
            message: 'Category deleted successfully',
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal server error',
        });
    }
});
exports.deleteCategory = deleteCategory;
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let categories = (yield pool.request().execute('fetchAlCategories')).recordset;
        return res.status(200).json({
            categories: categories
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal server error',
        });
    }
});
exports.getAllCategories = getAllCategories;
