import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiChevronLeft, FiChevronRight, FiFlag, FiCheck } from 'react-icons/fi';

const TakeQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Dummy quiz data
  const [questions, setQuestions] = useState([
    { id: 1, text: "What is JSX?", options: ["A syntax extension for JS", "A database", "A styling tool", "A backend language"] },
    { id: 2, text: "Which hook is used for side effects?", options: ["useState", "useEffect", "useMemo", "useRef"] },
    { id: 3, text: "React is a...", options: ["Library", "Framework", "Database", "Browser"] },
    { id: 4, text: "What does DOM stand for?", options: ["Document Object Model", "Data Object Model", "Document Oriented Module", "Digital Object Matrix"] },
  ]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: selectedOptionIndex }
  const [markedForReview, setMarkedForReview] = useState({}); // { questionId: boolean }
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 mins in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitQuiz();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleOptionSelect = (qId, optionIdx) => {
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const toggleMarkReview = (qId) => {
    setMarkedForReview(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSubmitQuiz = useCallback(async () => {
    setIsSubmitting(true);
    // Simulate API call to submit answers
    setTimeout(() => {
      // Redirect to results (to be built in next step)
      navigate(`/results/${id}`);
    }, 1500);
  }, [id, navigate]);

  const currentQ = questions[currentIdx];

  if (isSubmitting) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center dark:bg-gray-900 text-gray-800 dark:text-white">
         <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
         <h2 className="text-2xl font-bold">Submitting your quiz...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
      
      {/* Main Quiz Area */}
      <div className="flex-1 lg:w-3/4 space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Question {currentIdx + 1} of {questions.length}</h2>
          <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg font-mono font-bold text-lg">
            <FiClock /> <span>{formatTime(timeLeft)}</span>
          </div>
        </div>

        <motion.div 
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 min-h-[400px] flex flex-col"
        >
          <h3 className="text-2xl font-medium text-gray-800 dark:text-white mb-8">{currentQ.text}</h3>
          
          <div className="space-y-4 flex-1">
            {currentQ.options.map((opt, idx) => {
              const isSelected = answers[currentQ.id] === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => handleOptionSelect(currentQ.id, idx)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center ${
                    isSelected 
                      ? 'border-primary bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-300' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-primary/50 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 mr-4 flex flex-shrink-0 items-center justify-center ${
                    isSelected ? 'border-primary bg-primary' : 'border-gray-400'
                  }`}>
                    {isSelected && <FiCheck className="text-white" size={14} />}
                  </div>
                  <span className="text-lg">{opt}</span>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <button 
              onClick={() => toggleMarkReview(currentQ.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                markedForReview[currentQ.id] ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <FiFlag /> <span>{markedForReview[currentQ.id] ? 'Marked for Review' : 'Mark for Review'}</span>
            </button>

            <div className="flex space-x-4">
              <button 
                onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                disabled={currentIdx === 0}
                className="flex items-center space-x-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                <FiChevronLeft /> <span>Previous</span>
              </button>
              
              {currentIdx === questions.length - 1 ? (
                <button 
                  onClick={handleSubmitQuiz}
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors cursor-pointer shadow-md"
                >
                  Submit Quiz
                </button>
              ) : (
                <button 
                  onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
                  className="flex items-center space-x-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <span>Next</span> <FiChevronRight />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sidebar Palette */}
      <div className="lg:w-1/4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
          <h3 className="font-bold text-gray-800 dark:text-white mb-4">Question Palette</h3>
          
          <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-3">
            {questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isMarked = markedForReview[q.id];
              const isCurrent = currentIdx === idx;
              
              let bgColor = 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300';
              if (isMarked) bgColor = 'bg-orange-500 text-white';
              else if (isAnswered) bgColor = 'bg-green-500 text-white';

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-all cursor-pointer shadow-sm ${bgColor} ${isCurrent ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-800' : ''}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="mt-8 space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center"><div className="w-4 h-4 bg-green-500 rounded mr-3"></div> Answered</div>
            <div className="flex items-center"><div className="w-4 h-4 bg-orange-500 rounded mr-3"></div> Marked for Review</div>
            <div className="flex items-center"><div className="w-4 h-4 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded mr-3"></div> Not Visited</div>
          </div>

          <button 
            onClick={handleSubmitQuiz}
            className="w-full mt-8 py-3 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 font-bold rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors cursor-pointer"
          >
            End Test Early
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default TakeQuiz;
