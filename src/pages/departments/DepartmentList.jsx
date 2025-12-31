import { useState, useContext } from 'react';
import { DepartmentContext } from '../../context/DepartmentContext';
import { EmployeeContext } from '../../context/EmployeeContext';
import DepartmentCard from './components/DepartmentCard';
import DepartmentForm from './components/DepartmentForm';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';

/**
 * DepartmentList Component
 * Department management page
 */
export const DepartmentList = () => {
  const { departments, addDepartment, updateDepartment, deleteDepartment } = useContext(DepartmentContext);
  const { employees } = useContext(EmployeeContext);
  const toast = useToast();

  const [formModal, setFormModal] = useState({ isOpen: false, department: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, department: null });

  const handleAdd = () => {
    setFormModal({ isOpen: true, department: null });
  };

  const handleEdit = (department) => {
    setFormModal({ isOpen: true, department });
  };

  const handleFormSubmit = (data) => {
    if (formModal.department) {
      updateDepartment(formModal.department.id, data);
      toast.success('Department updated successfully');
    } else {
      addDepartment(data);
      toast.success('Department added successfully');
    }
    setFormModal({ isOpen: false, department: null });
  };

  const handleDeleteClick = (department) => {
    setDeleteModal({ isOpen: true, department });
  };

  const handleDeleteConfirm = () => {
    if (deleteModal.department) {
      deleteDepartment(deleteModal.department.id);
      toast.success('Department deleted successfully');
      setDeleteModal({ isOpen: false, department: null });
    }
  };

  const getEmployeeCount = (deptId) => {
    return employees.filter(emp => emp.department === deptId).length;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Department Management</h1>
          <p className="text-gray-600 mt-1">Manage organization departments</p>
        </div>
        <Button onClick={handleAdd}>
          <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Department
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600">Total Departments</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{departments.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600">Active Departments</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {departments.filter(d => d.status === 'Active').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600">Total Employees</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{employees.length}</p>
        </div>
      </div>

      {/* Department Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map(dept => (
          <DepartmentCard
            key={dept.id}
            department={dept}
            employeeCount={getEmployeeCount(dept.id)}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      {/* Form Modal */}
      <DepartmentForm
        isOpen={formModal.isOpen}
        onClose={() => setFormModal({ isOpen: false, department: null })}
        onSubmit={handleFormSubmit}
        department={formModal.department}
      />

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, department: null })}
        title="Delete Department"
        size="small"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete{' '}
            <span className="font-semibold">{deleteModal.department?.name}</span>?
          </p>
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setDeleteModal({ isOpen: false, department: null })}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DepartmentList;
