import { Router } from "express";
import {  checkUserDetails, deleteUser, getAllUsers, getOneUser, loginUser, manageProfile, registerUser, updateUserActiveStatus } from "../controllers/usersControllers";
import { verifyToken } from "../middlewares/verifyToken";

const user_router = Router()

user_router.post('/register', registerUser)
user_router.post('/login', loginUser)
user_router.get('/check_user_details',verifyToken, checkUserDetails)
user_router.get("/allUsers",verifyToken,getAllUsers)
user_router.get('/:id', verifyToken, getOneUser)
user_router.delete('/:user_id', verifyToken, deleteUser)
user_router.post('/resetPassword', verifyToken, manageProfile)
user_router.put('/:user_id',verifyToken,updateUserActiveStatus)

export default user_router;