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
exports.getCategoryWithTours = exports.getCategoriesWithTours = exports.getAllCategories = exports.deleteCategory = exports.updateCategory = exports.getCategory = exports.createCategory = void 0;
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
const getCategoriesWithTours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Perform a SQL query to fetch categories and their associated tours
        const query = `
        SELECT
          c.category_id,
          c.category_name,
          e.event_id,
          e.event_name,
          e.image,
          e.destination,
          e.description,
          e.duration,
          e.start_date,
          e.price
        FROM
          categories c
        LEFT JOIN
          events e ON c.category_id = e.category_id
        WHERE
          e.active = 1;`;
        const result = yield dbhelper.query(query);
        // Organize the data into a structure where each category has an array of associated tours
        const categories = result.recordset.reduce((acc, row) => {
            if (!acc[row.category_id]) {
                acc[row.category_id] = {
                    category_id: row.category_id,
                    category_name: row.category_name,
                    tours: [],
                };
            }
            if (row.event_id) {
                acc[row.category_id].tours.push({
                    event_id: row.event_id,
                    event_name: row.event_name,
                    image: row.image,
                    destination: row.destination,
                    description: row.description,
                    duration: row.duration,
                    start_date: row.start_date,
                    price: row.price,
                });
            }
            return acc;
        }, {});
        const categoriesArray = Object.values(categories);
        return res.status(200).json(categoriesArray);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal server error',
        });
    }
});
exports.getCategoriesWithTours = getCategoriesWithTours;
const getCategoryWithTours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        // Perform a SQL query to fetch a specific category and its associated tours
        const query = `
      SELECT
        c.category_id,
        c.category_name,
        e.event_id,
        e.event_name,
        e.image,
        e.destination,
        e.description,
        e.duration,
        e.start_date,
        e.price
      FROM
        categories c
      LEFT JOIN
        events e ON c.category_id = e.category_id
      WHERE
        c.category_id = @categoryId
        AND e.active = 1;`;
        const result = yield dbhelper.query(query, { categoryId });
        // Check if the category exists
        if (result.recordset.length === 0) {
            return res.status(404).json({
                error: 'Category not found',
            });
        }
        // Organize the data into a structure where the category has an array of associated tours
        const category = {
            category_id: result.recordset[0].category_id,
            category_name: result.recordset[0].category_name,
            tours: result.recordset
                .filter((row) => row.event_id !== null)
                .map((row) => ({
                event_id: row.event_id,
                event_name: row.event_name,
                image: row.image,
                destination: row.destination,
                description: row.description,
                duration: row.duration,
                start_date: row.start_date,
                price: row.price,
            })),
        };
        return res.status(200).json(category);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal server error',
        });
    }
});
exports.getCategoryWithTours = getCategoryWithTours;
