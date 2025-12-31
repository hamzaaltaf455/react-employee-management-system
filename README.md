# Employee Management System (EMS)

A comprehensive, frontend-only **Employee Management System** built with **React 18+**, **Vite**, **Tailwind CSS**, and **Recharts**. This application demonstrates a complete, production-ready solution for managing employees, departments, attendance, and leave applications—all without a backend, using localStorage for data persistence.

---

## 🚀 Features

### Authentication & Authorization

- **Role-Based Access Control (RBAC)** with three user roles:
  - **Admin**: Full system access
  - **Manager**: Department-level management
  - **Employee**: Personal profile and leave management
- **Fake Login System** with demo credentials
- **Protected Routes** based on user roles
- **Session Management** with localStorage

### Dashboard

- **Real-time Statistics**: Total employees, departments, attendance rate
- **Data Visualization** with Recharts:
  - Department Distribution (Pie Chart)
  - Attendance Trends (Line Chart)
  - Leave Statistics (Bar Chart)
- **Recent Activity Feed**: Latest employee joinings and leave applications

### Employee Management (CRUD)

- **Comprehensive Employee Records**:
  - Personal Information (name, email, phone, gender, date of birth)
  - Employment Details (employee ID, department, position, date of joining, salary)
  - Address Information (street, city, state, postal code, country)
- **Advanced Features**:
  - Search by name, email, or employee ID
  - Filter by department, position, and status
  - Sort by any column (ascending/descending)
  - Detailed employee view with attendance and leave statistics
- **Full CRUD Operations**: Add, edit, view, and delete employees
- **Form Validation** with error messages

### Department Management

- **Department CRUD**: Create, update, and delete departments
- **Department Cards** with employee count and manager information
- **Grid Layout** with responsive design
- **Modal-based Forms** for add/edit operations

### Attendance Management

- **Daily Attendance Tracking**:
  - Mark attendance with status (Present, Absent, Half Day, Late)
  - Date-based filtering
  - Employee search functionality
- **Attendance Statistics**:
  - Total attendance records
  - Present/absent counts
  - Attendance rate percentage
- **Auto-generated Mock Data** for 30 days

### Leave Management

- **Leave Applications**:
  - Apply for leave with type, dates, and reason
  - Leave types: Casual, Sick, Annual, Unpaid
  - Auto-calculated leave days
- **Approval Workflow**:
  - Pending, Approved, Rejected statuses
  - Admin/Manager approval actions
  - Status filtering for quick access
- **Leave Statistics**:
  - Total, pending, approved, and rejected leave counts
  - Leave type breakdown

### User Profile

- **Profile Management**:
  - Edit personal information
  - Update contact details
- **Password Management**:
  - Change password with validation
  - Current password verification

---

## 🛠️ Technology Stack

| Technology          | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| **React 18+**       | UI library with functional components and hooks |
| **Vite**            | Fast build tool and dev server                  |
| **React Router v6** | Client-side routing with nested routes          |
| **Context API**     | Global state management (5 contexts)            |
| **Tailwind CSS**    | Utility-first CSS framework                     |
| **Recharts**        | Data visualization library                      |
| **localStorage**    | Data persistence (no backend)                   |

---

## 📁 Folder Structure

