import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProviderFirebase = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const userData = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          fullName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        
        // Save to AsyncStorage for offline access
        await AsyncStorage.setItem('@user_data', JSON.stringify(userData));
      } else {
        // User is signed out
        setUser(null);
        setIsAuthenticated(false);
        await AsyncStorage.removeItem('@user_data');
      }
      setIsLoading(false);
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  // Register with Firebase
  const register = async (fullName, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update profile with display name
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      
      let message = 'Registration failed';
      if (error.code === 'auth/email-already-in-use') {
        message = 'Email already registered';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password is too weak';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address';
      }
      
      return { success: false, message };
    }
  };

  // Login with Firebase
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      
      let message = 'Login failed';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        message = 'Invalid email or password';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address';
      } else if (error.code === 'auth/user-disabled') {
        message = 'Account has been disabled';
      }
      
      return { success: false, message };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('@user_data');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Update user profile
  const updateUser = async (userData) => {
    try {
      const currentUser = auth.currentUser;
      
      if (currentUser) {
        await updateProfile(currentUser, {
          displayName: userData.fullName,
          photoURL: userData.photoURL,
        });

        const updatedUser = {
          ...user,
          fullName: userData.fullName,
          photoURL: userData.photoURL,
        };

        setUser(updatedUser);
        await AsyncStorage.setItem('@user_data', JSON.stringify(updatedUser));

        return { success: true };
      }

      return { success: false, message: 'No user logged in' };
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, message: 'Failed to update profile' };
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProviderFirebase;
