import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiCpu, FiEdit2, FiTrash2, FiCheckCircle } from 'react-icons/fi';

const ManageQuizzes = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Dummy data (Will connect to API later)
  const quizzes = [
    { id: 1, title: 'React Basics', category: 'Programming', difficulty: 'Medium', questions: 20, isPublished: true },
    { id: 2, title: 'Advanced Algorithms', category: 'Data Structures', difficulty: 'Hard', questions: 15, isPublished: false },
  ];

  const handleAIGenerate = (e) => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsGenerating(true);
    // Simulate AI generation delay
    setTimeout(() => {
      setIsGenerating(false);
      alert('AI Quiz Generated Successfully! (Simulation)');
    }, 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Quizzes</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Create, edit, or generate quizzes with AI.</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm cursor-pointer">
            <FiPlus />
            <span>Manual Create</span>
          </button>
          
          <label className={`flex items-center space-x-2 bg-gradient-to-r from-secondary to-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-md cursor-pointer ${isGenerating ? 'opacity-70 pointer-events-none' : ''}`}>
            {isGenerating ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <FiCpu />}
            <span>{isGenerating ? 'AI Thinking...' : 'AI Generate from PDF'}</span>
            <input type="file" accept=".pdf" className="hidden" onChange={handleAIGenerate} />
          </label>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Difficulty</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {quizzes.map((quiz) => (
              <tr key={quiz.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="p-4 text-gray-800 dark:text-white font-medium">{quiz.title}</td>
                <td className="p-4 text-gray-600 dark:text-gray-300">{quiz.category}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    quiz.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    quiz.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {quiz.difficulty}
                  </span>
                </td>
                <td className="p-4">
                  {quiz.isPublished ? 
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center"><FiCheckCircle className="mr-1"/> Published</span> : 
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Draft</span>
                  }
                </td>
                <td className="p-4 flex justify-end space-x-3">
                  <button className="text-blue-500 hover:text-blue-700 p-2 cursor-pointer"><FiEdit2 /></button>
                  <button className="text-red-500 hover:text-red-700 p-2 cursor-pointer"><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ManageQuizzes;
