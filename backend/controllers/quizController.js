const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const Category = require('../models/Category');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// @desc    Create a new quiz
// @route   POST /api/quizzes
// @access  Private/Admin
const createQuiz = async (req, res) => {
  try {
    const { title, description, category, difficulty, duration, isPublished } = req.body;

    const quiz = new Quiz({
      title,
      description,
      category,
      difficulty,
      duration,
      isPublished,
      createdBy: req.user._id,
    });

    const createdQuiz = await quiz.save();
    res.status(201).json(createdQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Public or Private (depending on logic, let's say Private for students)
const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({}).populate('category', 'name');
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get quiz by ID (including questions)
// @route   GET /api/quizzes/:id
// @access  Private
const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('category', 'name');
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    // Also fetch the associated questions
    const questions = await Question.find({ quiz: req.params.id });
    
    res.json({ quiz, questions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Generate Quiz from PDF using AI
// @route   POST /api/quizzes/generate-ai
// @access  Private/Admin
const generateQuizFromPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a PDF file' });
    }

    const numQuestions = parseInt(req.body.numQuestions) || 5;

    // Parse the PDF
    const pdfData = await pdfParse(req.file.buffer);
    const textContent = pdfData.text;

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // The prompt to send to the AI
    const prompt = `
      Based on the following text extracted from a PDF document, generate ${numQuestions} multiple-choice questions.
      Return ONLY a valid JSON array of objects. Do not include markdown formatting like \`\`\`json. 
      Each object should have this structure:
      {
        "questionText": "The question string",
        "options": [
          { "text": "Option A", "isCorrect": false },
          { "text": "Option B", "isCorrect": true },
          { "text": "Option C", "isCorrect": false },
          { "text": "Option D", "isCorrect": false }
        ],
        "explanation": "A short explanation of why the correct option is right."
      }
      
      Document text:
      ${textContent.substring(0, 15000)} // Limiting chars to avoid token limit overflow for this basic setup
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let aiText = response.text();
    
    // Clean up potential markdown formatting from AI response
    aiText = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const generatedQuestions = JSON.parse(aiText);

    res.json(generatedQuestions);

  } catch (error) {
    console.error("AI Generation Error: ", error);
    res.status(500).json({ message: 'Failed to generate questions. ' + error.message });
  }
};

module.exports = {
  createQuiz,
  getQuizzes,
  getQuizById,
  generateQuizFromPDF
};
