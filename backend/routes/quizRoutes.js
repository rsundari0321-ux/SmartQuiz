const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createQuiz, getQuizzes, getQuizById, generateQuizFromPDF } = require('../controllers/quizController');
const { protect, admin } = require('../middleware/authMiddleware');

// Setup multer for in-memory file uploads
const upload = multer({ storage: multer.memoryStorage() });

router.route('/')
  .post(protect, admin, createQuiz)
  .get(protect, getQuizzes);

router.post('/generate-ai', protect, admin, upload.single('file'), generateQuizFromPDF);

router.route('/:id')
  .get(protect, getQuizById);

module.exports = router;
