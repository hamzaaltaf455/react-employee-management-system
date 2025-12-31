import { createContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialDepartments } from '../data/departments';
import { STORAGE_KEYS, DEPARTMENT_STATUS } from '../utils/constants';
import { generateId } from '../utils/helpers';

export const DepartmentContext = createContext(null);

/**
 * DepartmentProvider Component
 * Manages department data and CRUD operations
 */
export const DepartmentProvider = ({ children }) => {
  const [departments, setDepartments] = useLocalStorage(STORAGE_KEYS.DEPARTMENTS, initialDepartments);

  /**
   * Get department by ID
   * @param {string} id - Department ID
   * @returns {Object} Department object
   */
  const getDepartmentById = (id) => {
    return departments.find(dept => dept.id === id);
  };

  /**
   * Get department by name
   * @param {string} name - Department name
   * @returns {Object} Department object
   */
  const getDepartmentByName = (name) => {
    return departments.find(dept => dept.name.toLowerCase() === name.toLowerCase());
  };

  /**
   * Add new department
   * @param {Object} departmentData - Department data
   * @returns {Object} Created department
   */
  const addDepartment = (departmentData) => {
    const newDepartment = {
      ...departmentData,
      id: generateId('DEPT'),
      employeeCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      status: departmentData.status || DEPARTMENT_STATUS.ACTIVE
    };
    
    setDepartments(prev => [...prev, newDepartment]);
    return newDepartment;
  };

  /**
   * Update department
   * @param {string} id - Department ID
   * @param {Object} updates - Updated data
   * @returns {Object} Updated department
   */
  const updateDepartment = (id, updates) => {
    setDepartments(prev =>
      prev.map(dept =>
        dept.id === id ? { ...dept, ...updates } : dept
      )
    );
    return { ...getDepartmentById(id), ...updates };
  };

  /**
   * Delete department
   * @param {string} id - Department ID
   */
  const deleteDepartment = (id) => {
    setDepartments(prev => prev.filter(dept => dept.id !== id));
  };

  /**
   * Update employee count for department
   * @param {string} id - Department ID
   * @param {number} count - New employee count
   */
  const updateEmployeeCount = (id, count) => {
    updateDepartment(id, { employeeCount: count });
  };

  const value = {
    departments,
    getDepartmentById,
    getDepartmentByName,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    updateEmployeeCount
  };

  return (
    <DepartmentContext.Provider value={value}>
      {children}
    </DepartmentContext.Provider>
  );
};

export default DepartmentProvider;
