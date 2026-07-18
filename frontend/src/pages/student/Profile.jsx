import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiEdit3, FiAward } from 'react-icons/fi';
import AuthContext from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  
  // Dummy certificate data
  const certificates = [
    { id: 1, title: 'React JS Fundamentals', date: 'July 10, 2026', grade: 'A+' },
    { id: 2, title: 'Data Structures 101', date: 'June 25, 2026', grade: 'A' },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    // Simulate API update
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary to-blue-400"></div>
          
          <div className="z-10 mt-16 md:mt-12 flex flex-col items-center">
            <div className="w-32 h-32 bg-white dark:bg-gray-700 rounded-full border-4 border-white dark:border-gray-800 shadow-lg flex items-center justify-center text-primary text-5xl font-bold">
              {user?.name?.charAt(0)}
            </div>
          </div>
          
          <div className="z-10 mt-0 md:mt-24 flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{user?.name}</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium mt-1 uppercase tracking-wider text-sm">{user?.role}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Details Form */}
          <div className="md:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Personal Information</h2>
              <button 
                onClick={() => setIsEditing(!isEditing)} 
                className="text-primary hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
              >
                <FiEdit3 /> <span>{isEditing ? 'Cancel' : 'Edit'}</span>
              </button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center"><FiUser className="mr-2"/> Full Name</label>
                <input 
                  type="text" 
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white transition-colors disabled:opacity-60 disabled:bg-gray-50 dark:disabled:bg-gray-800 outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center"><FiMail className="mr-2"/> Email Address</label>
                <input 
                  type="email" 
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-400 opacity-60 bg-gray-50 cursor-not-allowed outline-none"
                  value={user?.email}
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed.</p>
              </div>

              {isEditing && (
                <button type="submit" className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer shadow-sm">
                  Save Changes
                </button>
              )}
            </form>
          </div>

          {/* Certificates */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
             <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Earned Certificates</h2>
             <div className="space-y-4">
                {certificates.map(cert => (
                  <div key={cert.id} className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 flex items-start space-x-3">
                    <FiAward className="text-yellow-500 text-2xl flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-white text-sm">{cert.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Issued: {cert.date}</p>
                      <p className="text-xs font-semibold text-green-600 dark:text-green-400 mt-1">Grade: {cert.grade}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default Profile;
