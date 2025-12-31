import { createContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS, LEAVE_STATUS, LEAVE_TYPES } from '../utils/constants';
import { generateId, calculateDaysBetween } from '../utils/helpers';

export const LeaveContext = createContext(null);

// Initial leave data
const initialLeaves = [
  {
    id: 'LEAVE001',
    employeeId: 'EMP003',
    leaveType: LEAVE_TYPES.CASUAL,
    startDate: '2024-12-25',
    endDate: '2024-12-27',
    days: 3,
    reason: 'Family vacation',
    status: LEAVE_STATUS.APPROVED,
    appliedOn: '2024-12-10',
    approvedBy: 'EMP001',
    approvedOn: '2024-12-11'
  },
  {
    id: 'LEAVE002',
    employeeId: 'EMP004',
    leaveType: LEAVE_TYPES.SICK,
    startDate: '2024-12-15',
    endDate: '2024-12-16',
    days: 2,
    reason: 'Medical appointment',
    status: LEAVE_STATUS.PENDING,
    appliedOn: '2024-12-14',
    approvedBy: null,
    approvedOn: null
  }
];

/**
 * LeaveProvider Component
 * Manages leave applications and approvals
 */
export const LeaveProvider = ({ children }) => {
  const [leaves, setLeaves] = useLocalStorage(STORAGE_KEYS.LEAVES, initialLeaves);

  /**
   * Get leave by ID
   * @param {string} id - Leave ID
   * @returns {Object} Leave object
   */
  const getLeaveById = (id) => {
    return leaves.find(leave => leave.id === id);
  };

  /**
   * Get leaves by employee
   * @param {string} employeeId - Employee ID
   * @returns {Array} Employee's leaves
   */
  const getLeavesByEmployee = (employeeId) => {
    return leaves.filter(leave => leave.employeeId === employeeId);
  };

  /**
   * Get leaves by status
   * @param {string} status - Leave status
   * @returns {Array} Leaves with specified status
   */
  const getLeavesByStatus = (status) => {
    return leaves.filter(leave => leave.status === status);
  };

  /**
   * Apply for leave
   * @param {Object} leaveData - Leave application data
   * @returns {Object} Created leave
   */
  const applyLeave = (leaveData) => {
    const days = calculateDaysBetween(leaveData.startDate, leaveData.endDate);
    
    const newLeave = {
      ...leaveData,
      id: generateId('LEAVE'),
      days,
      status: LEAVE_STATUS.PENDING,
      appliedOn: new Date().toISOString().split('T')[0],
      approvedBy: null,
      approvedOn: null
    };
    
    setLeaves(prev => [...prev, newLeave]);
    return newLeave;
  };

  /**
   * Update leave
   * @param {string} id - Leave ID
   * @param {Object} updates - Updated data
   * @returns {Object} Updated leave
   */
  const updateLeave = (id, updates) => {
    setLeaves(prev =>
      prev.map(leave =>
        leave.id === id ? { ...leave, ...updates } : leave
      )
    );
    return { ...getLeaveById(id), ...updates };
  };

  /**
   * Approve leave
   * @param {string} id - Leave ID
   * @param {string} approverId - Approver's employee ID
   */
  const approveLeave = (id, approverId) => {
    updateLeave(id, {
      status: LEAVE_STATUS.APPROVED,
      approvedBy: approverId,
      approvedOn: new Date().toISOString().split('T')[0]
    });
  };

  /**
   * Reject leave
   * @param {string} id - Leave ID
   * @param {string} approverId - Approver's employee ID
   * @param {string} reason - Rejection reason
   */
  const rejectLeave = (id, approverId, reason = '') => {
    updateLeave(id, {
      status: LEAVE_STATUS.REJECTED,
      approvedBy: approverId,
      approvedOn: new Date().toISOString().split('T')[0],
      rejectionReason: reason
    });
  };

  /**
   * Cancel leave
   * @param {string} id - Leave ID
   */
  const cancelLeave = (id) => {
    setLeaves(prev => prev.filter(leave => leave.id !== id));
  };

  /**
   * Get leave statistics for employee
   * @param {string} employeeId - Employee ID
   * @returns {Object} Leave statistics
   */
  const getLeaveStats = (employeeId) => {
    const employeeLeaves = getLeavesByEmployee(employeeId);
    
    return {
      total: employeeLeaves.length,
      pending: employeeLeaves.filter(l => l.status === LEAVE_STATUS.PENDING).length,
      approved: employeeLeaves.filter(l => l.status === LEAVE_STATUS.APPROVED).length,
      rejected: employeeLeaves.filter(l => l.status === LEAVE_STATUS.REJECTED).length,
      totalDays: employeeLeaves
        .filter(l => l.status === LEAVE_STATUS.APPROVED)
        .reduce((sum, l) => sum + l.days, 0)
    };
  };

  /**
   * Get pending leave requests (for managers/admins)
   * @returns {Array} Pending leave requests
   */
  const getPendingLeaves = () => {
    return getLeavesByStatus(LEAVE_STATUS.PENDING);
  };

  const value = {
    leaves,
  
    getLeaveById,
    getLeavesByEmployee,
    getLeavesByStatus,
    applyLeave,
    updateLeave,
    approveLeave,
    rejectLeave,
    cancelLeave,
    getLeaveStats,
    getPendingLeaves
  };

  return (
    <LeaveContext.Provider value={value}>
      {children}
    </LeaveContext.Provider>
  );
};

export default LeaveProvider;
