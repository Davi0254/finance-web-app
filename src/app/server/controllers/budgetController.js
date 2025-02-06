import pool from "../config/db.js";
import { userHandler } from "../utils/handleGetUser.js";
import { errorHandler } from "../utils/handleError.js";

export const addBudget = async (req, res) => {
    const { budgetName, amount, category, email } = req.body;

    if (!budgetName || !amount || !category || !email) {
        return res.status(400).json({ error: 'All fields are required' })
    }

    try {
        const getUser = await userHandler(email)

        if (!getUser) {
            return res.status(404).json({ error: 'User not found' })
        }

        const user_id = getUser.id;

        await pool.query(
            'INSERT INTO budget (user_id, budget, category, amount) VALUES (?, ?, ?, ?)',
            [user_id, budgetName, category, amount])

        const dateQuery = await pool.query('SELECT created_at FROM budget WHERE user_id = ?', [user_id]);

        const date = dateQuery.created_at;

        res.status(200).json({
            message: 'budget added successfully',
            budgetName,
            amount,
            category,
            email,
        });
    } catch (error) {
        errorHandler(error, res)
    }
}

export const getBudget = async (req, res) => {
    const { email } = req.query;

    if (!email || email.trim() === 0) {
        return res.status(400).json({ error: 'email not valid' })
    }

    try {
        const getUser = await userHandler(email)

        if (!getUser) {
            return res.status(404).json({ error: 'User not found' })
        }

        const user_id = getUser.id;
        const financialdataQuery = await pool.query('SELECT * FROM budget WHERE user_id = ?', [user_id])

        if (financialdataQuery.length === 0) {
            return res.status(404).json({ error: 'No financial data found' })
        }

        res.status(200).json(financialdataQuery);

    } catch (error) {
        errorHandler(error, res)
    }
}

export const deleteBudget = async (req, res) => {
    const { budgetName, email } = req.body;

    if (!email || !budgetName) {
        return res.status(400).json({ error: 'All fields are necessary' })
    }

    try {
        const getUser = await userHandler(email)

        if (!getUser) {
            return res.status(404).json({ error: 'User not found' })
        }

        const user_id = getUser.id;

        const deleteResult = await pool.query('DELETE FROM budget WHERE budget = ? AND user_id = ?', [budgetName, user_id])
        if (deleteResult.affectedRows === 0) {
            return res.status(404).json({ error: 'Budget not found' })
        }

        const rows = await pool.query('SELECT * FROM budget WHERE user_id = ?', [user_id])

        res.status(200).json({
            ok: true,
            message: `${budgetName} deleted successfully`,
        });
    } catch (error) {
        errorHandler(error, res)
    }
}