import { motion } from 'framer-motion';
import { FiUsers, FiCheckCircle, FiClock, FiTrendingUp } from 'react-icons/fi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  // Dummy data for analytics (Will be connected to API later)
  const stats = [
    { title: 'Total Students', value: '1,245', icon: <FiUsers className="text-blue-500" />, bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { title: 'Quizzes Created', value: '48', icon: <FiCheckCircle className="text-green-500" />, bg: 'bg-green-100 dark:bg-green-900/30' },
    { title: 'Active Attempts', value: '312', icon: <FiClock className="text-orange-500" />, bg: 'bg-orange-100 dark:bg-orange-900/30' },
    { title: 'Avg. Pass Rate', value: '76%', icon: <FiTrendingUp className="text-purple-500" />, bg: 'bg-purple-100 dark:bg-purple-900/30' },
  ];

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Quiz Attempts',
        data: [400, 600, 800, 750, 1100, 1400],
        backgroundColor: 'rgba(37, 99, 235, 0.8)',
        borderRadius: 4,
      },
    ],
  };

  const doughnutData = {
    labels: ['Programming', 'Aptitude', 'Data Structures'],
    datasets: [
      {
        data: [45, 30, 25],
        backgroundColor: ['#2563EB', '#14B8A6', '#F59E0B'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Overview Analytics</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center space-x-4">
            <div className={`p-4 rounded-full ${stat.bg}`}>
              <div className="text-2xl">{stat.icon}</div>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Platform Activity</h3>
          <div className="h-72 flex items-center justify-center">
             <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Quizzes by Category</h3>
          <div className="h-64 flex items-center justify-center">
            <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false, cutout: '70%' }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
