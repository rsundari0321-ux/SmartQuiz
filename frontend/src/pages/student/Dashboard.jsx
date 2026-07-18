import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiClock, FiBookOpen, FiFilter } from 'react-icons/fi';

const StudentDashboard = () => {
  // 20 dummy quizzes covering 16 distinct domains, all exactly 30 minutes.
  const allQuizzes = [
    { id: '1', title: 'React JS Fundamentals', category: 'Web Development', difficulty: 'Medium', duration: 30, questions: 20 },
    { id: '2', title: 'Data Structures in C++', category: 'Computer Science', difficulty: 'Hard', duration: 30, questions: 25 },
    { id: '3', title: 'Quantitative Aptitude Basics', category: 'Aptitude', difficulty: 'Easy', duration: 30, questions: 15 },
    { id: '4', title: 'Machine Learning Models', category: 'Artificial Intelligence', difficulty: 'Hard', duration: 30, questions: 30 },
    { id: '5', title: 'Cloud Computing with AWS', category: 'Cloud Architecture', difficulty: 'Medium', duration: 30, questions: 20 },
    { id: '6', title: 'Cybersecurity Principles', category: 'Cybersecurity', difficulty: 'Medium', duration: 30, questions: 20 },
    { id: '7', title: 'Mobile App Dev (Flutter)', category: 'Mobile Development', difficulty: 'Medium', duration: 30, questions: 20 },
    { id: '8', title: 'Digital Marketing Strategies', category: 'Marketing', difficulty: 'Easy', duration: 30, questions: 15 },
    { id: '9', title: 'UI/UX Design Thinking', category: 'Design', difficulty: 'Medium', duration: 30, questions: 20 },
    { id: '10', title: 'Python for Data Analysis', category: 'Data Science', difficulty: 'Hard', duration: 30, questions: 25 },
    { id: '11', title: 'Agile Project Management', category: 'Management', difficulty: 'Easy', duration: 30, questions: 15 },
    { id: '12', title: 'Blockchain & Cryptography', category: 'Blockchain', difficulty: 'Hard', duration: 30, questions: 25 },
    { id: '13', title: 'Game Development (Unity)', category: 'Game Design', difficulty: 'Medium', duration: 30, questions: 20 },
    { id: '14', title: 'Network Protocols (TCP/IP)', category: 'Networking', difficulty: 'Medium', duration: 30, questions: 20 },
    { id: '15', title: 'Software Testing (QA)', category: 'Quality Assurance', difficulty: 'Easy', duration: 30, questions: 15 },
    { id: '16', title: 'Internet of Things (IoT)', category: 'Hardware', difficulty: 'Medium', duration: 30, questions: 20 },
    { id: '17', title: 'Advanced CSS Animations', category: 'Web Development', difficulty: 'Hard', duration: 30, questions: 25 },
    { id: '18', title: 'SQL & Database Design', category: 'Data Science', difficulty: 'Medium', duration: 30, questions: 20 },
    { id: '19', title: 'Ethical Hacking 101', category: 'Cybersecurity', difficulty: 'Hard', duration: 30, questions: 25 },
    { id: '20', title: 'Operating Systems Concepts', category: 'Computer Science', difficulty: 'Medium', duration: 30, questions: 20 }
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories and add 'All'
  const categories = ['All', ...new Set(allQuizzes.map(q => q.category))];

  // Filter quizzes based on selected category
  const filteredQuizzes = selectedCategory === 'All' 
    ? allQuizzes 
    : allQuizzes.filter(q => q.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-blue-400 rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-bold mb-2">Ready to test your skills?</h1>
          <p className="text-blue-100 max-w-2xl">Select a quiz from the list below and challenge yourself. Make sure you are in a quiet environment before starting the timer.</p>
        </div>

        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Available Quizzes ({filteredQuizzes.length})</h2>
            
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              <FiFilter className="text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {filteredQuizzes.length === 0 ? (
             <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                No quizzes found for this domain.
             </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredQuizzes.map((quiz) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ y: -5 }}
                    key={quiz.id} 
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col transition-shadow hover:shadow-md"
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
                    
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 leading-tight">{quiz.title}</h3>
                    
                    <div className="mt-auto space-y-3 mb-6 pt-4">
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
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default StudentDashboard;
