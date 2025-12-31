import { createContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateInitialAttendance } from '../data/attendance';
import { STORAGE_KEYS, ATTENDANCE_STATUS } from '../utils/constants';
import { getTodayDate } from '../utils/helpers';

export const AttendanceContext = createContext(null);

/**
 * AttendanceProvider Component
 * Manages attendance data and operations
 */
export const AttendanceProvider = ({ children }) => {
  const [attendance, setAttendance] = useLocalStorage(
    STORAGE_KEYS.ATTENDANCE,
    generateInitialAttendance()
  );
  const [loading, setLoading] = useState(false);

  /**
   * Get attendance by employee ID
   * @param {string} employeeId - Employee ID
   * @returns {Array} Attendance records
   */
  const getAttendanceByEmployee = (employeeId) => {
    return attendance.filter(att => att.employeeId === employeeId);
  };

  /**
   * Get attendance by date
   * @param {string} date - Date in YYYY-MM-DD format
   * @returns {Array} Attendance records for date
   */
  const getAttendanceByDate = (date) => {
    return attendance.filter(att => att.date === date);
  };

  /**
   * Get today's attendance
   * @returns {Array} Today's attendance records
   */
  const getTodaysAttendance = () => {
    return getAttendanceByDate(getTodayDate());
  };

  /**
   * Mark attendance for employee
   * @param {string} employeeId - Employee ID
   * @param {string} date - Date
   * @param {string} status - Attendance status
   * @param {Object} additionalData - Additional data (checkIn, checkOut, etc.)
   */
  const markAttendance = (employeeId, date, status, additionalData = {}) => {
    const id = `ATT-${employeeId}-${date}`;
    const existing = attendance.find(att => att.id === id);

    if (existing) {
      // Update existing record
      setAttendance(prev =>
        prev.map(att =>
          att.id === id
            ? { ...att, status, ...additionalData }
            : att
        )
      );
    } else {
      // Create new record
      const newRecord = {
        id,
        employeeId,
        date,
        status,
        checkInTime: additionalData.checkInTime || null,
        checkOutTime: additionalData.checkOutTime || null,
        workingHours: additionalData.workingHours || 0,
        notes: additionalData.notes || ''
      };
      setAttendance(prev => [...prev, newRecord]);
    }
  };

  /**
   * Get attendance statistics for employee
   * @param {string} employeeId - Employee ID
   * @param {number} days - Number of days to check (default 30)
   * @returns {Object} Attendance statistics
   */
  const getEmployeeAttendanceStats = (employeeId, days = 30) => {
    const records = getAttendanceByEmployee(employeeId).slice(-days);
    
    return {
      total: records.length,
      present: records.filter(att => att.status === ATTENDANCE_STATUS.PRESENT).length,
      absent: records.filter(att => att.status === ATTENDANCE_STATUS.ABSENT).length,
      halfDay: records.filter(att => att.status === ATTENDANCE_STATUS.HALF_DAY).length,
      late: records.filter(att => att.status === ATTENDANCE_STATUS.LATE).length,
      attendanceRate: records.length > 0
        ? ((records.filter(att => att.status === ATTENDANCE_STATUS.PRESENT).length / records.length) * 100).toFixed(1)
        : 0
    };
  };

  /**
   * Get overall attendance statistics for a date
   * @param {string} date - Date
   * @returns {Object} Attendance statistics
   */
  const getDateAttendanceStats = (date) => {
    const records = getAttendanceByDate(date);
    
    return {
      total: records.length,
      present: records.filter(att => att.status === ATTENDANCE_STATUS.PRESENT).length,
      absent: records.filter(att => att.status === ATTENDANCE_STATUS.ABSENT).length,
      halfDay: records.filter(att => att.status === ATTENDANCE_STATUS.HALF_DAY).length,
      late: records.filter(att => att.status === ATTENDANCE_STATUS.LATE).length
    };
  };

  const value = {
    attendance,
    loading,
    getAttendanceByEmployee,
    getAttendanceByDate,
    getTodaysAttendance,
    markAttendance,
    getEmployeeAttendanceStats,
    getDateAttendanceStats
  };

  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  );
};

export default AttendanceProvider;
