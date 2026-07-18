const express = require('express');
const router = express.Router();
const { submitQuiz, getLeaderboard, getResultById } = require('../controllers/resultController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, submitQuiz);
router.get('/leaderboard', getLeaderboard); // can be public or protected depending on preference
router.get('/:id', protect, getResultById);

module.exports = router;
