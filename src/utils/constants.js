// Application-wide constants

// Roles
export const ROLES = {
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  EMPLOYEE: 'Employee'
};

// Employee Status
export const EMPLOYEE_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  ON_LEAVE: 'On Leave'
};

// Attendance Status
export const ATTENDANCE_STATUS = {
  PRESENT: 'Present',
  ABSENT: 'Absent',
  HALF_DAY: 'Half Day',
  LATE: 'Late'
};

// Leave Status
export const LEAVE_STATUS = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected'
};

// Leave Types
export const LEAVE_TYPES = {
  SICK: 'Sick Leave',
  CASUAL: 'Casual Leave',
  ANNUAL: 'Annual Leave',
  MATERNITY: 'Maternity Leave',
  PATERNITY: 'Paternity Leave',
  UNPAID: 'Unpaid Leave'
};

// Department Status
export const DEPARTMENT_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive'
};

// localStorage Keys
export const STORAGE_KEYS = {
  AUTH_USER: 'ems_auth_user',
  EMPLOYEES: 'ems_employees',
  DEPARTMENTS: 'ems_departments',
  ATTENDANCE: 'ems_attendance',
  LEAVES: 'ems_leaves'
};

// Navigation menu items based on role
export const MENU_ITEMS = {
  [ROLES.ADMIN]: [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/employees', label: 'Employees', icon: '👥' },
    { path: '/departments', label: 'Departments', icon: '🏢' },
    { path: '/attendance', label: 'Attendance', icon: '📅' },
    { path: '/leave', label: 'Leave Management', icon: '🏖️' },
    { path: '/profile', label: 'Profile', icon: '👤' }
  ],
  [ROLES.MANAGER]: [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/employees', label: 'Employees', icon: '👥' },
    { path: '/attendance', label: 'Attendance', icon: '📅' },
    { path: '/leave', label: 'Leave Management', icon: '🏖️' },
    { path: '/profile', label: 'Profile', icon: '👤' }
  ],
  [ROLES.EMPLOYEE]: [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/attendance', label: 'My Attendance', icon: '📅' },
    { path: '/leave', label: 'My Leaves', icon: '🏖️' },
    { path: '/profile', label: 'Profile', icon: '👤' }
  ]
};

// Positions
export const POSITIONS = [
  'Chief Technology Officer',
  'Chief Executive Officer',
  'HR Manager',
  'Finance Manager',
  'Marketing Director',
  'Sales Director',
  'Senior Software Engineer',
  'Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'DevOps Engineer',
  'UI/UX Designer',
  'Product Manager',
  'Sales Executive',
  'Marketing Specialist',
  'Content Writer',
  'HR Specialist',
  'Accountant',
  'Business Analyst'
];

// Chart Colors
export const CHART_COLORS = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#14b8a6', // teal
  '#f97316', // orange
];
