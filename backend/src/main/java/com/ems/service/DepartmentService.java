package com.ems.service;

import com.ems.model.Department;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Department Service
 * Manages department data in-memory
 */
@Service
public class DepartmentService {

    private final Map<String, Department> departments = new ConcurrentHashMap<>();
    private final AtomicInteger idCounter = new AtomicInteger(6);

    public DepartmentService() {
        initializeData();
    }

    /**
     * Initialize with hardcoded data matching the React frontend
     */
    private void initializeData() {
        addDepartment("DEPT001", "Engineering", "Software development and technical operations",
                "EMP001", 15, "2023-01-15", "Active");
        
        addDepartment("DEPT002", "Human Resources", "Employee relations and recruitment",
                "EMP002", 5, "2023-01-15", "Active");
        
        addDepartment("DEPT003", "Marketing", "Brand management and digital marketing",
                "EMP005", 8, "2023-02-01", "Active");
        
        addDepartment("DEPT004", "Sales", "Business development and customer relations",
                "EMP008", 12, "2023-02-15", "Active");
        
        addDepartment("DEPT005", "Finance", "Financial planning and accounting",
                "EMP012", 6, "2023-03-01", "Active");
    }

    private void addDepartment(String id, String name, String description, String headOfDepartment,
                              Integer employeeCount, String createdAt, String status) {
        Department dept = new Department();
        dept.setId(id);
        dept.setName(name);
        dept.setDescription(description);
        dept.setHeadOfDepartment(headOfDepartment);
        dept.setEmployeeCount(employeeCount);
        dept.setCreatedAt(createdAt);
        dept.setStatus(status);
        departments.put(id, dept);
    }

    public List<Department> getAllDepartments() {
        return new ArrayList<>(departments.values());
    }

    public Optional<Department> getDepartmentById(String id) {
        return Optional.ofNullable(departments.get(id));
    }

    public Optional<Department> getDepartmentByName(String name) {
        return departments.values().stream()
                .filter(dept -> dept.getName().equalsIgnoreCase(name))
                .findFirst();
    }

    public Department createDepartment(Department department) {
        String id = "DEPT" + String.format("%03d", idCounter.getAndIncrement());
        department.setId(id);
        if (department.getEmployeeCount() == null) {
            department.setEmployeeCount(0);
        }
        if (department.getCreatedAt() == null) {
            department.setCreatedAt(java.time.LocalDate.now().toString());
        }
        if (department.getStatus() == null) {
            department.setStatus("Active");
        }
        departments.put(id, department);
        return department;
    }

    public Optional<Department> updateDepartment(String id, Department updatedDepartment) {
        if (!departments.containsKey(id)) {
            return Optional.empty();
        }
        updatedDepartment.setId(id);
        departments.put(id, updatedDepartment);
        return Optional.of(updatedDepartment);
    }

    public boolean deleteDepartment(String id) {
        return departments.remove(id) != null;
    }

    public Optional<Department> updateEmployeeCount(String id, Integer count) {
        Department dept = departments.get(id);
        if (dept == null) {
            return Optional.empty();
        }
        dept.setEmployeeCount(count);
        return Optional.of(dept);
    }
}
