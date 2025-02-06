import express from 'express';
import { register, login, getUsers } from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.get('/getUsers', getUsers);

export default userRoutes;