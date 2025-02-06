import pool from "../config/db.js";
import { userHandler } from "../utils/handleGetUser.js";
import { errorHandler } from "../utils/handleError.js";

export const addGoal = async (req, res) => {
    const { name, target_value, completion_date, email } = req.body;

    if (!name || !target_value || !completion_date || !email) {
        return res.status(400).json({ error: 'All fields are required' })
    }

    try {
        const getUser = await userHandler(email)

        if (!getUser) {
            return res.status(404).json({ error: 'User not found' })
        }

        const user_id = getUser.id;

        await pool.query(
            'INSERT INTO goals (user_id, goal, completion_date, target_value) VALUES (?, ?, ?, ?)',
            [user_id, name, completion_date, target_value]
        );

        res.status(200).json({
            message: 'budget added successfully',
            name,
            target_value,
            completion_date,
            email
        });
    } catch (error) {
        errorHandler(error, res)
    }
}

export const getGoals = async (req, res) => {
    const email = req.query.email

    try {
        if (!email) {
            return res.status(400).json({ error: 'email required' })
        }

        const getUser = await userHandler(email)

        if (!getUser) {
            return res.status(404).json({ error: 'User not found' })
        }

        const user_id = getUser.id;

        const goalsData = await pool.query(
            'SELECT goal, target_value, completion_date FROM goals WHERE user_id = ?', [user_id]
        );

        res.status(200).json(goalsData);
    }
    catch (error) {
        errorHandler(error, res)
    }
}

export const deleteGoal = async (req, res) => {
    const { email, name } = req.body;

    try {
        if (!email | !name) {
            return res.status(400).json({ error: 'all fields are required' })
        }
        const getUser = await userHandler(email)

        if (!getUser) {
            return res.status(404).json({ error: 'User not found' })
        }

        const user_id = getUser.id;

        const deletedGoal = await pool.query('DELETE FROM goals WHERE goal = ? AND user_id = ?', [name, user_id])

        if (deletedGoal.affectedRows[0] === 0) {
            return res.status(500).json({ error: 'Couldnt delete Goal' })
        }

        res.status(200).json(`${name} deleted successfully`)

    } catch (error) {
        errorHandler(error, res)
    }
}
