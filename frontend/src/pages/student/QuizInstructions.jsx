import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiClock, FiCheckSquare } from 'react-icons/fi';

const QuizInstructions = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // In reality, fetch quiz details by id. Using dummy data for now.
  const quiz = { id, title: 'React JS Fundamentals', duration: 30, questions: 20 };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        
        <div className="p-8 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{quiz.title}</h1>
          <p className="text-gray-500 dark:text-gray-400">Please read the instructions carefully before starting the quiz.</p>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex items-start space-x-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-blue-800 dark:text-blue-300">
            <FiClock className="mt-1 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-semibold text-lg">Timer & Auto-Submit</h3>
              <p className="mt-1 text-sm">You have exactly {quiz.duration} minutes to complete {quiz.questions} questions. The quiz will automatically submit when the timer reaches zero.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl text-orange-800 dark:text-orange-300">
            <FiAlertTriangle className="mt-1 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-semibold text-lg">Navigation & Window</h3>
              <p className="mt-1 text-sm">Do not refresh the page or switch tabs. Navigating away may result in immediate auto-submission of your quiz.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-green-800 dark:text-green-300">
            <FiCheckSquare className="mt-1 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-semibold text-lg">Mark for Review</h3>
              <p className="mt-1 text-sm">You can mark questions to review them later using the Question Palette on the right side of the screen.</p>
            </div>
          </div>

          <div className="pt-6 flex justify-end space-x-4">
            <button onClick={() => navigate(-1)} className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
              Cancel
            </button>
            <Link to={`/quiz/take/${quiz.id}`} className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md cursor-pointer block">
              Start Quiz Now
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizInstructions;
