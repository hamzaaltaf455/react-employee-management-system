import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { EmployeeProvider } from '../context/EmployeeContext';
import { DepartmentProvider } from '../context/DepartmentContext';
import { AttendanceProvider } from '../context/AttendanceContext';
import { LeaveProvider } from '../context/LeaveContext';
import AppRoutes from './routes';

/**
 * App Component
 * Main application component with all providers
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EmployeeProvider>
          <DepartmentProvider>
            <AttendanceProvider>
              <LeaveProvider>
                <AppRoutes />
              </LeaveProvider>
            </AttendanceProvider>
          </DepartmentProvider>
        </EmployeeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
