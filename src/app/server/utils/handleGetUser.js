import pool from "../config/db.js";

export const userHandler = async (email) => {
    const userQuery = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (userQuery.length === 0) {
        return null;
    }
    return userQuery[0];
}  