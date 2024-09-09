package com.springboot.backend.Controller;

import com.springboot.backend.Entity.User;
import com.springboot.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")  // Allow CORS from React app
public class UserController {

    @Autowired
    private UserService userService;

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }

    //Assigning role
    @PutMapping("/assign-role/{userId}")
    public ResponseEntity<User> assignRole(@PathVariable Long userId, @RequestParam String role) {
        User updatedUser = userService.assignRole(userId, role);
        return ResponseEntity.ok(updatedUser);
    }


    // Login a user
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestParam String username, @RequestParam String password) {
        return userService.loginUser(username, password)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build());
    }

    // Fetch all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();  // Assuming this service method exists
        return ResponseEntity.ok(users);
    }

    // Update user role
    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUserRole(@PathVariable Long id, @RequestBody User updatedUser) {
        return userService.updateUserRole(id, updatedUser)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete user
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}
