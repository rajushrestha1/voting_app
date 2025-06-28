// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { studentLogin, adminLogin, studentLogout, adminLogout } from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedStudent = localStorage.getItem('student');
        const storedAdmin = localStorage.getItem('admin');

        if (storedStudent) {
          setStudent(JSON.parse(storedStudent));
        }
        if (storedAdmin) {
          setAdmin(JSON.parse(storedAdmin));
        }
      } catch (e) {
        console.error("Error parsing auth data:", e);
        localStorage.removeItem('student');
        localStorage.removeItem('admin');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Student authentication functions
  const loginStudent = async (studentId) => {
    try {
      const response = await studentLogin(studentId);
      
      // Handle non-2xx responses
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.data?.message || 'Login failed');
      }

      // Validate response structure
      if (!response.data.studentId || !response.data.name) {
        throw new Error('Invalid server response structure');
      }

      const studentData = {
        studentId: response.data.studentId,
        name: response.data.name,
        hasVoted: response.data.hasVoted || false
      };

      setStudent(studentData);
      localStorage.setItem('student', JSON.stringify(studentData));
      return studentData;
    } catch (error) {
      console.error('Student login error:', error);
      
      // Extract meaningful error message
      let errorMessage = 'Login failed. Please check your Student ID.';
      if (error.response) {
        // Axios error with response
        errorMessage = error.response.data?.message || 
                      error.response.statusText || 
                      `Error: ${error.response.status}`;
      } else if (error.message) {
        // Error thrown manually
        errorMessage = error.message;
      } else if (error.request) {
        // Request was made but no response
        errorMessage = 'Network error. Please check your connection.';
      }
      
      throw new Error(errorMessage);
    }
  };

  const logoutStudent = async () => {
    try {
      await studentLogout();
      setStudent(null);
      localStorage.removeItem('student');
    } catch (error) {
      console.error('Logout failed:', error);
      
      let errorMessage = 'Logout failed';
      if (error.response) {
        errorMessage = error.response.data?.message || error.response.statusText;
      }
      
      throw new Error(errorMessage);
    }
  };

  // Admin authentication functions
  const loginAdmin = async (credentials) => {
    try {
      const response = await adminLogin(credentials);
      
      // Handle non-2xx responses
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.data?.message || 'Login failed');
      }

      // For admin, we'll create a minimal admin object
      const adminData = {
        username: credentials.username,
        isAuthenticated: true
      };

      setAdmin(adminData);
      localStorage.setItem('admin', JSON.stringify(adminData));
      return response.data;
    } catch (error) {
      console.error('Admin login error:', error);
      
      // Extract meaningful error message
      let errorMessage = 'Admin login failed. Check your credentials.';
      if (error.response) {
        errorMessage = error.response.data?.message || 
                      error.response.statusText || 
                      `Error: ${error.response.status}`;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      throw new Error(errorMessage);
    }
  };

  const logoutAdmin = async () => {
    try {
      await adminLogout();
      setAdmin(null);
      localStorage.removeItem('admin');
    } catch (error) {
      console.error('Admin logout failed:', error);
      
      let errorMessage = 'Logout failed';
      if (error.response) {
        errorMessage = error.response.data?.message || error.response.statusText;
      }
      
      throw new Error(errorMessage);
    }
  };

  // Check authentication status
  const isAuthenticated = () => {
    return !!student || !!admin;
  };

  // Get current user role
  const getUserRole = () => {
    if (student) return 'student';
    if (admin) return 'admin';
    return null;
  };

  // Clear all auth data (for debugging)
  const resetAuth = () => {
    setStudent(null);
    setAdmin(null);
    localStorage.removeItem('student');
    localStorage.removeItem('admin');
  };

  return (
    <AuthContext.Provider value={{
      student,
      admin,
      loading,
      isAuthenticated,
      getUserRole,
      loginStudent,
      loginAdmin,
      logoutStudent,
      logoutAdmin,
      resetAuth // Optional for debugging
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};