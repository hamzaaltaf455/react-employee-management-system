# Employee Management System - Backend

A RESTful API built with Java Spring Boot for managing employees, departments, attendance, and leave applications.

## 🚀 Features

- **No Database Required**: All data stored in-memory using Java Collections
- **Runtime Data Modification**: Full CRUD operations with immediate effect
- **RESTful API Design**: Clean, standard REST endpoints
- **CORS Enabled**: Ready for frontend integration
- **Complete Employee Management**: Create, read, update, delete employees
- **Department Management**: Manage organizational departments
- **Attendance Tracking**: Record and monitor employee attendance
- **Leave Management**: Handle leave applications and approvals
- **Authentication**: Simple login system

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

## 🛠️ Installation & Setup

### 1. Navigate to the backend directory
```bash
cd backend
```

### 2. Build the project
```bash
mvn clean install
```

### 3. Run the application
```bash
mvn spring-boot:run
```

The API will be available at: `http://localhost:8080/api`

## 📚 API Documentation

### Base URL
```
http://localhost:8080/api
```

---

## 🔐 Authentication Endpoints

### Login
```
POST /auth/login
Content-Type: application/json

Request Body:
{
  "email": "admin@ems.com",
  "password": "admin123"
}

Response (200 OK):
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "admin@ems.com",
    "role": "Admin",
    "name": "John Admin",
    "employeeId": "EMP001",
    "avatar": "https://ui-avatars.com/api/?name=..."
  }
}
```

### Get User by ID
```
GET /auth/user/{id}

Response (200 OK):
{
  "id": 1,
  "email": "admin@ems.com",
  "role": "Admin",
  "name": "John Admin",
  "employeeId": "EMP001",
  "avatar": "https://ui-avatars.com/api/?name=..."
}
```

---

## 👥 Employee Endpoints

### Get All Employees
```
GET /employees

Response (200 OK): Array of employee objects
```

### Get Employee by ID
```
GET /employees/{id}

Example: GET /employees/EMP001

Response (200 OK):
{
  "id": "EMP001",
  "firstName": "John",
  "lastName": "Admin",
  "email": "admin@ems.com",
  "phone": "+1-555-0101",
  "department": "DEPT001",
  "position": "Chief Technology Officer",
  "role": "Admin",
  "joiningDate": "2023-01-15",
  "salary": 150000.0,
  "status": "Active",
  "address": {
    "street": "123 Tech Street",
    "city": "San Francisco",
    "state": "CA",
    "zipCode": "94105",
    "country": "USA"
  },
  "emergencyContact": {
    "name": "Jane Admin",
    "relationship": "Spouse",
    "phone": "+1-555-0102"
  },
  "avatar": "https://ui-avatars.com/api/?name=..."
}

Response (404 Not Found): Employee not found
```

### Get Employees by Department
```
GET /employees/department/{departmentId}

Example: GET /employees/department/DEPT001
```

### Get Employees by Status
```
GET /employees/status/{status}

Example: GET /employees/status/Active
```

### Search Employees
```
GET /employees/search?q={searchTerm}

Example: GET /employees/search?q=john
```

### Get Employee Statistics
```
GET /employees/stats

Response (200 OK):
{
  "total": 15,
  "active": 14,
  "inactive": 0,
  "onLeave": 1
}
```

### Create Employee
```
POST /employees
Content-Type: application/json

Request Body:
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@ems.com",
  "phone": "+1-555-9999",
  "department": "DEPT001",
  "position": "Software Engineer",
  "role": "Employee",
  "joiningDate": "2024-01-15",
  "salary": 100000.0,
  "status": "Active",
  "address": {
    "street": "123 Main St",
    "city": "San Francisco",
    "state": "CA",
    "zipCode": "94101",
    "country": "USA"
  },
  "emergencyContact": {
    "name": "John Doe",
    "relationship": "Spouse",
    "phone": "+1-555-8888"
  }
}

Response (201 Created): Created employee object with auto-generated ID
```

### Update Employee
```
PUT /employees/{id}
Content-Type: application/json

Request Body: Same as Create Employee (with updated fields)

Response (200 OK): Updated employee object
Response (404 Not Found): Employee not found
```

### Delete Employee
```
DELETE /employees/{id}

Response (204 No Content): Successfully deleted
Response (404 Not Found): Employee not found
```

