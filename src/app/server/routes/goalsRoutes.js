import express from 'express';
import { addGoal, getGoals, deleteGoal } from '../controllers/goalsController.js';

const goalsRoutes = express.Router();

goalsRoutes.post('/addGoal', addGoal);
goalsRoutes.get('/getGoals', getGoals);
goalsRoutes.delete('/deleteGoal', deleteGoal);

export default goalsRoutes;