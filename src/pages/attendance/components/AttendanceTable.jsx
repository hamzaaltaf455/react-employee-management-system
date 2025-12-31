import Table, { TableHead, TableBody, TableHeader } from '../../../components/ui/Table';
import AttendanceRow from './AttendanceRow';

/**
 * AttendanceTable Component
 */
export const AttendanceTable = ({ employees, attendanceRecords, onMarkAttendance }) => {
  return (
    <Table>
      <TableHead>
        <tr>
          <TableHeader>Employee</TableHeader>
          <TableHeader>Position</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Check In</TableHeader>
          <TableHeader>Check Out</TableHeader>
          <TableHeader>Working Hours</TableHeader>
          <TableHeader>Action</TableHeader>
        </tr>
      </TableHead>
      <TableBody>
        {employees.map(employee => {
          const attendance = attendanceRecords.find(a => a.employeeId === employee.id);
          return (
            <AttendanceRow
              key={employee.id}
              employee={employee}
              attendance={attendance}
              onMarkAttendance={onMarkAttendance}
            />
          );
        })}
      </TableBody>
    </Table>
  );
};

export default AttendanceTable;
