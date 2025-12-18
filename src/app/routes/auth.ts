import express from 'express';
import { usersValidations } from '../controllers/Users/users.validation';
import { loginUsers, RegisterUser } from '../controllers/Users/users.controller';


const router = express.Router();

router.post("/register", usersValidations, RegisterUser)
router.post("/login", usersValidations, loginUsers)

export default router;