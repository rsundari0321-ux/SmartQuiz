const Result = require('../models/Result');
const Question = require('../models/Question');
const Quiz = require('../models/Quiz');

// @desc    Submit quiz answers and calculate score
// @route   POST /api/results
// @access  Private
const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers, timeTaken } = req.body; 

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const questions = await Question.find({ quiz: quizId });
    
    let score = 0;
    let totalMarks = 0;
    let correctAnswersCount = 0;
    let wrongAnswersCount = 0;

    questions.forEach((q) => {
      totalMarks += q.marks;
      
      const userAnswerIdx = answers[q._id.toString()];
      if (userAnswerIdx !== undefined) {
        const correctIdx = q.options.findIndex(opt => opt.isCorrect);
        
        if (userAnswerIdx === correctIdx) {
          score += q.marks;
          correctAnswersCount++;
        } else {
          score -= q.negativeMarks;
          wrongAnswersCount++;
        }
      }
    });

    score = Math.max(0, score);
    const percentage = (score / totalMarks) * 100;
    const isPassed = percentage >= 50; 

    const result = new Result({
      user: req.user._id,
      quiz: quizId,
      score,
      totalMarks,
      percentage: percentage.toFixed(2),
      correctAnswers: correctAnswersCount,
      wrongAnswers: wrongAnswersCount,
      timeTaken,
      isPassed,
    });

    const savedResult = await result.save();
    res.status(201).json(savedResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get leaderboard
// @route   GET /api/results/leaderboard
// @access  Public/Private
const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Result.aggregate([
      {
        $group: {
          _id: '$user',
          totalScore: { $sum: '$score' },
          quizzesTaken: { $sum: 1 },
          averagePercentage: { $avg: '$percentage' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $unwind: '$userDetails'
      },
      {
        $project: {
          _id: 1,
          totalScore: 1,
          quizzesTaken: 1,
          averagePercentage: { $round: ['$averagePercentage', 2] },
          name: '$userDetails.name',
          profileImage: '$userDetails.profileImage'
        }
      },
      {
        $sort: { totalScore: -1 }
      },
      {
        $limit: 100
      }
    ]);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get specific result by ID
// @route   GET /api/results/:id
// @access  Private
const getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate('user', 'name email')
      .populate('quiz', 'title category');
      
    if (!result) return res.status(404).json({ message: 'Result not found' });
    
    if (result.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitQuiz, getLeaderboard, getResultById };
