import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiClock, FiAward, FiBookOpen } from 'react-icons/fi';

const StudentDashboard = () => {
  // Dummy data (Will connect to API later)
  const availableQuizzes = [
    { id: '1', title: 'React JS Fundamentals', category: 'Programming', difficulty: 'Medium', duration: 30, questions: 20 },
    { id: '2', title: 'Data Structures 101', category: 'Computer Science', difficulty: 'Hard', duration: 45, questions: 25 },
    { id: '3', title: 'Quantitative Aptitude', category: 'Aptitude', difficulty: 'Easy', duration: 20, questions: 15 },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-blue-400 rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-bold mb-2">Ready to test your skills?</h1>
          <p className="text-blue-100 max-w-2xl">Select a quiz from the list below and challenge yourself. Make sure you are in a quiet environment before starting the timer.</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Available Quizzes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableQuizzes.map((quiz) => (
              <motion.div 
                whileHover={{ y: -5 }}
                key={quiz.id} 
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {quiz.category}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${
                    quiz.difficulty === 'Easy' ? 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400' :
                    quiz.difficulty === 'Medium' ? 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {quiz.difficulty}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{quiz.title}</h3>
                
                <div className="mt-auto space-y-3 mb-6">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <FiClock className="mr-2" /> {quiz.duration} Minutes
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <FiBookOpen className="mr-2" /> {quiz.questions} Questions
                  </div>
                </div>

                <Link 
                  to={`/quiz/instructions/${quiz.id}`}
                  className="w-full text-center bg-gray-50 dark:bg-gray-700 hover:bg-primary hover:text-white text-gray-800 dark:text-gray-200 font-medium py-2.5 rounded-lg transition-colors border border-gray-200 dark:border-gray-600 hover:border-primary block"
                >
                  View Details
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentDashboard;
