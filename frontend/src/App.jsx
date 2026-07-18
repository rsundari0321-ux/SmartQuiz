import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ManageQuizzes from './pages/admin/ManageQuizzes';

import StudentDashboard from './pages/student/Dashboard';
import QuizInstructions from './pages/student/QuizInstructions';
import TakeQuiz from './pages/student/TakeQuiz';
import Results from './pages/student/Results';
import Leaderboard from './pages/student/Leaderboard';
import Profile from './pages/student/Profile';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

// Simple PrivateRoute for student area
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Student Protected Routes */}
            <Route path="/dashboard" element={<PrivateRoute><StudentDashboard /></PrivateRoute>} />
            <Route path="/quiz/instructions/:id" element={<PrivateRoute><QuizInstructions /></PrivateRoute>} />
            <Route path="/quiz/take/:id" element={<PrivateRoute><TakeQuiz /></PrivateRoute>} />
            <Route path="/results/:id" element={<PrivateRoute><Results /></PrivateRoute>} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

            {/* Admin Protected Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="quizzes" element={<ManageQuizzes />} />
              <Route path="users" element={<div className="p-8 text-gray-800 dark:text-white">Manage Users coming soon...</div>} />
              <Route path="settings" element={<div className="p-8 text-gray-800 dark:text-white">Settings coming soon...</div>} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
