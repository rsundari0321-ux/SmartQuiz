import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAward, FiClock, FiCheckCircle, FiXCircle, FiShare2, FiDownload } from 'react-icons/fi';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Results = () => {
  const { id } = useParams();
  
  // Dummy result data (Will connect to API later)
  const [result, setResult] = useState({
    score: 35,
    totalMarks: 40,
    percentage: 87.5,
    correctAnswers: 17,
    wrongAnswers: 3,
    timeTaken: 1245, // seconds
    isPassed: true,
    quizTitle: 'React JS Fundamentals'
  });

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  const doughnutData = {
    labels: ['Correct', 'Wrong', 'Unanswered'],
    datasets: [
      {
        data: [result.correctAnswers, result.wrongAnswers, 20 - (result.correctAnswers + result.wrongAnswers)],
        backgroundColor: ['#10B981', '#EF4444', '#E5E7EB'], // Green, Red, Gray
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        
        <div className={`p-8 text-center text-white ${result.isPassed ? 'bg-gradient-to-r from-secondary to-green-500' : 'bg-gradient-to-r from-red-500 to-orange-500'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 shadow-inner">
            <FiAward size={40} />
          </div>
          <h1 className="text-4xl font-bold mb-2">{result.isPassed ? 'Congratulations!' : 'Keep Trying!'}</h1>
          <p className="text-lg opacity-90">You scored {result.score} out of {result.totalMarks} in {result.quizTitle}</p>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-64 h-64">
              <Doughnut data={doughnutData} options={{ cutout: '75%', plugins: { legend: { display: false } } }} />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-5xl font-bold text-gray-800 dark:text-white">{result.percentage}%</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">Score</span>
              </div>
            </div>
            
            <div className="flex space-x-6 mt-8">
              <div className="flex items-center"><div className="w-4 h-4 bg-green-500 rounded mr-2"></div><span className="text-gray-600 dark:text-gray-300 font-medium">Correct ({result.correctAnswers})</span></div>
              <div className="flex items-center"><div className="w-4 h-4 bg-red-500 rounded mr-2"></div><span className="text-gray-600 dark:text-gray-300 font-medium">Wrong ({result.wrongAnswers})</span></div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Performance Details</h3>
            
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl flex items-center justify-between border border-gray-100 dark:border-gray-600">
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <FiClock className="mr-3 text-primary" size={24} />
                <span className="font-medium">Time Taken</span>
              </div>
              <span className="text-lg font-bold text-gray-800 dark:text-white">{formatTime(result.timeTaken)}</span>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl flex items-center justify-between border border-green-100 dark:border-green-900/30">
              <div className="flex items-center text-green-700 dark:text-green-400">
                <FiCheckCircle className="mr-3" size={24} />
                <span className="font-medium">Passing Status</span>
              </div>
              <span className={`text-lg font-bold ${result.isPassed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {result.isPassed ? 'PASSED' : 'FAILED'}
              </span>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button className="flex-1 flex items-center justify-center space-x-2 bg-primary hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors shadow-md cursor-pointer">
                <FiDownload /> <span>Download PDF</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-3 rounded-xl transition-colors cursor-pointer">
                <FiShare2 /> <span>Share</span>
              </button>
            </div>
            
            <Link to="/dashboard" className="block text-center mt-6 text-primary font-medium hover:underline">
              Return to Dashboard
            </Link>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
};

export default Results;
