import { useState, useContext } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { EmployeeContext } from '../../context/EmployeeContext';
import { LeaveContext } from '../../context/LeaveContext';
import LeaveTable from './components/LeaveTable';
import LeaveActions from './components/LeaveActions';
import Button from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';
import { ROLES } from '../../utils/constants';

/**
 * LeaveList Component
 * Leave management page
 */
export const LeaveList = () => {
  const { user } = useAuth();
  const { employees } = useContext(EmployeeContext);
  const { leaves, applyLeave, approveLeave, rejectLeave } = useContext(LeaveContext);
  const toast = useToast();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const isAdminOrManager = user?.role === ROLES.ADMIN || user?.role === ROLES.MANAGER;

  // Filter leaves based on role and filter selection
  const filteredLeaves = leaves.filter(leave => {
    // For employees, show only their leaves
    if (user?.role === ROLES.EMPLOYEE && leave.employeeId !== user.employeeId) {
      return false;
    }

    // Apply status filter
    if (filter !== 'all' && leave.status !== filter) {
      return false;
    }

    return true;
  });

  const handleApplyLeave = (data) => {
    applyLeave({ ...data, employeeId: user.employeeId });
    toast.success('Leave application submitted successfully');
  };

  const handleApprove = (leaveId) => {
    approveLeave(leaveId, user.employeeId);
    toast.success('Leave approved');
  };

  const handleReject = (leaveId) => {
    rejectLeave(leaveId, user.employeeId);
    toast.error('Leave rejected');
  };

  const stats = {
    total: filteredLeaves.length,
    pending: filteredLeaves.filter(l => l.status === 'Pending').length,
    approved: filteredLeaves.filter(l => l.status === 'Approved').length,
    rejected: filteredLeaves.filter(l => l.status === 'Rejected').length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isAdminOrManager ? 'Leave Management' : 'My Leaves'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isAdminOrManager ? 'Manage employee leave requests' : 'View and apply for leaves'}
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Apply for Leave
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600">Total Applications</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600">Approved</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.approved}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600">Rejected</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{stats.rejected}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Filter by Status:</span>
          <div className="flex gap-2">
            {['all', 'Pending', 'Approved', 'Rejected'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Leave Table */}
      {filteredLeaves.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4">🏖️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No leave applications</h3>
          <p className="text-gray-600">No leave applications found for the selected filter</p>
        </div>
      ) : (
        <LeaveTable
          leaves={filteredLeaves}
          employees={employees}
          onApprove={handleApprove}
          onReject={handleReject}
          showActions={isAdminOrManager}
        />
      )}

      {/* Leave Application Form */}
      <LeaveActions
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleApplyLeave}
      />
    </div>
  );
};

export default LeaveList;
