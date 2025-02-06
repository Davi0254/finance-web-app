import pool from "../config/db.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/handleError.js";

export const getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        return res.status(200).json(result)
    } catch (error) {
        errorHandler(error, res)
    }
};

export const register = async (req, res) => {
    const { full_name, email, password } = req.body;
    
    if (!full_name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' })
    }

    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?',
        [email]);

    if (existingUser !== undefined) {
       return res.status(400).json({ error: 'user already exists' });
    }

    try {
        const password_hash = await bcrypt.hash(password, 10);
        await pool.query(
            'INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)',
            [full_name, email, password_hash]
        )

        res.json({
            message: 'User registered successfully!',
            redirectTo: '/pages/login'
        });

    } catch (error) {
        errorHandler(error, res)
    };
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);

        const [result] = await pool.query(
            'SELECT email, password_hash FROM users WHERE email = ?',
            [email]);

        if (!result || result.length === 0) {
            return res.status(400).json({ error: 'User not found' });
        }

        const password_hash = result.password_hash;

        const isMatch = await bcrypt.compare(password, password_hash);
        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '10m' })
            return res.status(200).json({ message: 'successfully logged in', email, token });

    } catch (error) {
        errorHandler(error, res)
    }
}
