import { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { debounce } from '../../../utils/helpers';

/**
 * EmployeeFilters Component
 * Advanced filtering for employee list
 */
export const EmployeeFilters = ({ 
  onSearch, 
  onFilterChange,
  departments,
  selectedDepartment,
  selectedStatus,
  selectedRole
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Debounced search
  const debouncedSearch = debounce((value) => {
    onSearch(value);
  }, 300);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    onSearch('');
    onFilterChange({ department: '', status: '', role: '' });
  };

  const hasActiveFilters = selectedDepartment || selectedStatus || selectedRole || searchTerm;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      {/* Search */}
      <div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by name, email, or position..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="input pl-10"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Department Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <select
            value={selectedDepartment}
            onChange={(e) => onFilterChange({ department: e.target.value })}
            className="input"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>{dept.name}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onFilterChange({ status: e.target.value })}
            className="input"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>

        {/* Role Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            value={selectedRole}
            onChange={(e) => onFilterChange({ role: e.target.value })}
            className="input"
          >
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button variant="ghost" size="small" onClick={handleClearFilters}>
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmployeeFilters;
