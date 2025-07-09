import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true
});

// Student endpoints
export const studentLogin = (studentId) => API.post('/auth/login', { studentId });
export const studentLogout = () => API.post('/auth/logout');
export const castVote = (voteData) => API.post('/vote', voteData);  // Fixed: Accept object instead of separate params

// Admin endpoints
export const adminLogin = (credentials) => API.post('/admin/login', credentials);
export const adminLogout = () => API.post('/admin/logout');
export const addCandidate = (candidateData) => API.post('/admin/candidates', candidateData);
export const removeCandidate = (id) => API.delete(`/admin/candidates/${id}`);
export const getCandidates = () => API.get('/admin/candidates');
export const getResults = () => API.get('/admin/results');

// Public endpoints
export const getPublicCandidates = () => API.get('/public/candidates');