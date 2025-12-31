import { useContext } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';

/**
 * Custom hook to use Employee context
 * @returns {Object} Employee context value
 */
export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  
  return context;
};

export default useEmployees;
