import { useContext } from 'react';
import { LeaveContext } from '../../../context/LeaveContext';
import { EmployeeContext } from '../../../context/EmployeeContext';
import { formatDate } from '../../../utils/helpers';

/**
 * ActivityFeed Component
 * Displays recent activity in the system
 */
export const ActivityFeed = () => {
  const { leaves } = useContext(LeaveContext);
  const { employees } = useContext(EmployeeContext);

  // Generate activity items from various sources
  const activities = [];

  // Recent leave applications
  leaves.slice(-5).reverse().forEach(leave => {
    const employee = employees.find(emp => emp.id === leave.employeeId);
    activities.push({
      id: `leave-${leave.id}`,
      type: 'leave',
      icon: '🏖️',
      color: 'bg-blue-100 text-blue-600',
      title: `${employee?.firstName} ${employee?.lastName} applied for leave`,
      description: `${leave.leaveType} from ${formatDate(leave.startDate)} to ${formatDate(leave.endDate)}`,
      time: leave.appliedOn,
      status: leave.status
    });
  });

  // Recent employee joinings
  employees
    .slice()
    .sort((a, b) => new Date(b.joiningDate) - new Date(a.joiningDate))
    .slice(0, 3)
    .forEach(emp => {
      activities.push({
        id: `join-${emp.id}`,
        type: 'joining',
        icon: '👋',
        color: 'bg-green-100 text-green-600',
        title: `${emp.firstName} ${emp.lastName} joined the team`,
        description: `${emp.position} in ${emp.department}`,
        time: emp.joiningDate,
        status: 'Active'
      });
    });

  // Sort by date
  activities.sort((a, b) => new Date(b.time) - new Date(a.time));

  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Approved: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-100 text-red-800',
    Active: 'bg-blue-100 text-blue-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Activity
      </h3>
      
      {activities.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No recent activity</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.slice(0, 8).map((activity) => (
            <div 
              key={activity.id}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-full ${activity.color} flex items-center justify-center text-xl flex-shrink-0`}>
                {activity.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {activity.description}
                    </p>
                  </div>
                  {activity.status && (
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${statusColors[activity.status]}`}>
                      {activity.status}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {formatDate(activity.time)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activities.length > 8 && (
        <div className="mt-4 text-center">
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View All Activity →
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
