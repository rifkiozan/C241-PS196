const express = require('express');
const { requestPasswordReset, verifyResetToken } = require('../controllers/resetPasswordController');
const router = express.Router();

router.post('/request-reset-password', requestPasswordReset);
router.get('/verify-reset-token/:token', verifyResetToken);

module.exports = router;
