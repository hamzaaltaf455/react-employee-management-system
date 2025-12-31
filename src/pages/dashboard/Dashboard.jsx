import { useContext } from 'react';
import { EmployeeContext } from '../../context/EmployeeContext';
import { LeaveContext } from '../../context/LeaveContext';
import { DepartmentContext } from '../../context/DepartmentContext';
import StatsCard from './components/StatsCard';
import DashboardCharts from './components/DashboardCharts';
import ActivityFeed from './components/ActivityFeed';
import { LEAVE_STATUS } from '../../utils/constants';

/**
 * Dashboard Page Component
 * Main dashboard with statistics, charts, and activity feed
 */
export const Dashboard = () => {
  const { getEmployeeStats } = useContext(EmployeeContext);
  const { getPendingLeaves } = useContext(LeaveContext);
  const { departments } = useContext(DepartmentContext);

  const employeeStats = getEmployeeStats();
  const pendingLeaves = getPendingLeaves();

  const stats = [
    {
      title: 'Total Employees',
      value: employeeStats.total,
      icon: '👥',
      color: 'primary',
      trend: 5.2
    },
    {
      title: 'Active Employees',
      value: employeeStats.active,
      icon: '✓',
      color: 'success',
      trend: 2.1
    },
    {
      title: 'On Leave',
      value: employeeStats.onLeave,
      icon: '🏖️',
      color: 'warning'
    },
    {
      title: 'Departments',
      value: departments.length,
      icon: '🏢',
      color: 'info'
    },
    {
      title: 'Pending Leaves',
      value: pendingLeaves.length,
      icon: '⏳',
      color: 'danger'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your employee management system</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <DashboardCharts />

      {/* Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <QuickActionButton 
              icon="➕" 
              label="Add Employee" 
              to="/employees/new"
            />
            <QuickActionButton 
              icon="📅" 
              label="Mark Attendance" 
              to="/attendance"
            />
            <QuickActionButton 
              icon="🏖️" 
              label="Apply Leave" 
              to="/leave/new"
            />
            <QuickActionButton 
              icon="🏢" 
              label="Manage Departments" 
              to="/departments"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * QuickActionButton Component
 */
const QuickActionButton = ({ icon, label, to }) => {
  return (
    <a
      href={to}
      className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all group"
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-medium text-gray-700 group-hover:text-primary-700">
        {label}
      </span>
      <svg 
        className="w-5 h-5 ml-auto text-gray-400 group-hover:text-primary-600 transition-colors" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 5l7 7-7 7" 
        />
      </svg>
    </a>
  );
};

export default Dashboard;
