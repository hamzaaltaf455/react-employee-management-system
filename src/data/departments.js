// Mock departments data
export const initialDepartments = [
  {
    id: 'DEPT001',
    name: 'Engineering',
    description: 'Software development and technical operations',
    headOfDepartment: 'EMP001',
    employeeCount: 15,
    createdAt: '2023-01-15',
    status: 'Active'
  },
  {
    id: 'DEPT002',
    name: 'Human Resources',
    description: 'Employee relations and recruitment',
    headOfDepartment: 'EMP002',
    employeeCount: 5,
    createdAt: '2023-01-15',
    status: 'Active'
  },
  {
    id: 'DEPT003',
    name: 'Marketing',
    description: 'Brand management and digital marketing',
    headOfDepartment: 'EMP005',
    employeeCount: 8,
    createdAt: '2023-02-01',
    status: 'Active'
  },
  {
    id: 'DEPT004',
    name: 'Sales',
    description: 'Business development and customer relations',
    headOfDepartment: 'EMP008',
    employeeCount: 12,
    createdAt: '2023-02-15',
    status: 'Active'
  },
  {
    id: 'DEPT005',
    name: 'Finance',
    description: 'Financial planning and accounting',
    headOfDepartment: 'EMP012',
    employeeCount: 6,
    createdAt: '2023-03-01',
    status: 'Active'
  }
];

export const getDepartmentById = (id) => {
  return initialDepartments.find(dept => dept.id === id);
};

export const getDepartmentByName = (name) => {
  return initialDepartments.find(dept => dept.name.toLowerCase() === name.toLowerCase());
};
