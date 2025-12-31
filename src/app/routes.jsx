import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';

// Pages
import Login from '../pages/auth/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import EmployeeList from '../pages/employees/EmployeeList';
import EmployeeForm from '../pages/employees/EmployeeForm';
import EmployeeDetails from '../pages/employees/EmployeeDetails';
import DepartmentList from '../pages/departments/DepartmentList';
import Attendance from '../pages/attendance/Attendance';
import LeaveList from '../pages/leave/LeaveList';
import Profile from '../pages/profile/Profile';

/**
 * AppLayout Component
 * Main layout with sidebar and navbar for protected pages
 */
const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col min-h-screen lg:ml-64">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

/**
 * AppRoutes Component
 * Application routing configuration
 */
export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Route */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        } 
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Navigate to="/dashboard" replace />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Employee Routes */}
      <Route
        path="/employees"
        element={
          <ProtectedRoute requiredRoles={['Admin', 'Manager']}>
            <AppLayout>
              <EmployeeList />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees/new"
        element={
          <ProtectedRoute requiredRoles={['Admin', 'Manager']}>
            <AppLayout>
              <EmployeeForm />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees/edit/:id"
        element={
          <ProtectedRoute requiredRoles={['Admin', 'Manager']}>
            <AppLayout>
              <EmployeeForm />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees/:id"
        element={
          <ProtectedRoute requiredRoles={['Admin', 'Manager']}>
            <AppLayout>
              <EmployeeDetails />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Department Routes */}
      <Route
        path="/departments"
        element={
          <ProtectedRoute requiredRoles={['Admin']}>
            <AppLayout>
              <DepartmentList />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Attendance Routes */}
      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Attendance />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Leave Routes */}
      <Route
        path="/leave"
        element={
          <ProtectedRoute>
            <AppLayout>
              <LeaveList />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Profile Route */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Profile />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* 404 Route */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-6xl mb-4">404</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
              <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
              <a href="/dashboard" className="btn-primary">
                Go to Dashboard
              </a>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
