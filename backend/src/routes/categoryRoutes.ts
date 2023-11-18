import { Router } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoriesWithTours, getCategory, getCategoryWithTours } from "../controllers/categoriesControllers";
import { verifyToken } from "../middlewares/verifyToken";

const category_router = Router()


category_router.get("/allCategories",getCategoriesWithTours)
// category_router.get("/getCategoriesWithTours",getCategoriesWithTours)
category_router.get('/:category_id', getCategoryWithTours)

category_router.get('/:id', verifyToken, getCategory)
category_router.delete('/:category_id', verifyToken, deleteCategory)
category_router.put('/:category_id', verifyToken, deleteCategory)
category_router.post('/', createCategory)


export default category_router;