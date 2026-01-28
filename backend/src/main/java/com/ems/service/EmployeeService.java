package com.ems.service;

import com.ems.model.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

/**
 * Employee Service
 * Manages employee data in-memory
 */
@Service
public class EmployeeService {

    private final Map<String, Employee> employees = new ConcurrentHashMap<>();
    private final AtomicInteger idCounter = new AtomicInteger(16);

    public EmployeeService() {
        initializeData();
    }

    /**
     * Initialize with hardcoded data matching the React frontend
     */
    private void initializeData() {
        addInitialEmployee("EMP001", "John", "Admin", "admin@ems.com", "+1-555-0101",
                "DEPT001", "Chief Technology Officer", "Admin", "2023-01-15", 150000.0, "Active",
                new Address("123 Tech Street", "San Francisco", "CA", "94105", "USA"),
                new EmergencyContact("Jane Admin", "Spouse", "+1-555-0102"));

        addInitialEmployee("EMP002", "Sarah", "Manager", "manager@ems.com", "+1-555-0201",
                "DEPT002", "HR Manager", "Manager", "2023-01-20", 95000.0, "Active",
                new Address("456 Business Ave", "San Francisco", "CA", "94106", "USA"),
                new EmergencyContact("Tom Manager", "Spouse", "+1-555-0202"));

        addInitialEmployee("EMP003", "Mike", "Employee", "employee@ems.com", "+1-555-0301",
                "DEPT001", "Senior Software Engineer", "Employee", "2023-02-01", 120000.0, "Active",
                new Address("789 Developer Lane", "San Francisco", "CA", "94107", "USA"),
                new EmergencyContact("Lisa Employee", "Sister", "+1-555-0302"));

        addInitialEmployee("EMP004", "Emily", "Johnson", "emily.johnson@ems.com", "+1-555-0401",
                "DEPT001", "Software Engineer", "Employee", "2023-03-15", 105000.0, "Active",
                new Address("321 Code Street", "San Francisco", "CA", "94108", "USA"),
                new EmergencyContact("Robert Johnson", "Father", "+1-555-0402"));

        addInitialEmployee("EMP005", "David", "Wilson", "david.wilson@ems.com", "+1-555-0501",
                "DEPT003", "Marketing Director", "Manager", "2023-02-10", 110000.0, "Active",
                new Address("654 Brand Boulevard", "San Francisco", "CA", "94109", "USA"),
                new EmergencyContact("Maria Wilson", "Spouse", "+1-555-0502"));

        addInitialEmployee("EMP006", "Jessica", "Brown", "jessica.brown@ems.com", "+1-555-0601",
                "DEPT003", "Content Marketing Specialist", "Employee", "2023-04-01", 75000.0, "Active",
                new Address("987 Creative Way", "San Francisco", "CA", "94110", "USA"),
                new EmergencyContact("Michael Brown", "Brother", "+1-555-0602"));

        addInitialEmployee("EMP007", "Robert", "Taylor", "robert.taylor@ems.com", "+1-555-0701",
                "DEPT001", "DevOps Engineer", "Employee", "2023-03-20", 115000.0, "Active",
                new Address("147 Cloud Drive", "San Francisco", "CA", "94111", "USA"),
                new EmergencyContact("Susan Taylor", "Mother", "+1-555-0702"));

        addInitialEmployee("EMP008", "Amanda", "Martinez", "amanda.martinez@ems.com", "+1-555-0801",
                "DEPT004", "Sales Director", "Manager", "2023-02-25", 125000.0, "Active",
                new Address("258 Sales Plaza", "San Francisco", "CA", "94112", "USA"),
                new EmergencyContact("Carlos Martinez", "Spouse", "+1-555-0802"));

        addInitialEmployee("EMP009", "James", "Anderson", "james.anderson@ems.com", "+1-555-0901",
                "DEPT004", "Sales Executive", "Employee", "2023-05-10", 85000.0, "Active",
                new Address("369 Deal Street", "San Francisco", "CA", "94113", "USA"),
                new EmergencyContact("Linda Anderson", "Wife", "+1-555-0902"));

        addInitialEmployee("EMP010", "Lisa", "Garcia", "lisa.garcia@ems.com", "+1-555-1001",
                "DEPT002", "HR Specialist", "Employee", "2023-04-15", 70000.0, "Active",
                new Address("741 People Avenue", "San Francisco", "CA", "94114", "USA"),
                new EmergencyContact("Juan Garcia", "Father", "+1-555-1002"));

        addInitialEmployee("EMP011", "Christopher", "Lee", "christopher.lee@ems.com", "+1-555-1101",
                "DEPT001", "Frontend Developer", "Employee", "2023-06-01", 98000.0, "Active",
                new Address("852 React Road", "San Francisco", "CA", "94115", "USA"),
                new EmergencyContact("Michelle Lee", "Sister", "+1-555-1102"));

        addInitialEmployee("EMP012", "Patricia", "White", "patricia.white@ems.com", "+1-555-1201",
                "DEPT005", "Finance Manager", "Manager", "2023-03-05", 105000.0, "Active",
                new Address("963 Money Lane", "San Francisco", "CA", "94116", "USA"),
                new EmergencyContact("Richard White", "Husband", "+1-555-1202"));

        addInitialEmployee("EMP013", "Daniel", "Harris", "daniel.harris@ems.com", "+1-555-1301",
                "DEPT005", "Accountant", "Employee", "2023-07-01", 72000.0, "Active",
                new Address("159 Numbers Street", "San Francisco", "CA", "94117", "USA"),
                new EmergencyContact("Karen Harris", "Mother", "+1-555-1302"));

        addInitialEmployee("EMP014", "Jennifer", "Clark", "jennifer.clark@ems.com", "+1-555-1401",
                "DEPT003", "Social Media Manager", "Employee", "2023-05-20", 78000.0, "Active",
                new Address("357 Hashtag Highway", "San Francisco", "CA", "94118", "USA"),
                new EmergencyContact("Steven Clark", "Brother", "+1-555-1402"));

        addInitialEmployee("EMP015", "Matthew", "Lewis", "matthew.lewis@ems.com", "+1-555-1501",
                "DEPT001", "Backend Developer", "Employee", "2023-08-01", 102000.0, "Active",
                new Address("753 API Avenue", "San Francisco", "CA", "94119", "USA"),
                new EmergencyContact("Nancy Lewis", "Wife", "+1-555-1502"));
    }

