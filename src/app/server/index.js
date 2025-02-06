import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import balanceRoutes from './routes/balanceRoutes.js';
import incomeRoutes from './routes/incomeRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import goalsRoutes from './routes/goalsRoutes.js';

const app = express();

app.use(express.json());
app.use(cors({origin: 'http://localhost:3000'}));

app.use('/api/users', userRoutes);
app.use('/api/balance', balanceRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/goals', goalsRoutes)

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

export default app;
