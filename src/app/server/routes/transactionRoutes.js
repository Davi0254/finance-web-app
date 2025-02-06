import express from 'express';
import { addTransaction, getTransactions, deleteTransaction } from '../controllers/transactionsController.js';

const transactionRoutes = express.Router();

transactionRoutes.post('/addTransaction', addTransaction);
transactionRoutes.get('/getTransactions', getTransactions);
transactionRoutes.delete('/deleteTransaction', deleteTransaction);

export default transactionRoutes;