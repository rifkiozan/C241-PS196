const db = require('../config/db');

const User = {
    async create(name, email, password) {
        const connection = await db();
        const [result] = await connection.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password]
        );
        return result.insertId;
    },

    async findByEmail(email) {
        const connection = await db();
        const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }
};

module.exports = User;