```
employee-management-system/
├── public/
├── src/
│   ├── app/
│   │   ├── App.jsx                    # Main app component with all providers
│   │   └── routes.jsx                 # Application routing configuration
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx             # Top navigation bar
│   │   │   ├── Sidebar.jsx            # Sidebar navigation with role-based menus
│   │   │   └── ProtectedRoute.jsx     # Route authentication guard
│   │   └── ui/
│   │       ├── Button.jsx             # Reusable button component (5 variants)
│   │       ├── Input.jsx              # Input component with validation
│   │       ├── Loader.jsx             # Loading spinner
│   │       ├── Modal.jsx              # Modal dialog component
│   │       ├── Table.jsx              # Table compound components
│   │       └── Toast.jsx              # Toast notification system
│   ├── context/
│   │   ├── AttendanceContext.jsx      # Attendance state management
│   │   ├── AuthContext.jsx            # Authentication state management
│   │   ├── DepartmentContext.jsx      # Department state management
│   │   ├── EmployeeContext.jsx        # Employee state management
│   │   └── LeaveContext.jsx           # Leave state management
│   ├── data/
│   │   ├── attendance.js              # Mock attendance data generator
│   │   ├── departments.js             # Initial department data
│   │   ├── employees.js               # Initial employee data (15 records)
│   │   └── users.js                   # Mock user data for authentication
│   ├── hooks/
│   │   ├── useAuth.js                 # Auth context consumer hook
│   │   ├── useEmployees.js            # Employee context consumer hook
│   │   └── useLocalStorage.js         # localStorage with state sync
│   ├── pages/
│   │   ├── auth/
│   │   │   └── Login.jsx              # Login page with demo credentials
│   │   ├── dashboard/
│   │   │   ├── Dashboard.jsx          # Main dashboard page
│   │   │   └── components/
│   │   │       ├── ActivityFeed.jsx   # Recent activity feed
│   │   │       ├── DashboardCharts.jsx # Charts with Recharts
│   │   │       └── StatsCard.jsx      # Dashboard stat cards
│   │   ├── employees/
│   │   │   ├── EmployeeList.jsx       # Employee list with filters
│   │   │   ├── EmployeeForm.jsx       # Add/edit employee form
│   │   │   ├── EmployeeDetails.jsx    # Detailed employee view
│   │   │   └── components/
│   │   │       ├── EmployeeActions.jsx # Action buttons
│   │   │       ├── EmployeeFilters.jsx # Advanced filtering
│   │   │       ├── EmployeeRow.jsx    # Table row component
│   │   │       └── EmployeeTable.jsx  # Sortable table
│   │   ├── departments/
│   │   │   ├── DepartmentList.jsx     # Department management
│   │   │   └── components/
│   │   │       ├── DepartmentCard.jsx # Department card display
│   │   │       └── DepartmentForm.jsx # Department form modal
│   │   ├── attendance/
│   │   │   ├── Attendance.jsx         # Attendance management page
│   │   │   └── components/
│   │   │       ├── AttendanceRow.jsx  # Attendance table row
│   │   │       └── AttendanceTable.jsx # Attendance table
│   │   ├── leave/
│   │   │   ├── LeaveList.jsx          # Leave management with approvals
│   │   │   └── components/
│   │   │       ├── LeaveActions.jsx   # Leave application form
│   │   │       └── LeaveTable.jsx     # Leave applications table
│   │   └── profile/
│   │       └── Profile.jsx            # User profile with password change
│   ├── styles/
│   │   └── index.css                  # Global styles with Tailwind
│   ├── utils/
│   │   ├── constants.js               # Application constants
│   │   ├── helpers.js                 # Utility functions (20+ helpers)
│   │   └── validators.js              # Form validation functions
│   └── main.jsx                       # Application entry point
├── index.html                         # HTML template
├── package.json                       # Dependencies and scripts
├── tailwind.config.js                 # Tailwind configuration
├── postcss.config.js                  # PostCSS configuration
└── vite.config.js                     # Vite configuration
```

---

## 🔐 Demo Credentials

Use these credentials to explore different user roles:

### Admin Account

- **Email**: `admin@ems.com`
- **Password**: `admin123`
- **Access**: Full system access (all modules)

### Manager Account

- **Email**: `manager@ems.com`
- **Password**: `manager123`
- **Access**: Department management, employee view, leave approvals

### Employee Account

- **Email**: `employee@ems.com`
- **Password**: `employee123`
- **Access**: Personal profile, leave applications

---

## 📦 Installation & Setup

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Steps

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd employee-management-system
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:

   ```
   http://localhost:5173
   ```

5. **Login** using one of the demo credentials above.

---

## 📜 Available Scripts

| Script            | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build for production                     |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run ESLint for code quality              |

---

## 🎨 Design Highlights

### Responsive Design

- **Mobile-first approach** with Tailwind CSS
- **Collapsible sidebar** for mobile devices
- **Responsive tables** with horizontal scrolling
- **Adaptive layouts** for all screen sizes

### UI/UX Features

- **Consistent color scheme** with primary blue palette
- **Intuitive navigation** with role-based menus
- **Form validation** with real-time error messages
- **Toast notifications** for user feedback
- **Loading states** with spinners
- **Confirmation modals** for destructive actions
- **Debounced search** for performance optimization

### Accessibility

- **Semantic HTML** elements
- **Keyboard navigation** support
- **ARIA labels** for screen readers
- **Focus management** in modals

---

## 🔄 Data Persistence

All data is stored in **localStorage** with the following keys:

- `ems_auth_user`: Current authenticated user
- `ems_employees`: Employee records
- `ems_departments`: Department data
- `ems_attendance`: Attendance records
- `ems_leaves`: Leave applications

**Note**: Data persists across sessions but is limited to the browser. Clearing browser data will reset the application.

---

## 🧩 Key Features Breakdown

### Context Providers (5 Total)

1. **AuthContext**: User authentication, role management, login/logout
2. **EmployeeContext**: Employee CRUD, search, filtering, statistics
3. **DepartmentContext**: Department CRUD, employee count tracking
4. **AttendanceContext**: Mark attendance, date-based filtering, statistics
5. **LeaveContext**: Leave applications, approval workflow, statistics

