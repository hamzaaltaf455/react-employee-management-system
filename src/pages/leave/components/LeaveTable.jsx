import Table, { TableHead, TableBody, TableHeader, TableRow, TableCell } from '../../../components/ui/Table';
import { formatDate } from '../../../utils/helpers';

/**
 * LeaveTable Component
 */
export const LeaveTable = ({ leaves, employees, onApprove, onReject, showActions = false }) => {
  const statusColors = {
    'Pending': 'badge-warning',
    'Approved': 'badge-success',
    'Rejected': 'badge-danger'
  };

  return (
    <Table>
      <TableHead>
        <tr>
          <TableHeader>Employee</TableHeader>
          <TableHeader>Leave Type</TableHeader>
          <TableHeader>Start Date</TableHeader>
          <TableHeader>End Date</TableHeader>
          <TableHeader>Days</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Applied On</TableHeader>
          {showActions && <TableHeader>Actions</TableHeader>}
        </tr>
      </TableHead>
      <TableBody>
        {leaves.map(leave => {
          const employee = employees.find(e => e.id === leave.employeeId);
          return (
            <TableRow key={leave.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <img src={employee?.avatar} alt="" className="w-8 h-8 rounded-full" />
                  <span className="font-medium">{employee?.firstName} {employee?.lastName}</span>
                </div>
              </TableCell>
              <TableCell>{leave.leaveType}</TableCell>
              <TableCell>{formatDate(leave.startDate)}</TableCell>
              <TableCell>{formatDate(leave.endDate)}</TableCell>
              <TableCell>{leave.days}</TableCell>
              <TableCell>
                <span className={`badge ${statusColors[leave.status]}`}>
                  {leave.status}
                </span>
              </TableCell>
              <TableCell>{formatDate(leave.appliedOn)}</TableCell>
              {showActions && (
                <TableCell>
                  {leave.status === 'Pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onApprove(leave.id)}
                        className="text-green-600 hover:text-green-800 text-sm font-medium"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onReject(leave.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default LeaveTable;
