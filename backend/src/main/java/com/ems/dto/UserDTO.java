package com.ems.dto;

/**
 * User DTO (without password)
 * Used for returning user data without sensitive information
 */
public class UserDTO {
    private Integer id;
    private String email;
    private String role;
    private String name;
    private String employeeId;
    private String avatar;

    // Constructors
    public UserDTO() {
    }

    public UserDTO(Integer id, String email, String role, String name, String employeeId, String avatar) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.name = name;
        this.employeeId = employeeId;
        this.avatar = avatar;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
