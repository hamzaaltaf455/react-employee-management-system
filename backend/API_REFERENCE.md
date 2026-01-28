# 📖 Employee Management System - API Quick Reference

## 🔗 Base URL
```
http://localhost:8080/api
```

---

## 🔐 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | User login |
| GET | `/auth/user/{id}` | Get user by ID |

**Login Request:**
```json
{
  "email": "admin@ems.com",
  "password": "admin123"
}
```

---

## 👥 Employees

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/employees` | Get all employees |
| GET | `/employees/{id}` | Get employee by ID |
| GET | `/employees/department/{deptId}` | Get employees by department |
| GET | `/employees/status/{status}` | Get employees by status |
| GET | `/employees/search?q={term}` | Search employees |
| GET | `/employees/stats` | Get employee statistics |
| POST | `/employees` | Create new employee |
| PUT | `/employees/{id}` | Update employee |
| DELETE | `/employees/{id}` | Delete employee |

---

## 🏢 Departments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/departments` | Get all departments |
| GET | `/departments/{id}` | Get department by ID |
| GET | `/departments/name/{name}` | Get department by name |
| POST | `/departments` | Create new department |
| PUT | `/departments/{id}` | Update department |
| PATCH | `/departments/{id}/employee-count` | Update employee count |
| DELETE | `/departments/{id}` | Delete department |

---

## 📅 Attendance

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/attendance` | Get all attendance records |
| GET | `/attendance/{id}` | Get attendance by ID |
| GET | `/attendance/employee/{empId}` | Get attendance by employee |
| GET | `/attendance/date/{date}` | Get attendance by date |
| GET | `/attendance/today` | Get today's attendance |
| GET | `/attendance/employee/{empId}/stats?days={n}` | Get employee attendance stats |
| GET | `/attendance/date/{date}/stats` | Get date attendance stats |
| POST | `/attendance` | Mark attendance |
| PUT | `/attendance/{id}` | Update attendance |
| DELETE | `/attendance/{id}` | Delete attendance |

---

## 🏖️ Leave Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/leaves` | Get all leaves |
| GET | `/leaves/{id}` | Get leave by ID |
| GET | `/leaves/employee/{empId}` | Get leaves by employee |
| GET | `/leaves/status/{status}` | Get leaves by status |
| GET | `/leaves/pending` | Get pending leaves |
| GET | `/leaves/employee/{empId}/stats` | Get leave statistics |
| POST | `/leaves` | Apply for leave |
| PUT | `/leaves/{id}` | Update leave |
| POST | `/leaves/{id}/approve` | Approve leave |
| POST | `/leaves/{id}/reject` | Reject leave |
| DELETE | `/leaves/{id}` | Delete/cancel leave |

---

## 📊 Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Successful GET, PUT |
| 201 | Created - Successful POST |
| 204 | No Content - Successful DELETE |
| 400 | Bad Request - Invalid data |
| 401 | Unauthorized - Invalid credentials |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

---

## 🎯 Default Test Data

### Users
- **Admin**: admin@ems.com / admin123
- **Manager**: manager@ems.com / manager123
- **Employee**: employee@ems.com / employee123

### Employees
- EMP001 to EMP015

### Departments
- DEPT001 (Engineering)
- DEPT002 (Human Resources)
- DEPT003 (Marketing)
- DEPT004 (Sales)
- DEPT005 (Finance)

---

## 🧪 Sample Requests

### Create Employee
```bash
POST /api/employees
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@ems.com",
  "phone": "+1-555-1234",
  "department": "DEPT001",
  "position": "Software Engineer",
  "role": "Employee",
  "joiningDate": "2026-01-05",
  "salary": 100000,
  "status": "Active",
  "address": {
    "street": "123 Main St",
    "city": "San Francisco",
    "state": "CA",
    "zipCode": "94101",
    "country": "USA"
  },
  "emergencyContact": {
    "name": "Jane Doe",
    "relationship": "Spouse",
    "phone": "+1-555-5678"
  }
}
```

### Mark Attendance
```bash
POST /api/attendance
Content-Type: application/json

{
  "employeeId": "EMP001",
  "date": "2026-01-04",
  "status": "Present",
  "checkInTime": "09:00",
  "checkOutTime": "18:00",
  "workingHours": 9.0,
  "notes": ""
}
```

### Apply for Leave
```bash
POST /api/leaves
Content-Type: application/json

{
  "employeeId": "EMP003",
  "leaveType": "Casual Leave",
  "startDate": "2026-02-10",
  "endDate": "2026-02-12",
  "reason": "Personal reasons"
}
```

### Approve Leave
```bash
POST /api/leaves/LEAVE001/approve
Content-Type: application/json

{
  "approverId": "EMP001"
}
```

---

## 📝 Notes

- All dates in `YYYY-MM-DD` format
- All times in `HH:mm` format
- IDs are auto-generated for POST requests
- Data persists during runtime only
- CORS enabled for all origins

---

**Print this for quick reference! 📄**
