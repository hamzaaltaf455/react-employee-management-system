# Employee Management System - API Testing Guide

## Quick Start with Postman

This guide provides sample requests for testing all API endpoints using Postman.

---

## 1. Authentication

### Login as Admin
```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "admin@ems.com",
  "password": "admin123"
}
```

### Login as Manager
```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "manager@ems.com",
  "password": "manager123"
}
```

### Login as Employee
```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "employee@ems.com",
  "password": "employee123"
}
```

---

## 2. Employee Operations

### Get All Employees
```
GET http://localhost:8080/api/employees
```

### Get Employee by ID
```
GET http://localhost:8080/api/employees/EMP001
```

### Create New Employee
```
POST http://localhost:8080/api/employees
Content-Type: application/json

{
  "firstName": "Alice",
  "lastName": "Smith",
  "email": "alice.smith@ems.com",
  "phone": "+1-555-2000",
  "department": "DEPT001",
  "position": "Senior Software Engineer",
  "role": "Employee",
  "joiningDate": "2026-01-05",
  "salary": 125000.0,
  "status": "Active",
  "address": {
    "street": "456 Tech Avenue",
    "city": "San Francisco",
    "state": "CA",
    "zipCode": "94102",
    "country": "USA"
  },
  "emergencyContact": {
    "name": "Bob Smith",
    "relationship": "Spouse",
    "phone": "+1-555-2001"
  }
}
```

### Update Employee
```
PUT http://localhost:8080/api/employees/EMP001
Content-Type: application/json

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
  "salary": 160000.0,
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
  "avatar": "https://ui-avatars.com/api/?name=John+Admin&background=3b82f6&color=fff"
}
```

### Search Employees
```
GET http://localhost:8080/api/employees/search?q=john
```

### Get Employee Stats
```
GET http://localhost:8080/api/employees/stats
```

### Delete Employee
```
DELETE http://localhost:8080/api/employees/EMP016
```

---

## 3. Department Operations

### Get All Departments
```
GET http://localhost:8080/api/departments
```

### Get Department by ID
```
GET http://localhost:8080/api/departments/DEPT001
```

### Create New Department
```
POST http://localhost:8080/api/departments
Content-Type: application/json

{
  "name": "Research & Development",
  "description": "Product research and innovation",
  "headOfDepartment": "EMP001",
  "status": "Active"
}
```

### Update Department
```
PUT http://localhost:8080/api/departments/DEPT001
Content-Type: application/json

{
  "id": "DEPT001",
  "name": "Engineering & Technology",
  "description": "Software development and technical operations",
  "headOfDepartment": "EMP001",
  "employeeCount": 16,
  "createdAt": "2023-01-15",
  "status": "Active"
}
```

### Update Employee Count
```
PATCH http://localhost:8080/api/departments/DEPT001/employee-count
Content-Type: application/json

{
  "count": 20
}
```

### Delete Department
```
DELETE http://localhost:8080/api/departments/DEPT006
```

---

## 4. Attendance Operations

### Get All Attendance
```
GET http://localhost:8080/api/attendance
```

### Get Today's Attendance
```
GET http://localhost:8080/api/attendance/today
```

### Get Attendance by Employee
```
GET http://localhost:8080/api/attendance/employee/EMP001
```

### Get Attendance by Date
```
GET http://localhost:8080/api/attendance/date/2026-01-04
```

### Mark Attendance
```
POST http://localhost:8080/api/attendance
Content-Type: application/json

{
  "employeeId": "EMP001",
  "date": "2026-01-04",
  "status": "Present",
  "checkInTime": "09:00",
  "checkOutTime": "18:30",
  "workingHours": 9.5,
  "notes": ""
}
```

### Update Attendance
```
PUT http://localhost:8080/api/attendance/ATT-EMP001-2026-01-04
Content-Type: application/json

{
  "id": "ATT-EMP001-2026-01-04",
  "employeeId": "EMP001",
  "date": "2026-01-04",
  "status": "Present",
  "checkInTime": "09:05",
  "checkOutTime": "18:00",
  "workingHours": 8.92,
  "notes": "Late arrival"
}
```

### Get Employee Attendance Stats
```
GET http://localhost:8080/api/attendance/employee/EMP001/stats?days=30
```

### Get Date Attendance Stats
```
GET http://localhost:8080/api/attendance/date/2026-01-04/stats
```

### Delete Attendance
```
DELETE http://localhost:8080/api/attendance/ATT-EMP001-2026-01-04
```

---

## 5. Leave Management Operations

