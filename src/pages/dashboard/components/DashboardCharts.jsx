import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useContext } from 'react';
import { EmployeeContext } from '../../../context/EmployeeContext';
import { DepartmentContext } from '../../../context/DepartmentContext';
import { CHART_COLORS } from '../../../utils/constants';
import { groupBy } from '../../../utils/helpers';

/**
 * DashboardCharts Component
 * Displays various charts for dashboard analytics
 */
export const DashboardCharts = () => {
  const { employees } = useContext(EmployeeContext);
  const { departments } = useContext(DepartmentContext);

  // Employees by department
  const employeesByDept = Object.entries(groupBy(employees, 'department')).map(([deptId, emps]) => {
    const dept = departments.find(d => d.id === deptId);
    return {
      name: dept?.name || 'Unknown',
      value: emps.length
    };
  });

  // Monthly joinings (last 6 months)
  const monthlyJoinings = (() => {
    const months = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      const monthYear = date.toISOString().slice(0, 7);
      
      const count = employees.filter(emp => 
        emp.joiningDate.startsWith(monthYear)
      ).length;
      
      months.push({
        month: monthName,
        joinings: count
      });
    }
    
    return months;
  })();

  // Salary distribution by role
  const salaryByRole = Object.entries(groupBy(employees, 'role')).map(([role, emps]) => ({
    role,
    avgSalary: Math.round(emps.reduce((sum, emp) => sum + emp.salary, 0) / emps.length)
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Employees by Department - Pie Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Employees by Department
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={employeesByDept}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {employeesByDept.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Joinings - Line Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Monthly Joinings Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyJoinings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="joinings" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Average Salary by Role - Bar Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Average Salary by Role
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salaryByRole}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="role" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="avgSalary" fill="#10b981" name="Average Salary" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;
