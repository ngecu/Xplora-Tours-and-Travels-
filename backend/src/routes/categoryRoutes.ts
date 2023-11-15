import { Router } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategory } from "../controllers/categoriesControllers";
import { verifyToken } from "../middlewares/verifyToken";

const category_router = Router()


category_router.get("/allCategories",verifyToken,getAllCategories)
category_router.get('/:id', verifyToken, getCategory)
category_router.delete('/:category_id', verifyToken, deleteCategory)
category_router.put('/:category_id', verifyToken, deleteCategory)
category_router.post('/', createCategory)

export default category_router;