    private void addInitialEmployee(String id, String firstName, String lastName, String email,
                                   String phone, String department, String position, String role,
                                   String joiningDate, Double salary, String status,
                                   Address address, EmergencyContact emergencyContact) {
        Employee employee = new Employee();
        employee.setId(id);
        employee.setFirstName(firstName);
        employee.setLastName(lastName);
        employee.setEmail(email);
        employee.setPhone(phone);
        employee.setDepartment(department);
        employee.setPosition(position);
        employee.setRole(role);
        employee.setJoiningDate(joiningDate);
        employee.setSalary(salary);
        employee.setStatus(status);
        employee.setAddress(address);
        employee.setEmergencyContact(emergencyContact);
        employee.setAvatar("https://ui-avatars.com/api/?name=" + firstName + "+" + lastName + "&background=random&color=fff");
        employees.put(id, employee);
    }

    public List<Employee> getAllEmployees() {
        return new ArrayList<>(employees.values());
    }

    public Optional<Employee> getEmployeeById(String id) {
        return Optional.ofNullable(employees.get(id));
    }

    public List<Employee> getEmployeesByDepartment(String departmentId) {
        return employees.values().stream()
                .filter(emp -> emp.getDepartment().equals(departmentId))
                .collect(Collectors.toList());
    }

    public List<Employee> getEmployeesByStatus(String status) {
        return employees.values().stream()
                .filter(emp -> emp.getStatus().equals(status))
                .collect(Collectors.toList());
    }

    public List<Employee> searchEmployees(String searchTerm) {
        String term = searchTerm.toLowerCase();
        return employees.values().stream()
                .filter(emp -> 
                    emp.getFirstName().toLowerCase().contains(term) ||
                    emp.getLastName().toLowerCase().contains(term) ||
                    emp.getEmail().toLowerCase().contains(term) ||
                    emp.getId().toLowerCase().contains(term) ||
                    emp.getPosition().toLowerCase().contains(term))
                .collect(Collectors.toList());
    }

    public Employee createEmployee(Employee employee) {
        String id = "EMP" + String.format("%03d", idCounter.getAndIncrement());
        employee.setId(id);
        if (employee.getStatus() == null) {
            employee.setStatus("Active");
        }
        if (employee.getAvatar() == null) {
            employee.setAvatar("https://ui-avatars.com/api/?name=" + 
                employee.getFirstName() + "+" + employee.getLastName() + "&background=random&color=fff");
        }
        employees.put(id, employee);
        return employee;
    }

    public Optional<Employee> updateEmployee(String id, Employee updatedEmployee) {
        if (!employees.containsKey(id)) {
            return Optional.empty();
        }
        updatedEmployee.setId(id);
        employees.put(id, updatedEmployee);
        return Optional.of(updatedEmployee);
    }

    public boolean deleteEmployee(String id) {
        return employees.remove(id) != null;
    }

    public Map<String, Object> getEmployeeStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", employees.size());
        stats.put("active", employees.values().stream().filter(e -> "Active".equals(e.getStatus())).count());
        stats.put("inactive", employees.values().stream().filter(e -> "Inactive".equals(e.getStatus())).count());
        stats.put("onLeave", employees.values().stream().filter(e -> "On Leave".equals(e.getStatus())).count());
        return stats;
    }
}
