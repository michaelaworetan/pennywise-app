import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ENV from '../config/env';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Use environment-based API URL
const API_URL = ENV.apiUrl;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const savedToken = await AsyncStorage.getItem('@auth_token');
      const savedUser = await AsyncStorage.getItem('@user_data');

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
        
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      // Save to AsyncStorage
      await AsyncStorage.setItem('@auth_token', token);
      await AsyncStorage.setItem('@user_data', JSON.stringify(user));

      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setToken(token);
      setUser(user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Invalid email or password',
      };
    }
  };

  const register = async (fullName, email, password) => {
    try {
      console.log('Registering with API:', API_URL);
      const response = await axios.post(`${API_URL}/auth/register`, {
        fullName,
        email,
        password,
      });

      const { token, user } = response.data;

      // Save to AsyncStorage
      await AsyncStorage.setItem('@auth_token', token);
      await AsyncStorage.setItem('@user_data', JSON.stringify(user));

      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setToken(token);
      setUser(user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error details:', error.response?.data);
      console.error('API URL used:', API_URL);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Registration failed. Please check if backend is running.',
      };
    }
  };

  const logout = async () => {
    try {
      // Clear AsyncStorage
      await AsyncStorage.removeItem('@auth_token');
      await AsyncStorage.removeItem('@user_data');

      // Clear axios default header
      delete axios.defaults.headers.common['Authorization'];

      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = async (userData) => {
    try {
      const response = await axios.put(`${API_URL}/user/profile`, userData);
      const updatedUser = response.data.user;

      await AsyncStorage.setItem('@user_data', JSON.stringify(updatedUser));
      setUser(updatedUser);

      return { success: true };
    } catch (error) {
      console.error('Update user error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update profile',
      };
    }
  };

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
