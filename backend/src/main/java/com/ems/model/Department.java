package com.ems.model;

/**
 * Department Model
 * Represents a department in the organization
 */
public class Department {
    private String id;
    private String name;
    private String description;
    private String headOfDepartment;
    private Integer employeeCount;
    private String createdAt;
    private String status;

    // Constructors
    public Department() {
    }

    public Department(String id, String name, String description, String headOfDepartment,
                     Integer employeeCount, String createdAt, String status) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.headOfDepartment = headOfDepartment;
        this.employeeCount = employeeCount;
        this.createdAt = createdAt;
        this.status = status;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getHeadOfDepartment() {
        return headOfDepartment;
    }

    public void setHeadOfDepartment(String headOfDepartment) {
        this.headOfDepartment = headOfDepartment;
    }

    public Integer getEmployeeCount() {
        return employeeCount;
    }

    public void setEmployeeCount(Integer employeeCount) {
        this.employeeCount = employeeCount;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