---

## 🏢 Department Endpoints

### Get All Departments
```
GET /departments
```

### Get Department by ID
```
GET /departments/{id}

Example: GET /departments/DEPT001
```

### Get Department by Name
```
GET /departments/name/{name}

Example: GET /departments/name/Engineering
```

### Create Department
```
POST /departments
Content-Type: application/json

Request Body:
{
  "name": "Research & Development",
  "description": "Product research and development",
  "headOfDepartment": "EMP001",
  "status": "Active"
}

Response (201 Created): Created department with auto-generated ID
```

### Update Department
```
PUT /departments/{id}
Content-Type: application/json

Request Body: Same as Create Department

Response (200 OK): Updated department
Response (404 Not Found): Department not found
```

### Delete Department
```
DELETE /departments/{id}

Response (204 No Content): Successfully deleted
Response (404 Not Found): Department not found
```

### Update Employee Count
```
PATCH /departments/{id}/employee-count
Content-Type: application/json

Request Body:
{
  "count": 20
}

Response (200 OK): Updated department
Response (404 Not Found): Department not found
```

---

## 📅 Attendance Endpoints

### Get All Attendance Records
```
GET /attendance
```

### Get Attendance by ID
```
GET /attendance/{id}

Example: GET /attendance/ATT-EMP001-2024-01-15
```

### Get Attendance by Employee
```
GET /attendance/employee/{employeeId}

Example: GET /attendance/employee/EMP001
```

### Get Attendance by Date
```
GET /attendance/date/{date}

Example: GET /attendance/date/2024-01-15
```

### Get Today's Attendance
```
GET /attendance/today
```

### Get Employee Attendance Statistics
```
GET /attendance/employee/{employeeId}/stats?days={days}

Example: GET /attendance/employee/EMP001/stats?days=30

Response (200 OK):
{
  "total": 30,
  "present": 27,
  "absent": 3,
  "halfDay": 0,
  "late": 0,
  "attendanceRate": 90.0
}
```

### Get Date Attendance Statistics
```
GET /attendance/date/{date}/stats

Example: GET /attendance/date/2024-01-15/stats
```

### Mark Attendance
```
POST /attendance
Content-Type: application/json

Request Body:
{
  "employeeId": "EMP001",
  "date": "2024-01-15",
  "status": "Present",
  "checkInTime": "09:00",
  "checkOutTime": "18:00",
  "workingHours": 9.0,
  "notes": ""
}

Response (201 Created): Created attendance record
```

### Update Attendance
```
PUT /attendance/{id}
Content-Type: application/json

Request Body: Same as Mark Attendance

Response (200 OK): Updated attendance record
```

### Delete Attendance
```
DELETE /attendance/{id}

Response (204 No Content): Successfully deleted
Response (404 Not Found): Attendance not found
```

---

## 🏖️ Leave Management Endpoints

### Get All Leaves
```
GET /leaves
```

### Get Leave by ID
```
GET /leaves/{id}

Example: GET /leaves/LEAVE001
```

### Get Leaves by Employee
```
GET /leaves/employee/{employeeId}

Example: GET /leaves/employee/EMP003
```

### Get Leaves by Status
```
GET /leaves/status/{status}

Example: GET /leaves/status/Pending
```

### Get Pending Leaves
```
GET /leaves/pending
```

### Get Leave Statistics
```
GET /leaves/employee/{employeeId}/stats

Example: GET /leaves/employee/EMP003/stats

Response (200 OK):
{
  "total": 5,
  "pending": 1,
  "approved": 3,
  "rejected": 1,
  "totalDays": 15
}
```

### Apply for Leave
```
POST /leaves
Content-Type: application/json

Request Body:
{
  "employeeId": "EMP003",
  "leaveType": "Casual Leave",
  "startDate": "2024-02-01",
  "endDate": "2024-02-03",
  "reason": "Personal reasons"
}

Response (201 Created): Created leave application with auto-generated ID and Pending status
```

### Update Leave
```
PUT /leaves/{id}
Content-Type: application/json

Request Body: Same as Apply for Leave

Response (200 OK): Updated leave
Response (404 Not Found): Leave not found
```

