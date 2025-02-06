import express from 'express';
import {addIncome, getIncome } from '../controllers/incomeController.js';

const incomeRoutes = express.Router();

incomeRoutes.post('/addIncome', addIncome);
incomeRoutes.get('/getIncome', getIncome);

export default incomeRoutes;