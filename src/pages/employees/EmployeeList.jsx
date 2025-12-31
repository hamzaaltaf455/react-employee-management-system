import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmployeeContext } from '../../context/EmployeeContext';
import { DepartmentContext } from '../../context/DepartmentContext';
import EmployeeTable from './components/EmployeeTable';
import EmployeeFilters from './components/EmployeeFilters';
import EmployeeActions from './components/EmployeeActions';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';

/**
 * EmployeeList Component
 * Main employee management page with list, filters, and CRUD operations
 */
export const EmployeeList = () => {
  const navigate = useNavigate();
  const { employees, deleteEmployee } = useContext(EmployeeContext);
  const { departments } = useContext(DepartmentContext);
  const toast = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    status: '',
    role: ''
  });
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    employee: null
  });

  // Filter employees
  const filteredEmployees = employees.filter(emp => {
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchesSearch = 
        emp.firstName.toLowerCase().includes(term) ||
        emp.lastName.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term) ||
        emp.id.toLowerCase().includes(term) ||
        emp.position.toLowerCase().includes(term);
      
      if (!matchesSearch) return false;
    }

    // Department filter
    if (filters.department && emp.department !== filters.department) {
      return false;
    }

    // Status filter
    if (filters.status && emp.status !== filters.status) {
      return false;
    }

    // Role filter
    if (filters.role && emp.role !== filters.role) {
      return false;
    }

    return true;
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleAddEmployee = () => {
    navigate('/employees/new');
  };

  const handleEditEmployee = (employee) => {
    navigate(`/employees/edit/${employee.id}`);
  };

  const handleDeleteClick = (employee) => {
    setDeleteModal({ isOpen: true, employee });
  };

  const handleDeleteConfirm = () => {
    if (deleteModal.employee) {
      deleteEmployee(deleteModal.employee.id);
      toast.success('Employee deleted successfully');
      setDeleteModal({ isOpen: false, employee: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, employee: null });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
        <p className="text-gray-600 mt-1">Manage your organization's employees</p>
      </div>

      {/* Filters */}
      <EmployeeFilters
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        departments={departments}
        selectedDepartment={filters.department}
        selectedStatus={filters.status}
        selectedRole={filters.role}
      />

      {/* Actions */}
      <EmployeeActions
        onAdd={handleAddEmployee}
        totalCount={filteredEmployees.length}
      />

      {/* Employee Table */}
      <EmployeeTable
        employees={filteredEmployees}
        departments={departments}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteClick}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        title="Delete Employee"
        size="small"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete{' '}
            <span className="font-semibold">
              {deleteModal.employee?.firstName} {deleteModal.employee?.lastName}
            </span>
            ? This action cannot be undone.
          </p>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleDeleteCancel}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
            >
              Delete Employee
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EmployeeList;
