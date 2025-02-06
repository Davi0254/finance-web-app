import pool from "../config/db.js";
import { userHandler } from "../utils/handleGetUser.js";
import { errorHandler } from "../utils/handleError.js";

export const addTransaction = async (req, res) => {
    const { name, status, method, amount, email } = req.body;

    if (!name || !status || !method || !email || !amount) {
        return res.status(400).json({ error: 'all fields are necessary' })
    }

    try {
        const getUser = await userHandler(email)

        if (!getUser) {
            return res.status(404).json({ error: 'User not found' })
        }

        const user_id = getUser.id;

        await pool.query('INSERT INTO transactions (name, status, method, amount, user_id) VALUES(?, ?, ?, ?, ?)',
            [name, status, method, amount, user_id]
        )

        res.status(200).json({
            message: 'transaction added successfully',
            name, status, method, amount, user_id
        });
    } catch (error) {
        errorHandler(error, res)
    }
}

export const getTransactions = async (req, res) => {
    const { email } = req.query;

    if (!email || email.trim().length === 0) {
        return res.status(400).json({ error: 'email not valid' })
    }

    try {
        const getUser = await userHandler(email)

        if (!getUser) {
            return res.status(404).json({ error: 'User not found' })
        }

        const user_id = getUser.id;
        const financialdataQuery = await pool.query('SELECT name, status, method, amount FROM transactions WHERE user_id = ?', [user_id])

        if (financialdataQuery.length === 0) {
            return res.status(404).json({ error: 'No financial data found' })
        }

        res.status(200).json(financialdataQuery);

    } catch (error) {
        errorHandler(error, res)
    }
}

export const deleteTransaction = async (req, res) => {
    const { name, email } = req.body;
    
    if (!email || email.trim().length === 0 || !name || name.trim().length === 0) {
        return res.status(400).json({ error: 'email not valid' })
    }

    try {
        const getUser = await userHandler(email)

        if (!getUser) {
            return res.status(404).json({ error: 'User not found' })
        }

        const user_id = getUser.id;

        const deleteResult = await pool.query('DELETE FROM transactions WHERE name = ? AND user_id = ?', [name, user_id])
        if (deleteResult.affectedRows === 0) {
            return res.status(404).json({ error: 'Transaction not found' })
        }

        const rows = await pool.query('SELECT * FROM transactions WHERE user_id = ?', [user_id])

        res.status(200).json({
            ok: true,
            message: `${name} deleted successfully`,
            rows
        });
    } catch (error) {
      errorHandler(error, res)
    }
}
