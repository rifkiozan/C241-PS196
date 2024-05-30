const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Endpoint api/auth/register
const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const userId = await User.create(name, email, hashedPassword);

        // Create JWT token
        const token = jwt.sign({ id: userId }, 'test123', { expiresIn: '1h' });

        res.status(201).json({
            status: 'success',
            message: 'Anda berhasil register',
            token: token
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            status: 'error',
            message: 'Server Error'
        });
    }
};


// Endpoint api/auth/login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }

        // Create JWT token
        const token = jwt.sign({ id: user.id }, 'test123', { expiresIn: '1h' });

        res.status(200).json({
            status: 'success',
            message: 'Anda berhasil login',
            token: token
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            status: 'error',
            message: 'Server Error'
        });
    }
};

module.exports = { register, login };