### Approve Leave
```
POST /leaves/{id}/approve
Content-Type: application/json

Request Body:
{
  "approverId": "EMP001"
}

Response (200 OK): Approved leave with updated status
Response (404 Not Found): Leave not found
```

### Reject Leave
```
POST /leaves/{id}/reject
Content-Type: application/json

Request Body:
{
  "approverId": "EMP001",
  "reason": "Not enough staff during that period"
}

Response (200 OK): Rejected leave with updated status
Response (404 Not Found): Leave not found
```

### Delete Leave
```
DELETE /leaves/{id}

Response (204 No Content): Successfully deleted
Response (404 Not Found): Leave not found
```

---

## 🧪 Testing with Postman

### Default Users for Login:
1. **Admin Account**
   - Email: `admin@ems.com`
   - Password: `admin123`

2. **Manager Account**
   - Email: `manager@ems.com`
   - Password: `manager123`

3. **Employee Account**
   - Email: `employee@ems.com`
   - Password: `employee123`

### Sample Test Flow:

1. **Login**
   ```
   POST http://localhost:8080/api/auth/login
   Body: {"email": "admin@ems.com", "password": "admin123"}
   ```

2. **Get All Employees**
   ```
   GET http://localhost:8080/api/employees
   ```

3. **Create New Employee**
   ```
   POST http://localhost:8080/api/employees
   Body: { ... employee data ... }
   ```

4. **Update Employee**
   ```
   PUT http://localhost:8080/api/employees/EMP001
   Body: { ... updated data ... }
   ```

5. **Mark Attendance**
   ```
   POST http://localhost:8080/api/attendance
   Body: { ... attendance data ... }
   ```

---

## 📊 Data Models

### Employee
- id (String, auto-generated)
- firstName (String)
- lastName (String)
- email (String)
- phone (String)
- department (String, department ID)
- position (String)
- role (String: Admin, Manager, Employee)
- joiningDate (String, YYYY-MM-DD)
- salary (Double)
- status (String: Active, Inactive, On Leave)
- address (Object)
- emergencyContact (Object)
- avatar (String, URL)

### Department
- id (String, auto-generated)
- name (String)
- description (String)
- headOfDepartment (String, employee ID)
- employeeCount (Integer)
- createdAt (String, YYYY-MM-DD)
- status (String: Active, Inactive)

### Attendance
- id (String, auto-generated)
- employeeId (String)
- date (String, YYYY-MM-DD)
- status (String: Present, Absent, Half Day, Late)
- checkInTime (String, HH:mm)
- checkOutTime (String, HH:mm)
- workingHours (Double)
- notes (String)

### Leave
- id (String, auto-generated)
- employeeId (String)
- leaveType (String)
- startDate (String, YYYY-MM-DD)
- endDate (String, YYYY-MM-DD)
- days (Integer, auto-calculated)
- reason (String)
- status (String: Pending, Approved, Rejected)
- appliedOn (String, auto-generated)
- approvedBy (String, employee ID)
- approvedOn (String)
- rejectionReason (String)

---

## 🔧 Configuration

### Server Port
Default: `8080`

To change the port, edit `application.properties`:
```properties
server.port=9090
```

### Context Path
Default: `/api`

All endpoints are prefixed with `/api`

---

## ⚠️ Important Notes

1. **No Database**: All data is stored in-memory. Data will be reset when the application restarts.

2. **Thread-Safe**: Uses ConcurrentHashMap for thread-safe operations.

3. **CORS Enabled**: All origins allowed for development. Restrict in production.

4. **Auto-Generated IDs**: IDs are automatically generated for new records.

5. **Validation**: Basic validation in place. Add more as needed.

---

## 🎯 Error Handling

All errors return a standardized JSON response:

```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Detailed error message"
}
```

HTTP Status Codes Used:
- `200 OK`: Successful GET, PUT
- `201 Created`: Successful POST
- `204 No Content`: Successful DELETE
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Invalid credentials
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

---

## 🚀 Production Considerations

Before deploying to production:

1. Add proper authentication/authorization (JWT tokens)
2. Implement input validation
3. Restrict CORS to specific origins
4. Add rate limiting
5. Implement logging
6. Add API documentation (Swagger/OpenAPI)
7. Consider adding a real database

---

## 📝 License

This project is for educational purposes.
