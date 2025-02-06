import express from 'express';
import { addBudget, getBudget, deleteBudget } from '../controllers/budgetController.js';

const budgetRoutes = express.Router();

budgetRoutes.post('/addBudget', addBudget);
budgetRoutes.get('/getBudget', getBudget);
budgetRoutes.delete('/deleteBudget', deleteBudget);

export default budgetRoutes;