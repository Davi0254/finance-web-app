import pool from "../config/db.js";
import { userHandler } from "../utils/handleGetUser.js";
import { errorHandler } from "../utils/handleError.js";

export const addIncome = async (req, res) => {
    const { income, email } = req.body;

    if (!email || income === undefined) {
        return res.status(400).json({ error: 'Email and income are required' })
    }

    try {
        const getUser = await userHandler(email)

        if (!getUser) {
            return res.status(404).json({ error: 'User not found' })
        }

        const user_id = getUser.id;

        const incomeQuery = await pool.query('SELECT income FROM balance_income WHERE user_id = ?', [user_id]);
       
        if (incomeQuery.length > 0) {
            await pool.query('UPDATE balance_income SET income = ? WHERE user_id = ?', [income, user_id]);
            return res.status(200).json({ message: 'income updated successfully', income });
        } else {
            await pool.query('INSERT INTO balance_income (user_id, income) VALUES(?, ?)', [user_id, income]);
            return res.status(200).json({ message: 'income added successfully', income });
        }

    } catch (error) {
        errorHandler(error, res)
    }
}

export const getIncome = async (req, res) => {
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

        const incomeQuery = await pool.query('SELECT income FROM balance_income WHERE user_id = ?', [user_id]);
        if (!incomeQuery) {
            return res.status(404).json({ message: 'No income found' });
        }

        res.status(200).json({
            income: incomeQuery[0].income,
        })
    } catch (error) {
        errorHandler(error, res)
    }
}