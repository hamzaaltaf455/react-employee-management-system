import { createContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialEmployees } from '../data/employees';
import { STORAGE_KEYS, EMPLOYEE_STATUS } from '../utils/constants';
import { generateId } from '../utils/helpers';

export const EmployeeContext = createContext(null);

/**
 * EmployeeProvider Component
 * Manages employee data and CRUD operations
 */
export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useLocalStorage(STORAGE_KEYS.EMPLOYEES, initialEmployees);
  const [loading, setLoading] = useState(false);

  /**
   * Get employee by ID
   * @param {string} id - Employee ID
   * @returns {Object} Employee object
   */
  const getEmployeeById = (id) => {
    return employees.find(emp => emp.id === id);
  };

  /**
   * Get employees by department
   * @param {string} departmentId - Department ID
   * @returns {Array} Array of employees
   */
  const getEmployeesByDepartment = (departmentId) => {
    return employees.filter(emp => emp.department === departmentId);
  };

  /**
   * Get employees by status
   * @param {string} status - Employee status
   * @returns {Array} Array of employees
   */
  const getEmployeesByStatus = (status) => {
    return employees.filter(emp => emp.status === status);
  };

  /**
   * Add new employee
   * @param {Object} employeeData - Employee data
   * @returns {Object} Created employee
   */
  const addEmployee = (employeeData) => {
    const newEmployee = {
      ...employeeData,
      id: generateId('EMP'),
      status: employeeData.status || EMPLOYEE_STATUS.ACTIVE,
      avatar: `https://ui-avatars.com/api/?name=${employeeData.firstName}+${employeeData.lastName}&background=random&color=fff`
    };
    
    setEmployees(prev => [...prev, newEmployee]);
    return newEmployee;
  };

  /**
   * Update employee
   * @param {string} id - Employee ID
   * @param {Object} updates - Updated data
   * @returns {Object} Updated employee
   */
  const updateEmployee = (id, updates) => {
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === id ? { ...emp, ...updates } : emp
      )
    );
    return { ...getEmployeeById(id), ...updates };
  };

  /**
   * Delete employee
   * @param {string} id - Employee ID
   */
  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  /**
   * Search employees
   * @param {string} searchTerm - Search term
   * @returns {Array} Filtered employees
   */
  const searchEmployees = (searchTerm) => {
    if (!searchTerm) return employees;
    
    const term = searchTerm.toLowerCase();
    return employees.filter(emp =>
      emp.firstName.toLowerCase().includes(term) ||
      emp.lastName.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term) ||
      emp.id.toLowerCase().includes(term) ||
      emp.position.toLowerCase().includes(term)
    );
  };

  /**
   * Get employee statistics
   * @returns {Object} Employee stats
   */
  const getEmployeeStats = () => {
    return {
      total: employees.length,
      active: employees.filter(emp => emp.status === EMPLOYEE_STATUS.ACTIVE).length,
      inactive: employees.filter(emp => emp.status === EMPLOYEE_STATUS.INACTIVE).length,
      onLeave: employees.filter(emp => emp.status === EMPLOYEE_STATUS.ON_LEAVE).length
    };
  };

  const value = {
    employees,
    loading,
    getEmployeeById,
    getEmployeesByDepartment,
    getEmployeesByStatus,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployees,
    getEmployeeStats
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
