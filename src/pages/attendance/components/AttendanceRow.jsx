import { TableRow, TableCell } from '../../../components/ui/Table';

/**
 * AttendanceRow Component
 */
export const AttendanceRow = ({ attendance, employee, onMarkAttendance }) => {
  const statusColors = {
    'Present': 'bg-green-100 text-green-800',
    'Absent': 'bg-red-100 text-red-800',
    'Half Day': 'bg-yellow-100 text-yellow-800',
    'Late': 'bg-orange-100 text-orange-800'
  };

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <img src={employee?.avatar} alt="" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-medium">{employee?.firstName} {employee?.lastName}</p>
            <p className="text-xs text-gray-500">{employee?.id}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>{employee?.position}</TableCell>
      <TableCell>
        <span className={`badge ${statusColors[attendance?.status] || 'bg-gray-100 text-gray-800'}`}>
          {attendance?.status || 'Not Marked'}
        </span>
      </TableCell>
      <TableCell>{attendance?.checkInTime || '-'}</TableCell>
      <TableCell>{attendance?.checkOutTime || '-'}</TableCell>
      <TableCell>{attendance?.workingHours || '0'} hrs</TableCell>
      <TableCell>
        {!attendance || attendance.status === 'Absent' ? (
          <select
            onChange={(e) => onMarkAttendance(employee.id, e.target.value)}
            className="input py-1 text-sm"
            defaultValue=""
          >
            <option value="" disabled>Mark As...</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Half Day">Half Day</option>
            <option value="Late">Late</option>
          </select>
        ) : (
          <span className="text-sm text-gray-500">Marked</span>
        )}
      </TableCell>
    </TableRow>
  );
};

export default AttendanceRow;
