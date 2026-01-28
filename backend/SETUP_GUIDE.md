# Employee Management System - Complete Setup Guide

## 📁 Project Structure

```
backend/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── ems/
│       │           ├── EmployeeManagementSystemApplication.java  # Main Application
│       │           ├── config/
│       │           │   └── CorsConfig.java                       # CORS Configuration
│       │           ├── controller/
│       │           │   ├── AuthController.java                   # Authentication Endpoints
│       │           │   ├── EmployeeController.java               # Employee Endpoints
│       │           │   ├── DepartmentController.java             # Department Endpoints
│       │           │   ├── AttendanceController.java             # Attendance Endpoints
│       │           │   └── LeaveController.java                  # Leave Endpoints
│       │           ├── dto/
│       │           │   ├── LoginRequest.java                     # Login Request DTO
│       │           │   ├── LoginResponse.java                    # Login Response DTO
│       │           │   └── UserDTO.java                          # User DTO (without password)
│       │           ├── exception/
│       │           │   └── GlobalExceptionHandler.java           # Global Exception Handler
│       │           ├── model/
│       │           │   ├── Address.java                          # Address Model
│       │           │   ├── Attendance.java                       # Attendance Model
│       │           │   ├── Department.java                       # Department Model
│       │           │   ├── EmergencyContact.java                 # Emergency Contact Model
│       │           │   ├── Employee.java                         # Employee Model
│       │           │   ├── Leave.java                            # Leave Model
│       │           │   └── User.java                             # User Model
│       │           └── service/
│       │               ├── AuthService.java                      # Authentication Service
│       │               ├── EmployeeService.java                  # Employee Service
│       │               ├── DepartmentService.java                # Department Service
│       │               ├── AttendanceService.java                # Attendance Service
│       │               └── LeaveService.java                     # Leave Service
│       └── resources/
│           └── application.properties                            # Application Configuration
├── pom.xml                                                        # Maven Configuration
├── .gitignore                                                     # Git Ignore File
├── README.md                                                      # Project Documentation
├── API_TESTING_GUIDE.md                                          # API Testing Guide
└── EMS-Postman-Collection.json                                   # Postman Collection
```

---

## 🚀 Quick Start

### Prerequisites Check
```bash
# Check Java version (must be 17+)
java -version

# Check Maven version (must be 3.6+)
mvn -version
```

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Clean and Build
```bash
mvn clean install
```

Expected output:
```
[INFO] BUILD SUCCESS
[INFO] Total time: XX.XXX s
```

### Step 3: Run the Application
```bash
mvn spring-boot:run
```

Expected output:
```
========================================
Employee Management System Started!
API Base URL: http://localhost:8080/api
========================================
```

### Step 4: Verify the API is Running
Open your browser or use curl:
```bash
curl http://localhost:8080/api/employees
```

You should see a JSON array of employees.

---

## 🔧 Configuration

### Change Server Port
Edit `src/main/resources/application.properties`:
```properties
server.port=9090
```

### Change Context Path
Edit `src/main/resources/application.properties`:
```properties
server.servlet.context-path=/myapi
```
Then access API at: `http://localhost:8080/myapi`

---

## 📊 In-Memory Data

The application comes pre-loaded with:
- **15 Employees** (EMP001 - EMP015)
- **5 Departments** (DEPT001 - DEPT005)
- **3 Users** for authentication
- **450 Attendance Records** (last 30 days for 15 employees)
- **2 Leave Applications**

All data is stored in `ConcurrentHashMap` for thread-safe operations.

---

## 🧪 Testing with Postman

### Import the Collection
1. Open Postman
2. Click "Import"
3. Select `EMS-Postman-Collection.json`
4. All endpoints will be loaded

### Quick Test Flow
1. **Login**: POST to `/api/auth/login` with admin credentials
2. **Get Employees**: GET `/api/employees`
3. **Create Employee**: POST to `/api/employees`
4. **Update Employee**: PUT to `/api/employees/{id}`
5. **Delete Employee**: DELETE `/api/employees/{id}`

---

## 📝 API Endpoints Summary

### Authentication
- `POST /api/auth/login` - Login
- `GET /api/auth/user/{id}` - Get user by ID

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/{id}` - Get employee by ID
- `GET /api/employees/department/{departmentId}` - Get by department
- `GET /api/employees/status/{status}` - Get by status
- `GET /api/employees/search?q={term}` - Search employees
- `GET /api/employees/stats` - Get statistics
- `POST /api/employees` - Create employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/{id}` - Get department by ID
- `POST /api/departments` - Create department
- `PUT /api/departments/{id}` - Update department
- `DELETE /api/departments/{id}` - Delete department