### Custom Hooks (3 Total)

1. **useLocalStorage**: Sync state with localStorage
2. **useAuth**: Access authentication context
3. **useEmployees**: Access employee context

### Reusable UI Components (7 Total)

1. **Button**: 5 variants (primary, secondary, danger, success, outline)
2. **Input**: Label, validation, error display
3. **Modal**: Dialog with backdrop and animations
4. **Table**: Compound components (Table.Root, Table.Header, Table.Body, Table.Row, Table.Cell)
5. **Loader**: Spinner with optional text
6. **Toast**: Notification system with 4 types (success, error, warning, info)
7. **ProtectedRoute**: Role-based route guards

### Utility Functions (20+ Helpers)

- Date formatting and manipulation
- Currency formatting
- Initials generation
- Search and filtering
- Sorting (ascending/descending)
- Data grouping
- Debouncing
- ID generation
- Validation helpers

---

## 📊 Mock Data

### Initial Employees: 15

- 5 Engineers
- 3 HR Staff
- 3 Marketing Professionals
- 2 Sales Representatives
- 2 Finance Analysts

### Departments: 5

- Engineering (Head: Sarah Johnson)
- Human Resources (Head: Michael Chen)
- Marketing (Head: Emily Davis)
- Sales (Head: James Wilson)
- Finance (Head: Lisa Anderson)

### Attendance: 30 Days

- Auto-generated with 90% presence rate
- Random status assignment (Present, Late, Half Day, Absent)

### Leave Applications: 10

- Various types (Casual, Sick, Annual, Unpaid)
- Mixed statuses (Pending, Approved, Rejected)

---

## 🚧 Future Enhancements (Optional)

- [ ] Export data to CSV/Excel
- [ ] Print employee reports
- [ ] Advanced analytics with more charts
- [ ] Bulk employee upload
- [ ] Email notifications (mock)
- [ ] Calendar view for leave applications
- [ ] Payroll management module
- [ ] Performance review module
- [ ] Dark mode toggle
- [ ] Multi-language support

---

## 🐛 Known Limitations

- **No Backend**: All data is client-side only
- **localStorage Limits**: Browser storage limitations apply (~5MB)
- **No Real Authentication**: Demo credentials are hardcoded
- **No Data Validation on Server**: All validation is client-side
- **No Real-time Sync**: Changes are local to the browser

---

## 📸 Screenshots

### Login Page

- Clean, centered login form
- Demo credentials displayed for easy access
- Responsive design with brand colors

### Dashboard

- 4 key statistics cards (Employees, Departments, Attendance Rate, Active Leaves)
- 3 interactive charts (Pie, Line, Bar)
- Recent activity feed with timestamps

### Employee Management

- Advanced filters (search, department, position, status)
- Sortable table columns
- Action buttons (view, edit, delete)
- Detailed employee view with statistics

### Department Management

- Grid of department cards
- Employee count per department
- Modal-based add/edit forms

### Attendance Tracking

- Date picker for filtering
- Mark attendance dropdown (Present, Absent, Late, Half Day)
- Statistics summary cards

### Leave Management

- Role-based views (Employee sees own leaves, Admin/Manager sees all)
- Approve/Reject actions for pending leaves
- Status badges (color-coded)

### User Profile

- Editable profile information
- Password change form with validation

---

## 👨‍💻 Development Notes

### Code Quality

- **Functional Components Only**: No class components
- **React Hooks**: useState, useEffect, useContext, custom hooks
- **PropTypes**: Not included (can be added for type safety)
- **ESLint**: Configured for React best practices
- **Code Comments**: Detailed JSDoc-style comments

### Performance Optimizations

- **Debounced Search**: 300ms delay for search inputs
- **Lazy Loading**: Not implemented (can be added with React.lazy)
- **Memoization**: Not heavily used (can be optimized with useMemo/useCallback)
- **Code Splitting**: Single bundle (can be split by route)

### Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **ES6+ Features**: Arrow functions, destructuring, spread operator, template literals
- **No IE Support**: Modern JavaScript only

---

## 📝 License

This project is created for **portfolio and educational purposes**. Feel free to use, modify, and distribute as needed.

---

## 🤝 Contributing

This is a complete, standalone project. If you'd like to extend it:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📧 Contact

For questions or feedback, please reach out via GitHub issues.

---

## ⭐ Acknowledgments

- **React Team**: For the amazing React library
- **Vite Team**: For the blazing-fast build tool
- **Tailwind CSS**: For the utility-first CSS framework
- **Recharts**: For the beautiful charting library

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
