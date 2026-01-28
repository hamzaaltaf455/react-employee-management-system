package com.ems.dto;

/**
 * Login Response DTO
 * Used for authentication responses
 */
public class LoginResponse {
    private boolean success;
    private String message;
    private UserDTO user;

    // Constructors
    public LoginResponse() {
    }

    public LoginResponse(boolean success, String message, UserDTO user) {
        this.success = success;
        this.message = message;
        this.user = user;
    }

    // Getters and Setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }
}
