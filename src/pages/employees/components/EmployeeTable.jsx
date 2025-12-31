import { useState } from 'react';
import Table, { TableHead, TableBody, TableHeader } from '../../../components/ui/Table';
import EmployeeRow from './EmployeeRow';
import { sortByField } from '../../../utils/helpers';

/**
 * EmployeeTable Component
 * Sortable table displaying employee list
 */
export const EmployeeTable = ({ employees, departments, onEdit, onDelete }) => {
  const [sortConfig, setSortConfig] = useState({ field: 'firstName', order: 'asc' });

  const handleSort = (field) => {
    setSortConfig(prev => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedEmployees = sortByField(employees, sortConfig.field, sortConfig.order);

  if (employees.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <div className="text-6xl mb-4">👥</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
        <p className="text-gray-600">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHead>
        <tr>
          <TableHeader sortable onSort={() => handleSort('firstName')}>
            Employee
          </TableHeader>
          <TableHeader>Contact</TableHeader>
          <TableHeader sortable onSort={() => handleSort('position')}>
            Position
          </TableHeader>
          <TableHeader sortable onSort={() => handleSort('department')}>
            Department
          </TableHeader>
          <TableHeader sortable onSort={() => handleSort('status')}>
            Status
          </TableHeader>
          <TableHeader sortable onSort={() => handleSort('joiningDate')}>
            Joining Date
          </TableHeader>
          <TableHeader sortable onSort={() => handleSort('salary')}>
            Salary
          </TableHeader>
          <TableHeader>Actions</TableHeader>
        </tr>
      </TableHead>
      <TableBody>
        {sortedEmployees.map(employee => (
          <EmployeeRow
            key={employee.id}
            employee={employee}
            department={departments.find(d => d.id === employee.department)}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeeTable;
