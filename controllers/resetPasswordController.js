// resetPasswordController.js
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { sendResetPasswordEmail, sendNewPasswordEmail } = require('../services/emailService');

// Request password reset
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findByEmail(email);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        // Generate verification token
        const resetToken = jwt.sign({ email }, 'resetPasswordSecret', { expiresIn: '1h' });

        // Save token to user
        await User.saveResetToken(user.id, resetToken);

        // Send reset password email
        await sendResetPasswordEmail(email, user.name, resetToken);

        res.status(200).json({
            status: 'success',
            message: 'Reset password email sent'
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            status: 'error',
            message: 'Server Error'
        });
    }
};

// Verify reset token and reset password
const verifyResetToken = async (req, res) => {
    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, 'resetPasswordSecret');
        const user = await User.findByEmail(decoded.email);

        if (!user || user.reset_token !== token) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid or expired token'
            });
        }

        // Generate new random password
        const newPassword = crypto.randomBytes(4).toString('hex'); // 8 digits
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user password and clear reset token
        await User.updatePassword(user.id, hashedPassword);
        await User.clearResetToken(user.id);

        // Send new password to user
        await sendNewPasswordEmail(user.email, newPassword);

        res.status(200).json({
            status: 'success',
            message: 'Password reset successfully. A new password has been sent to your email.'
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            status: 'error',
            message: 'Server Error'
        });
    }
};

// Reset password function is no longer needed as it is handled by verifyResetToken
const resetPassword = async (req, res) => {
    res.status(405).json({
        status: 'error',
        message: 'This endpoint is not supported. Use /verify-reset-token/:token to reset the password.'
    });
};

module.exports = { requestPasswordReset, verifyResetToken, resetPassword };
