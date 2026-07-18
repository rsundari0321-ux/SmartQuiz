import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ThemeContext from '../context/ThemeContext';
import { FiSun, FiMoon, FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              SmartQuiz
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'student' && (
                  <Link to="/leaderboard" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors">
                    Leaderboard
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors">
                    Admin Panel
                  </Link>
                )}
                <Link to="/profile" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium ml-4 border-l border-gray-300 dark:border-gray-600 pl-4 transition-colors">
                  Hi, {user.name}
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-red-500 hover:text-red-700 font-medium cursor-pointer"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-x-2">
                <Link to="/login" className="px-4 py-2 text-primary font-medium hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md transition-colors">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 bg-primary text-white font-medium rounded-md shadow hover:bg-blue-700 transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