### Attendance
- `GET /api/attendance` - Get all attendance
- `GET /api/attendance/employee/{employeeId}` - Get by employee
- `GET /api/attendance/date/{date}` - Get by date
- `GET /api/attendance/today` - Get today's attendance
- `GET /api/attendance/employee/{id}/stats?days=30` - Get stats
- `POST /api/attendance` - Mark attendance
- `PUT /api/attendance/{id}` - Update attendance
- `DELETE /api/attendance/{id}` - Delete attendance

### Leave Management
- `GET /api/leaves` - Get all leaves
- `GET /api/leaves/employee/{employeeId}` - Get by employee
- `GET /api/leaves/pending` - Get pending leaves
- `GET /api/leaves/employee/{id}/stats` - Get stats
- `POST /api/leaves` - Apply for leave
- `POST /api/leaves/{id}/approve` - Approve leave
- `POST /api/leaves/{id}/reject` - Reject leave
- `DELETE /api/leaves/{id}` - Delete leave

---

## 🎯 Default Test Credentials

### Admin Account
- Email: `admin@ems.com`
- Password: `admin123`
- Employee ID: EMP001

### Manager Account
- Email: `manager@ems.com`
- Password: `manager123`
- Employee ID: EMP002

### Employee Account
- Email: `employee@ems.com`
- Password: `employee123`
- Employee ID: EMP003

---

## 🔍 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8080 | xargs kill -9
```

### Maven Build Fails
```bash
# Clear Maven cache
mvn dependency:purge-local-repository

# Re-download dependencies
mvn clean install -U
```

### Application Won't Start
1. Check Java version: `java -version` (must be 17+)
2. Check port availability
3. Check application.properties configuration
4. Review console errors

### CORS Issues
- CORS is configured to allow all origins (*)
- If still facing issues, check browser console
- Verify the request URL includes `/api` prefix

### Data Not Persisting
- This is expected behavior
- All data is in-memory
- Data resets on application restart
- For persistence, integrate a database

---

## 📦 Building JAR File

### Create Executable JAR
```bash
mvn clean package
```

JAR location: `target/employee-management-system-1.0.0.jar`

### Run the JAR
```bash
java -jar target/employee-management-system-1.0.0.jar
```

---

## 🌐 Integration with React Frontend

### Update Frontend API Base URL
In your React app, update the API base URL to:
```javascript
const API_BASE_URL = "http://localhost:8080/api";
```

### CORS is Pre-Configured
The backend is already configured to accept requests from any origin.

### Example Axios Configuration
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login
const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

// Get Employees
const getEmployees = async () => {
  const response = await api.get('/employees');
  return response.data;
};
```

---

## 🛡️ Security Notes

⚠️ **For Development Only**:
- Passwords stored in plain text
- No JWT authentication
- CORS allows all origins
- No rate limiting

✅ **For Production, Add**:
- Password encryption (BCrypt)
- JWT token authentication
- Role-based access control
- Rate limiting
- Input validation
- HTTPS
- Database integration

---

## 📊 Performance

Expected response times (on local machine):
- Simple GET: < 10ms
- Search: < 50ms
- Create/Update: < 20ms
- Statistics: < 30ms

---

## 🆘 Support

### Common Questions

**Q: Can I use a database?**
A: Yes, but this project is designed to work without one. To add a database, you'll need to add JPA dependencies and create entity classes.

**Q: How to add more employees?**
A: Use the POST `/api/employees` endpoint or add them in `EmployeeService.initializeData()`.

**Q: How to change default data?**
A: Edit the `initializeData()` methods in each Service class.

**Q: Can I deploy this to production?**
A: Not recommended without adding security features and a database.

---

## 🎓 Learning Resources

### Spring Boot
- [Official Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Boot REST API Guide](https://spring.io/guides/gs/rest-service/)

### Java
- [Java 17 Documentation](https://docs.oracle.com/en/java/javase/17/)

### REST API Design
- [REST API Best Practices](https://restfulapi.net/)

---

## ✅ Checklist

Before using the API, ensure:
- [ ] Java 17+ installed
- [ ] Maven 3.6+ installed
- [ ] Backend is running on port 8080
- [ ] Can access http://localhost:8080/api/employees
- [ ] Postman collection imported (optional)
- [ ] Default login credentials work

---

## 📄 License

This project is for educational purposes.

---

## 🎉 Next Steps

1. ✅ Start the backend
2. ✅ Test with Postman
3. ✅ Integrate with React frontend
4. 🚀 Build new features!

Happy coding! 🚀
