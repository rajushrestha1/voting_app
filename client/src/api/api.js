import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true
});

// Student endpoints
export const studentLogin = (studentId) => API.post('/api/auth/login', { studentId });
export const studentLogout = () => API.post('/api/auth/logout');
export const castVote = (candidateId) => API.post('/api/vote', { candidateId });

// Admin endpoints
export const adminLogin = (credentials) => API.post('/api/admin/login', credentials);
export const adminLogout = () => API.post('/api/admin/logout');
export const addCandidate = (candidateData) => API.post('/api/admin/candidates', candidateData);
export const removeCandidate = (id) => API.delete(`/api/admin/candidates/${id}`);
export const getCandidates = () => API.get('/api/admin/candidates');
export const getResults = () => API.get('/api/admin/results');

// Public endpoints - REMOVE THIS SECTION IF NOT IMPLEMENTED
// export const getPublicCandidates = () => API.get('/public/candidates');

// Use existing admin endpoint for public access
export const getPublicCandidates = () => API.get('/admin/candidates');