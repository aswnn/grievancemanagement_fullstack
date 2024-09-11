package com.springboot.backend.Service;

import com.springboot.backend.Entity.User;
import com.springboot.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = Logger.getLogger(UserService.class.getName());

    // Register user with default role 'STUDENT' if role is not set
    public User registerUser(User user) {
        if (user.getRole() == null) {
            user.setRole("STUDENT");
        }
        logger.info("Registering user: " + user.getUsername() + " with role: " + user.getRole());
        return userRepository.save(user);
    }

    // Assign role to a user
    public User assignRole(Long userId, String role) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setRole(role);
        logger.info("Assigned role: " + role + " to user: " + user.getUsername());
        return userRepository.save(user);
    }

    // Login user and verify password
    public Optional<User> loginUser(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username)
                .filter(user -> user.getPassword().equals(password));
        userOptional.ifPresent(user -> logger.info("User logged in: " + username + " with role: " + user.getRole()));
        return userOptional;
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Update user role
    public Optional<User> updateUserRole(Long id, User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setRole(updatedUser.getRole());
            logger.info("Updated role for user: " + user.getUsername() + " to " + user.getRole());
            return userRepository.save(user);
        });
    }

    // Delete user
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            logger.info("Deleted user with ID: " + id);
            return true; // Successfully deleted
        }
        return false; // User not found
    }
}
