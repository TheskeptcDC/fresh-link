jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // Import the auth object from firebase.js

// Authentication Context
const AuthContext = createContext(null);

/**
 * Provides the authentication context to the application.
 * Manages user authentication state and provides login/logout functions.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for changes in the authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    // Clean up the listener on component unmount
    return unsubscribe;
  }, []);

  /**
   * Placeholder function for signing in with a custom token.
   * In a real application, the token would be generated server-side.
   * @param {string} token - The custom authentication token.
   */
  const loginWithCustomToken = async (token) => {
    try {
      await auth.signInWithCustomToken(token);
      // The onAuthStateChanged listener will update the user state
      console.log("Successfully signed in with custom token.");
    } catch (error) {
      console.error("Error signing in with custom token:", error);
      throw error; // Re-throw to allow catching in the component
    }
  };

  /**
   * Signs out the current user.
   */
  const logout = () => {
    auth.signOut();
    console.log("User signed out.");
  }

  // Provide the user, loading state, and auth functions to children components
  return (
    <AuthContext.Provider value={{ user, loading, loginWithCustomToken, logout }}>
      {/* Render children only after authentication state is determined */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to easily access the authentication context.
 * @returns {object} - The authentication context value.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * A route component that protects access to its children.
 * Redirects to the login page if the user is not authenticated.
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Show a loading indicator while checking authentication status
  if (loading) {
    return <div>Loading...</div>; // Replace with a more sophisticated loading component if needed
  }

  // Redirect to login if no user is authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render the children components if the user is authenticated
  return children;
};

// Import placeholder components for now
import LoginPage from './pages/Login';
import HomePage from './pages/Home';

/**
 * The main application component.
 * Sets up routing and wraps the application with the AuthProvider.
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Route for the login page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected route for the home page */}
          {/* Only accessible if the user is authenticated */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          {/* Add other protected or public routes here as your app grows */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;