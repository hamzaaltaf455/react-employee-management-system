import { createContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getUserByCredentials } from '../data/users';
import { STORAGE_KEYS } from '../utils/constants';

export const AuthContext = createContext(null);

/**
 * AuthProvider Component
 * Manages authentication state and provides auth methods
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage(STORAGE_KEYS.AUTH_USER, null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking authentication on mount
    setLoading(false);
  }, []);

  /**
   * Login user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Object} Result with success status and message
   */
  const login = (email, password) => {
    const authenticatedUser = getUserByCredentials(email, password);
    
    if (authenticatedUser) {
      // Remove password from stored user data
      const { password: _, ...userWithoutPassword } = authenticatedUser;
      setUser(userWithoutPassword);
      return { success: true, message: 'Login successful' };
    }
    
    return { success: false, message: 'Invalid credentials' };
  };

  /**
   * Logout current user
   */
  const logout = () => {
    setUser(null);
  };

  /**
   * Update user profile
   * @param {Object} updates - Profile updates
   */
  const updateProfile = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  /**
   * Check if user has specific role
   * @param {string} role - Role to check
   * @returns {boolean} True if user has role
   */
  const hasRole = (role) => {
    return user?.role === role;
  };

  /**
   * Check if user has any of the specified roles
   * @param {Array} roles - Array of roles to check
   * @returns {boolean} True if user has any of the roles
   */
  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  const value = {
    user,
    login,
    logout,
    updateProfile,
    hasRole,
    hasAnyRole,
    isAuthenticated: !!user,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
