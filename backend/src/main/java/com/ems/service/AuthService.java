package com.ems.service;

import com.ems.dto.LoginRequest;
import com.ems.dto.LoginResponse;
import com.ems.dto.UserDTO;
import com.ems.model.User;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Authentication Service
 * Manages user authentication in-memory
 */
@Service
public class AuthService {

    private final Map<Integer, User> users = new ConcurrentHashMap<>();

    public AuthService() {
        initializeData();
    }

    /**
     * Initialize with hardcoded users matching the React frontend
     */
    private void initializeData() {
        addUser(1, "admin@ems.com", "admin123", "Admin", "John Admin", "EMP001");
        addUser(2, "manager@ems.com", "manager123", "Manager", "Sarah Manager", "EMP002");
        addUser(3, "employee@ems.com", "employee123", "Employee", "Mike Employee", "EMP003");
    }

    private void addUser(Integer id, String email, String password, String role, 
                        String name, String employeeId) {
        User user = new User();
        user.setId(id);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role);
        user.setName(name);
        user.setEmployeeId(employeeId);
        user.setAvatar("https://ui-avatars.com/api/?name=" + 
            name.replace(" ", "+") + "&background=random&color=fff");
        users.put(id, user);
    }

    public LoginResponse login(LoginRequest request) {
        Optional<User> userOpt = users.values().stream()
                .filter(u -> u.getEmail().equals(request.getEmail()) && 
                           u.getPassword().equals(request.getPassword()))
                .findFirst();

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            UserDTO userDTO = new UserDTO(
                user.getId(),
                user.getEmail(),
                user.getRole(),
                user.getName(),
                user.getEmployeeId(),
                user.getAvatar()
            );
            return new LoginResponse(true, "Login successful", userDTO);
        }

        return new LoginResponse(false, "Invalid credentials", null);
    }

    public Optional<UserDTO> getUserById(Integer id) {
        User user = users.get(id);
        if (user == null) {
            return Optional.empty();
        }
        UserDTO userDTO = new UserDTO(
            user.getId(),
            user.getEmail(),
            user.getRole(),
            user.getName(),
            user.getEmployeeId(),
            user.getAvatar()
        );
        return Optional.of(userDTO);
    }
}