### Get All Leaves
```
GET http://localhost:8080/api/leaves
```

### Get Pending Leaves
```
GET http://localhost:8080/api/leaves/pending
```

### Get Leave by ID
```
GET http://localhost:8080/api/leaves/LEAVE001
```

### Get Leaves by Employee
```
GET http://localhost:8080/api/leaves/employee/EMP003
```

### Apply for Leave
```
POST http://localhost:8080/api/leaves
Content-Type: application/json

{
  "employeeId": "EMP003",
  "leaveType": "Casual Leave",
  "startDate": "2026-02-10",
  "endDate": "2026-02-12",
  "reason": "Family function"
}
```

### Update Leave
```
PUT http://localhost:8080/api/leaves/LEAVE001
Content-Type: application/json

{
  "id": "LEAVE001",
  "employeeId": "EMP003",
  "leaveType": "Annual Leave",
  "startDate": "2024-12-25",
  "endDate": "2024-12-27",
  "days": 3,
  "reason": "Family vacation - Updated",
  "status": "Approved",
  "appliedOn": "2024-12-10",
  "approvedBy": "EMP001",
  "approvedOn": "2024-12-11"
}
```

### Approve Leave
```
POST http://localhost:8080/api/leaves/LEAVE002/approve
Content-Type: application/json

{
  "approverId": "EMP001"
}
```

### Reject Leave
```
POST http://localhost:8080/api/leaves/LEAVE002/reject
Content-Type: application/json

{
  "approverId": "EMP001",
  "reason": "Insufficient staff during this period"
}
```

### Get Leave Stats
```
GET http://localhost:8080/api/leaves/employee/EMP003/stats
```

### Delete Leave
```
DELETE http://localhost:8080/api/leaves/LEAVE003
```

---

## Testing Flow

### Recommended Testing Sequence:

1. **Test Authentication**
   - Login with different user roles
   - Verify response structure

2. **Test Employee CRUD**
   - Get all employees
   - Get specific employee
   - Create new employee
   - Update employee
   - Search employees
   - Delete employee

3. **Test Department CRUD**
   - Get all departments
   - Create department
   - Update department
   - Delete department

4. **Test Attendance**
   - Mark today's attendance
   - Get attendance by employee
   - Get attendance stats
   - Update attendance

5. **Test Leave Management**
   - Apply for leave
   - Get pending leaves
   - Approve/reject leave
   - Get leave statistics

---

## Expected Responses

### Success Responses:
- `200 OK` - GET, PUT requests
- `201 Created` - POST requests
- `204 No Content` - DELETE requests

### Error Responses:
- `400 Bad Request` - Invalid data
- `401 Unauthorized` - Invalid credentials
- `404 Not Found` - Resource doesn't exist
- `500 Internal Server Error` - Server error

---

## Tips for Testing

1. **Use Postman Collections**: Save all requests in a collection for easy reuse
2. **Environment Variables**: Use variables for base URL and IDs
3. **Test Edge Cases**: 
   - Invalid IDs
   - Missing required fields
   - Invalid date formats
   - Empty strings
4. **Check Response Times**: Should be fast (< 100ms for most operations)
5. **Verify Data Persistence**: Changes should persist until server restart

---

## Common Issues

### Issue: Cannot connect to server
**Solution**: Ensure the Spring Boot application is running on port 8080

### Issue: CORS errors
**Solution**: CORS is already configured to allow all origins

### Issue: 404 Not Found
**Solution**: Check the URL - all endpoints should start with `/api`

### Issue: Data not persisting after server restart
**Solution**: This is expected - data is stored in-memory only

---

## Sample Data IDs

Use these IDs for testing:

**Employees**: EMP001 to EMP015
**Departments**: DEPT001 to DEPT005
**Users**: 1, 2, 3
**Attendance**: ATT-{EMPID}-{DATE} (e.g., ATT-EMP001-2026-01-04)
**Leaves**: LEAVE001, LEAVE002

---

## Advanced Testing Scenarios

### Scenario 1: Complete Employee Lifecycle
1. Create employee
2. Mark attendance for multiple days
3. Apply for leave
4. Approve leave
5. Update employee details
6. Delete employee

### Scenario 2: Department Management
1. Create new department
2. Assign employees to department
3. Update employee count
4. Check department statistics
5. Delete department

### Scenario 3: Attendance Management
1. Mark attendance for multiple employees
2. Check daily statistics
3. Get employee attendance history
4. Update incorrect attendance
5. Calculate attendance rate

---

Happy Testing! 🚀
