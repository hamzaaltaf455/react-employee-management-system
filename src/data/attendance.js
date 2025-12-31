// Mock attendance data generator
export const generateInitialAttendance = () => {
  const attendance = [];
  const today = new Date();
  const employeeIds = [
    'EMP001', 'EMP002', 'EMP003', 'EMP004', 'EMP005', 
    'EMP006', 'EMP007', 'EMP008', 'EMP009', 'EMP010',
    'EMP011', 'EMP012', 'EMP013', 'EMP014', 'EMP015'
  ];

  // Generate attendance for the last 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    employeeIds.forEach(empId => {
      // 90% chance of being present
      const isPresent = Math.random() > 0.1;
      const checkInTime = isPresent ? `09:${Math.floor(Math.random() * 30).toString().padStart(2, '0')}` : null;
      const checkOutTime = isPresent ? `18:${Math.floor(Math.random() * 30).toString().padStart(2, '0')}` : null;

      attendance.push({
        id: `ATT-${empId}-${dateStr}`,
        employeeId: empId,
        date: dateStr,
        status: isPresent ? 'Present' : 'Absent',
        checkInTime,
        checkOutTime,
        workingHours: isPresent ? (9 + Math.random()).toFixed(2) : 0,
        notes: isPresent ? '' : 'Not marked'
      });
    });
  }

  return attendance;
};

export const getAttendanceByEmployee = (attendance, employeeId) => {
  return attendance.filter(att => att.employeeId === employeeId);
};

export const getAttendanceByDate = (attendance, date) => {
  return attendance.filter(att => att.date === date);
};
