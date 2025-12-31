import { Link } from 'react-router-dom';
import { formatDate, formatCurrency } from '../../../utils/helpers';
import { TableRow, TableCell } from '../../../components/ui/Table';

/**
 * EmployeeRow Component
 * Single row in employee table
 */
export const EmployeeRow = ({ employee, department, onEdit, onDelete }) => {
  const statusColors = {
    'Active': 'bg-green-100 text-green-800',
    'Inactive': 'bg-gray-100 text-gray-800',
    'On Leave': 'bg-yellow-100 text-yellow-800'
  };

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <img 
            src={employee.avatar} 
            alt={employee.firstName}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <Link 
              to={`/employees/${employee.id}`}
              className="font-medium text-primary-600 hover:text-primary-800"
            >
              {employee.firstName} {employee.lastName}
            </Link>
            <p className="text-xs text-gray-500">{employee.id}</p>
          </div>
        </div>
      </TableCell>
      
      <TableCell>
        <div>
          <p className="text-sm">{employee.email}</p>
          <p className="text-xs text-gray-500">{employee.phone}</p>
        </div>
      </TableCell>

      <TableCell>
        <p className="text-sm">{employee.position}</p>
      </TableCell>

      <TableCell>
        <p className="text-sm">{department?.name || 'N/A'}</p>
      </TableCell>

      <TableCell>
        <span className={`badge ${statusColors[employee.status] || 'bg-gray-100 text-gray-800'}`}>
          {employee.status}
        </span>
      </TableCell>

      <TableCell>
        <p className="text-sm">{formatDate(employee.joiningDate)}</p>
      </TableCell>

      <TableCell>
        <p className="text-sm font-medium">{formatCurrency(employee.salary)}</p>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <Link
            to={`/employees/${employee.id}`}
            className="text-blue-600 hover:text-blue-800"
            title="View Details"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Link>
          <button
            onClick={() => onEdit(employee)}
            className="text-green-600 hover:text-green-800"
            title="Edit"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(employee)}
            className="text-red-600 hover:text-red-800"
            title="Delete"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EmployeeRow;
