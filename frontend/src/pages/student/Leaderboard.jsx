import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiAward } from 'react-icons/fi';

const Leaderboard = () => {
  // Dummy data (Will connect to API later)
  const students = [
    { id: 1, name: 'Alice Smith', score: 450, quizzesTaken: 12, avg: 92 },
    { id: 2, name: 'John Doe', score: 410, quizzesTaken: 11, avg: 88 },
    { id: 3, name: 'Emma Watson', score: 390, quizzesTaken: 10, avg: 85 },
    { id: 4, name: 'Rahul Sharma', score: 360, quizzesTaken: 10, avg: 81 },
    { id: 5, name: 'Sarah Connor', score: 310, quizzesTaken: 8, avg: 79 },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        
        <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-accent/20 text-accent rounded-xl">
              <FiAward size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Global Leaderboard</h1>
              <p className="text-gray-500 dark:text-gray-400">See how you rank against other students.</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium w-24 text-center">Rank</th>
                <th className="p-4 font-medium">Student Name</th>
                <th className="p-4 font-medium text-center hidden sm:table-cell">Quizzes Taken</th>
                <th className="p-4 font-medium text-center hidden sm:table-cell">Avg. %</th>
                <th className="p-4 font-medium text-right">Total Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {students.map((student, idx) => (
                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="p-4 text-center">
                    <span className={`inline-block w-8 h-8 rounded-full leading-8 text-center font-bold ${
                      idx === 0 ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30' : 
                      idx === 1 ? 'bg-gray-200 text-gray-600 dark:bg-gray-700' :
                      idx === 2 ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30' :
                      'text-gray-500'
                    }`}>
                      #{idx + 1}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-800 dark:text-white">{student.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center text-gray-600 dark:text-gray-300 hidden sm:table-cell">{student.quizzesTaken}</td>
                  <td className="p-4 text-center hidden sm:table-cell">
                    <span className="inline-flex items-center text-green-600 dark:text-green-400 font-medium">
                       {student.avg}% <FiTrendingUp className="ml-1"/>
                    </span>
                  </td>
                  <td className="p-4 text-right font-bold text-lg text-primary">{student.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
