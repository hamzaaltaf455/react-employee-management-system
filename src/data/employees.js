// Mock employees data
export const initialEmployees = [
  {
    id: 'EMP001',
    firstName: 'John',
    lastName: 'Admin',
    email: 'admin@ems.com',
    phone: '+1-555-0101',
    department: 'DEPT001',
    position: 'Chief Technology Officer',
    role: 'Admin',
    joiningDate: '2023-01-15',
    salary: 150000,
    status: 'Active',
    address: {
      street: '123 Tech Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Jane Admin',
      relationship: 'Spouse',
      phone: '+1-555-0102'
    },
    avatar: 'https://ui-avatars.com/api/?name=John+Admin&background=3b82f6&color=fff'
  },
  {
    id: 'EMP002',
    firstName: 'Sarah',
    lastName: 'Manager',
    email: 'manager@ems.com',
    phone: '+1-555-0201',
    department: 'DEPT002',
    position: 'HR Manager',
    role: 'Manager',
    joiningDate: '2023-01-20',
    salary: 95000,
    status: 'Active',
    address: {
      street: '456 Business Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94106',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Tom Manager',
      relationship: 'Spouse',
      phone: '+1-555-0202'
    },
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Manager&background=10b981&color=fff'
  },
  {
    id: 'EMP003',
    firstName: 'Mike',
    lastName: 'Employee',
    email: 'employee@ems.com',
    phone: '+1-555-0301',
    department: 'DEPT001',
    position: 'Senior Software Engineer',
    role: 'Employee',
    joiningDate: '2023-02-01',
    salary: 120000,
    status: 'Active',
    address: {
      street: '789 Developer Lane',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Lisa Employee',
      relationship: 'Sister',
      phone: '+1-555-0302'
    },
    avatar: 'https://ui-avatars.com/api/?name=Mike+Employee&background=f59e0b&color=fff'
  },
  {
    id: 'EMP004',
    firstName: 'Emily',
    lastName: 'Johnson',
    email: 'emily.johnson@ems.com',
    phone: '+1-555-0401',
    department: 'DEPT001',
    position: 'Software Engineer',
    role: 'Employee',
    joiningDate: '2023-03-15',
    salary: 105000,
    status: 'Active',
    address: {
      street: '321 Code Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94108',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Robert Johnson',
      relationship: 'Father',
      phone: '+1-555-0402'
    },
    avatar: 'https://ui-avatars.com/api/?name=Emily+Johnson&background=8b5cf6&color=fff'
  },
  {
    id: 'EMP005',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@ems.com',
    phone: '+1-555-0501',
    department: 'DEPT003',
    position: 'Marketing Director',
    role: 'Manager',
    joiningDate: '2023-02-10',
    salary: 110000,
    status: 'Active',
    address: {
      street: '654 Brand Boulevard',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94109',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Maria Wilson',
      relationship: 'Spouse',
      phone: '+1-555-0502'
    },
    avatar: 'https://ui-avatars.com/api/?name=David+Wilson&background=ec4899&color=fff'
  },
  {
    id: 'EMP006',
    firstName: 'Jessica',
    lastName: 'Brown',
    email: 'jessica.brown@ems.com',
    phone: '+1-555-0601',
    department: 'DEPT003',
    position: 'Content Marketing Specialist',
    role: 'Employee',
    joiningDate: '2023-04-01',
    salary: 75000,
    status: 'Active',
    address: {
      street: '987 Creative Way',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94110',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Michael Brown',
      relationship: 'Brother',
      phone: '+1-555-0602'
    },
    avatar: 'https://ui-avatars.com/api/?name=Jessica+Brown&background=14b8a6&color=fff'
  },
  {
    id: 'EMP007',
    firstName: 'Robert',
    lastName: 'Taylor',
    email: 'robert.taylor@ems.com',
    phone: '+1-555-0701',
    department: 'DEPT001',
    position: 'DevOps Engineer',
    role: 'Employee',
    joiningDate: '2023-03-20',
    salary: 115000,
    status: 'Active',
    address: {
      street: '147 Cloud Drive',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94111',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Susan Taylor',
      relationship: 'Mother',
      phone: '+1-555-0702'
    },
    avatar: 'https://ui-avatars.com/api/?name=Robert+Taylor&background=f97316&color=fff'
  },
  {
    id: 'EMP008',
    firstName: 'Amanda',
    lastName: 'Martinez',
    email: 'amanda.martinez@ems.com',
    phone: '+1-555-0801',
    department: 'DEPT004',
    position: 'Sales Director',
    role: 'Manager',
    joiningDate: '2023-02-25',
    salary: 125000,
    status: 'Active',
    address: {
      street: '258 Sales Plaza',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94112',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Carlos Martinez',
      relationship: 'Spouse',
      phone: '+1-555-0802'
    },
    avatar: 'https://ui-avatars.com/api/?name=Amanda+Martinez&background=ef4444&color=fff'
  },
  {
    id: 'EMP009',
    firstName: 'James',
    lastName: 'Anderson',
    email: 'james.anderson@ems.com',
    phone: '+1-555-0901',
    department: 'DEPT004',
    position: 'Sales Executive',
    role: 'Employee',
    joiningDate: '2023-05-10',
    salary: 85000,
    status: 'Active',
    address: {
      street: '369 Deal Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94113',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Linda Anderson',
      relationship: 'Wife',
      phone: '+1-555-0902'
    },
    avatar: 'https://ui-avatars.com/api/?name=James+Anderson&background=6366f1&color=fff'
  },
  {
    id: 'EMP010',
    firstName: 'Lisa',
    lastName: 'Garcia',
    email: 'lisa.garcia@ems.com',
    phone: '+1-555-1001',
    department: 'DEPT002',
    position: 'HR Specialist',
    role: 'Employee',
    joiningDate: '2023-04-15',
    salary: 70000,
    status: 'Active',
    address: {
      street: '741 People Avenue',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94114',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Juan Garcia',
      relationship: 'Father',
      phone: '+1-555-1002'
    },
    avatar: 'https://ui-avatars.com/api/?name=Lisa+Garcia&background=84cc16&color=fff'
  },
  {
    id: 'EMP011',
    firstName: 'Christopher',
    lastName: 'Lee',
    email: 'christopher.lee@ems.com',
    phone: '+1-555-1101',
    department: 'DEPT001',
    position: 'Frontend Developer',
    role: 'Employee',
    joiningDate: '2023-06-01',
    salary: 98000,
    status: 'Active',
    address: {
      street: '852 React Road',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94115',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Michelle Lee',
      relationship: 'Sister',
      phone: '+1-555-1102'
    },
    avatar: 'https://ui-avatars.com/api/?name=Christopher+Lee&background=06b6d4&color=fff'
  },
  {
    id: 'EMP012',
    firstName: 'Patricia',
    lastName: 'White',
    email: 'patricia.white@ems.com',
    phone: '+1-555-1201',
    department: 'DEPT005',
    position: 'Finance Manager',
    role: 'Manager',
    joiningDate: '2023-03-05',
    salary: 105000,
    status: 'Active',
    address: {
      street: '963 Money Lane',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94116',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Richard White',
      relationship: 'Husband',
      phone: '+1-555-1202'
    },
    avatar: 'https://ui-avatars.com/api/?name=Patricia+White&background=a855f7&color=fff'
  },
  {
    id: 'EMP013',
    firstName: 'Daniel',
    lastName: 'Harris',
    email: 'daniel.harris@ems.com',
    phone: '+1-555-1301',
    department: 'DEPT005',
    position: 'Accountant',
    role: 'Employee',
    joiningDate: '2023-07-01',
    salary: 72000,
    status: 'Active',
    address: {
      street: '159 Numbers Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94117',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Karen Harris',
      relationship: 'Mother',
      phone: '+1-555-1302'
    },
    avatar: 'https://ui-avatars.com/api/?name=Daniel+Harris&background=f43f5e&color=fff'
  },
  {
    id: 'EMP014',
    firstName: 'Jennifer',
    lastName: 'Clark',
    email: 'jennifer.clark@ems.com',
    phone: '+1-555-1401',
    department: 'DEPT003',
    position: 'Social Media Manager',
    role: 'Employee',
    joiningDate: '2023-05-20',
    salary: 78000,
    status: 'Active',
    address: {
      street: '357 Hashtag Highway',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94118',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Steven Clark',
      relationship: 'Brother',
      phone: '+1-555-1402'
    },
    avatar: 'https://ui-avatars.com/api/?name=Jennifer+Clark&background=0ea5e9&color=fff'
  },
  {
    id: 'EMP015',
    firstName: 'Matthew',
    lastName: 'Lewis',
    email: 'matthew.lewis@ems.com',
    phone: '+1-555-1501',
    department: 'DEPT001',
    position: 'Backend Developer',
    role: 'Employee',
    joiningDate: '2023-08-01',
    salary: 102000,
    status: 'Active',
    address: {
      street: '753 API Avenue',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94119',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Nancy Lewis',
      relationship: 'Wife',
      phone: '+1-555-1502'
    },
    avatar: 'https://ui-avatars.com/api/?name=Matthew+Lewis&background=22c55e&color=fff'
  }
];

export const getEmployeeById = (id) => {
  return initialEmployees.find(emp => emp.id === id);
};

export const getEmployeesByDepartment = (departmentId) => {
  return initialEmployees.filter(emp => emp.department === departmentId);
};
