import express from 'express';
import {addBalance, getBalance } from '../controllers/balanceController.js';

const balanceRoutes = express.Router();

balanceRoutes.post('/addBalance', addBalance);
balanceRoutes.get('/getBalance', getBalance);

export default balanceRoutes;