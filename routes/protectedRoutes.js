const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { saveActivity, getActivities } = require('../controllers/activityController');

router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ msg: 'You have access to this route', userId: req.user });
});

router.post('/save-activity', authMiddleware, saveActivity);
router.get('/activities', authMiddleware, getActivities);

module.exports = router;
