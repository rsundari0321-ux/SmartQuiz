import { Link, useLocation } from 'react-router-dom';
import { FiGrid, FiList, FiUsers, FiSettings } from 'react-icons/fi';

const AdminSidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <FiGrid /> },
    { name: 'Manage Quizzes', path: '/admin/quizzes', icon: <FiList /> },
    { name: 'Users', path: '/admin/users', icon: <FiUsers /> },
    { name: 'Settings', path: '/admin/settings', icon: <FiSettings /> },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 h-[calc(100vh-4rem)] shadow-lg flex flex-col transition-colors duration-300">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white uppercase tracking-wider">Admin Panel</h2>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
