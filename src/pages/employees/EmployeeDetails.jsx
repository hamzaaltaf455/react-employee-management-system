import { useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { EmployeeContext } from '../../context/EmployeeContext';
import { DepartmentContext } from '../../context/DepartmentContext';
import { AttendanceContext } from '../../context/AttendanceContext';
import { LeaveContext } from '../../context/LeaveContext';
import Button from '../../components/ui/Button';
import { formatDate, formatCurrency } from '../../utils/helpers';

/**
 * EmployeeDetails Component
 * Detailed view of a single employee
 */
export const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEmployeeById } = useContext(EmployeeContext);
  const { getDepartmentById } = useContext(DepartmentContext);
  const { getEmployeeAttendanceStats } = useContext(AttendanceContext);
  const { getLeavesByEmployee, getLeaveStats } = useContext(LeaveContext);

  const employee = getEmployeeById(id);
  const department = employee ? getDepartmentById(employee.department) : null;
  const attendanceStats = employee ? getEmployeeAttendanceStats(id) : null;
  const leaveStats = employee ? getLeaveStats(id) : null;
  const recentLeaves = employee ? getLeavesByEmployee(id).slice(-3) : [];

  if (!employee) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Employee Not Found</h2>
          <p className="text-gray-600 mb-6">The employee you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/employees')}>
            Back to Employees
          </Button>
        </div>
      </div>
    );
  }

  const statusColors = {
    'Active': 'bg-green-100 text-green-800',
    'Inactive': 'bg-gray-100 text-gray-800',
    'On Leave': 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/employees')}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employee Details</h1>
            <p className="text-gray-600 mt-1">Complete information about {employee.firstName}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => navigate(`/employees/edit/${id}`)}
          >
            Edit Employee
          </Button>
        </div>
      </div>

      {/* Employee Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <img
            src={employee.avatar}
            alt={`${employee.firstName} ${employee.lastName}`}
            className="w-32 h-32 rounded-full border-4 border-gray-200"
          />

          {/* Basic Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {employee.firstName} {employee.lastName}
                </h2>
                <p className="text-lg text-gray-600 mt-1">{employee.position}</p>
                <p className="text-sm text-gray-500 mt-1">ID: {employee.id}</p>
              </div>
              <span className={`badge ${statusColors[employee.status]}`}>
                {employee.status}
              </span>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Department</p>
                <p className="text-lg font-semibold text-gray-900">{department?.name}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Role</p>
                <p className="text-lg font-semibold text-gray-900">{employee.role}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Salary</p>
                <p className="text-lg font-semibold text-gray-900">{formatCurrency(employee.salary)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
            Contact Information
          </h3>
          <div className="space-y-3">
            <InfoItem label="Email" value={employee.email} />
            <InfoItem label="Phone" value={employee.phone} />
            <InfoItem label="Joining Date" value={formatDate(employee.joiningDate)} />
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
            Address
          </h3>
          <div className="space-y-3">
            <InfoItem label="Street" value={employee.address.street} />
            <InfoItem label="City" value={employee.address.city} />
            <InfoItem label="State" value={employee.address.state} />
            <InfoItem label="ZIP Code" value={employee.address.zipCode} />
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
            Emergency Contact
          </h3>
          <div className="space-y-3">
            <InfoItem label="Name" value={employee.emergencyContact.name} />
            <InfoItem label="Relationship" value={employee.emergencyContact.relationship} />
            <InfoItem label="Phone" value={employee.emergencyContact.phone} />
          </div>
        </div>
      </div>

      {/* Attendance & Leave Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Attendance Statistics */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
            Attendance Statistics (Last 30 Days)
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Present" value={attendanceStats.present} color="green" />
            <StatCard label="Absent" value={attendanceStats.absent} color="red" />
            <StatCard label="Half Day" value={attendanceStats.halfDay} color="yellow" />
            <StatCard label="Attendance Rate" value={`${attendanceStats.attendanceRate}%`} color="blue" />
          </div>
        </div>

        {/* Leave Statistics */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
            Leave Statistics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Total Leaves" value={leaveStats.total} color="blue" />
            <StatCard label="Pending" value={leaveStats.pending} color="yellow" />
            <StatCard label="Approved" value={leaveStats.approved} color="green" />
            <StatCard label="Total Days" value={leaveStats.totalDays} color="purple" />
          </div>
        </div>
      </div>

      {/* Recent Leaves */}
      {recentLeaves.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4 pb-2 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Leave Applications
            </h3>
            <Link to="/leave" className="text-sm text-primary-600 hover:text-primary-700">
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {recentLeaves.map(leave => (
              <div key={leave.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{leave.leaveType}</p>
                  <p className="text-sm text-gray-600">
                    {formatDate(leave.startDate)} - {formatDate(leave.endDate)} ({leave.days} days)
                  </p>
                </div>
                <span className={`badge ${
                  leave.status === 'Approved' ? 'badge-success' :
                  leave.status === 'Rejected' ? 'badge-danger' :
                  'badge-warning'
                }`}>
                  {leave.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Helper Components
 */
const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
    <p className="text-sm font-medium text-gray-900 mt-1">{value || 'N/A'}</p>
  </div>
);

const StatCard = ({ label, value, color }) => {
  const colors = {
    green: 'bg-green-50 text-green-700',
    red: 'bg-red-50 text-red-700',
    yellow: 'bg-yellow-50 text-yellow-700',
    blue: 'bg-blue-50 text-blue-700',
    purple: 'bg-purple-50 text-purple-700'
  };

  return (
    <div className={`${colors[color]} rounded-lg p-4`}>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
};

export default EmployeeDetails;
