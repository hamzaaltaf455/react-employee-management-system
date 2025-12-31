// Mock users for authentication
// Passwords are stored as plain text for demo purposes only
export const mockUsers = [
  {
    id: 1,
    email: 'admin@ems.com',
    password: 'admin123',
    role: 'Admin',
    name: 'John Admin',
    employeeId: 'EMP001',
    avatar: 'https://ui-avatars.com/api/?name=John+Admin&background=3b82f6&color=fff'
  },
  {
    id: 2,
    email: 'manager@ems.com',
    password: 'manager123',
    role: 'Manager',
    name: 'Sarah Manager',
    employeeId: 'EMP002',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Manager&background=10b981&color=fff'
  },
  {
    id: 3,
    email: 'employee@ems.com',
    password: 'employee123',
    role: 'Employee',
    name: 'Mike Employee',
    employeeId: 'EMP003',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Employee&background=f59e0b&color=fff'
  }
];

export const getUserByCredentials = (email, password) => {
  return mockUsers.find(user => user.email === email && user.password === password);
};

export const getUserById = (id) => {
  return mockUsers.find(user => user.id === id);
};
