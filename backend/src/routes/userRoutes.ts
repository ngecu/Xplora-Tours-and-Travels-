import { Router } from "express";
import { loginRegister, registerUser } from "../controllers/userController";

const user_router = Router()

user_router.post('/register', registerUser)
user_router.post('/login', loginRegister)

export default user_router;