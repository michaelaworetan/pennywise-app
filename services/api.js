import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ENV from '../config/env';

// API Configuration
const API_URL = ENV.apiUrl;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('@auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      await AsyncStorage.removeItem('@auth_token');
      await AsyncStorage.removeItem('@user_data');
      // You might want to redirect to login here
    }
    return Promise.reject(error);
  }
);

// ===== AUTH SERVICES =====

export const authService = {
  async register(fullName, email, password) {
    const response = await api.post('/auth/register', {
      fullName,
      email,
      password,
    });
    return response.data;
  },

  async login(email, password) {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// ===== TRANSACTION SERVICES =====

export const transactionService = {
  async getAll() {
    const response = await api.get('/transactions');
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  },

  async create(transactionData) {
    const response = await api.post('/transactions', transactionData);
    return response.data;
  },

  async update(id, transactionData) {
    const response = await api.put(`/transactions/${id}`, transactionData);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  },
};

// ===== BUDGET SERVICES =====

export const budgetService = {
  async getAll() {
    const response = await api.get('/budgets');
    return response.data;
  },

  async create(budgetData) {
    const response = await api.post('/budgets', budgetData);
    return response.data;
  },

  async update(id, budgetData) {
    const response = await api.put(`/budgets/${id}`, budgetData);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/budgets/${id}`);
    return response.data;
  },
};

// ===== CATEGORY SERVICES =====

export const categoryService = {
  async getAll() {
    const response = await api.get('/categories');
    return response.data;
  },
};

// ===== USER SERVICES =====

export const userService = {
  async updateProfile(userData) {
    const response = await api.put('/user/profile', userData);
    return response.data;
  },

  async changePassword(currentPassword, newPassword) {
    const response = await api.put('/user/password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },
};

// ===== STATS SERVICES =====

export const statsService = {
  async getOverview() {
    const response = await api.get('/stats/overview');
    return response.data;
  },

  async getReports(period = 'month') {
    const response = await api.get('/stats/reports', {
      params: { period },
    });
    return response.data;
  },
};

// Export configured axios instance for custom requests
export default api;
