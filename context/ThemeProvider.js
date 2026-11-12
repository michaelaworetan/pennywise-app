import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../constants/Colors';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('system'); // 'light', 'dark', 'system'
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme preference
  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('@theme_mode');
      if (savedTheme) {
        setThemeMode(savedTheme);
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveThemePreference = async (mode) => {
    try {
      await AsyncStorage.setItem('@theme_mode', mode);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const toggleTheme = async (mode) => {
    setThemeMode(mode);
    await saveThemePreference(mode);
  };

  // Determine actual theme based on mode
  const getActualTheme = () => {
    if (themeMode === 'system') {
      return systemColorScheme || 'light';
    }
    return themeMode;
  };

  const actualTheme = getActualTheme();
  const colors = Colors[actualTheme];

  const value = {
    theme: actualTheme,
    themeMode,
    colors,
    toggleTheme,
    isDark: actualTheme === 'dark',
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
