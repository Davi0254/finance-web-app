import pool from "../config/db.js";
import { userHandler } from "../utils/handleGetUser.js";
import { errorHandler } from "../utils/handleError.js";

export const addBalance = async (req, res) => {
    const { balance, email } = req.body;

    if (!email || !balance) {
        return res.status(400).json({ error: 'Email and balance are required' })
    }

    try {
        const getUser = await userHandler(email)

        if (!getUser) {
            return res.status(404).json({ error: 'User not found' })
        }

        const user_id = getUser.id;

        const balanceQuery = await pool.query('SELECT balance FROM balance_income WHERE user_id=?', [user_id]);
       
        if (balanceQuery.length > 0) {
            await pool.query('UPDATE balance_income SET balance = ? WHERE user_id = ?', [balance, user_id]);
            return res.status(200).json({ message: 'balance updated successfully', balance });
        } else {
            await pool.query('INSERT INTO balance_income (user_id, balance) VALUES(?, ?)', [user_id, balance]);
            return res.status(200).json({ message: 'balance added successfully', balance });
        }

    } catch (error) {
        errorHandler(error, res)
    }
}

export const getBalance = async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: 'email not found' })
    }

    try {
        const getUser = await userHandler(email)

        if (!getUser) {
            return res.status(404).json({ error: 'User not found' })
        }

        const user_id = getUser.id;

        const balanceQuery = await pool.query('SELECT balance FROM balance_income WHERE user_id = ?', [user_id]);
        if (!balanceQuery) {
            return res.status(404).json({ message: 'No balance found' });
        }

        res.status(200).json({
            balance: balanceQuery[0].balance,
        })
    } catch (error) {
        errorHandler(error, res)
    }
}