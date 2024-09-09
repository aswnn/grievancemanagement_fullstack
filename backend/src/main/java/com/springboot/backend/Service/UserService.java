package com.springboot.backend.Service;

import com.springboot.backend.Entity.User;
import com.springboot.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {

        if (user.getRole() == null) {
            user.setRole("STUDENT");
        }
        return userRepository.save(user);
    }
    public User assignRole(Long userId, String role) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setRole(role);
        return userRepository.save(user);
    }

    public Optional<User> loginUser(String username, String password) {
        return userRepository.findByUsername(username)
                .filter(user -> user.getPassword().equals(password));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Update user role
    public Optional<User> updateUserRole(Long id, User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setRole(updatedUser.getRole());
            return userRepository.save(user);
        });
    }

    // Delete user
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true; // Successfully deleted
        }
        return false; // User not found
    }


}
