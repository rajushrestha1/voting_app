import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { student, admin, logoutStudent, logoutAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (student) {
      logoutStudent();
      navigate('/');
    } else if (admin) {
      logoutAdmin();
      navigate('/admin/login');
    }
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">CampusVote</Link>
        
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-200 transition">Home</Link>
          <Link to="/about" className="hover:text-blue-200 transition">About Us</Link>
          <Link to="/candidates" className="hover:text-blue-200 transition">Candidate Details</Link>
          <Link to="/requirements" className="hover:text-blue-200 transition">Voting Requirements</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {student ? (
            <div className="flex items-center space-x-3">
              <span>Welcome, {student.name}</span>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </div>
          ) : admin ? (
            <div className="flex items-center space-x-3">
              <span>Admin Panel</span>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded font-medium hover:bg-blue-50 transition">
                Student Login
              </Link>
              <Link to="/admin/login" className="bg-gray-800 text-white px-4 py-2 rounded font-medium hover:bg-gray-700 transition">
                Admin Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;