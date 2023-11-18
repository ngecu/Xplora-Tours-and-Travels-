"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriesControllers_1 = require("../controllers/categoriesControllers");
const verifyToken_1 = require("../middlewares/verifyToken");
const category_router = (0, express_1.Router)();
category_router.get("/allCategories", categoriesControllers_1.getCategoriesWithTours);
// category_router.get("/getCategoriesWithTours",getCategoriesWithTours)
category_router.get('/:category_id', categoriesControllers_1.getCategoryWithTours);
category_router.get('/:id', verifyToken_1.verifyToken, categoriesControllers_1.getCategory);
category_router.delete('/:category_id', verifyToken_1.verifyToken, categoriesControllers_1.deleteCategory);
category_router.put('/:category_id', verifyToken_1.verifyToken, categoriesControllers_1.deleteCategory);
category_router.post('/', categoriesControllers_1.createCategory);
exports.default = category_router;
