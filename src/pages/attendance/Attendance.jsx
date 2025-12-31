import { useState, useContext } from 'react';
import { EmployeeContext } from '../../context/EmployeeContext';
import { AttendanceContext } from '../../context/AttendanceContext';
import AttendanceTable from './components/AttendanceTable';
import Input from '../../components/ui/Input';
import { getTodayDate } from '../../utils/helpers';
import { useToast } from '../../components/ui/Toast';

/**
 * Attendance Page Component
 */
export const Attendance = () => {
  const { employees } = useContext(EmployeeContext);
  const { getAttendanceByDate, markAttendance } = useContext(AttendanceContext);
  const toast = useToast();
  
  const [selectedDate, setSelectedDate] = useState(getTodayDate());

  const attendanceRecords = getAttendanceByDate(selectedDate);

  const handleMarkAttendance = (employeeId, status) => {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    markAttendance(employeeId, selectedDate, status, {
      checkInTime: status === 'Present' || status === 'Late' ? time : null,
      checkOutTime: null,
      workingHours: 0
    });

    toast.success(`Attendance marked as ${status}`);
  };

  const stats = {
    total: employees.length,
    present: attendanceRecords.filter(a => a.status === 'Present').length,
    absent: attendanceRecords.filter(a => a.status === 'Absent').length,
    notMarked: employees.length - attendanceRecords.length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
        <p className="text-gray-600 mt-1">Mark and track employee attendance</p>
      </div>

      {/* Date Selector & Stats */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-auto"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Total Employees</p>
            <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Present</p>
            <p className="text-2xl font-bold text-green-600">{stats.present}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Absent</p>
            <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Not Marked</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.notMarked}</p>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <AttendanceTable
        employees={employees}
        attendanceRecords={attendanceRecords}
        onMarkAttendance={handleMarkAttendance}
      />
    </div>
  );
};

export default Attendance;
