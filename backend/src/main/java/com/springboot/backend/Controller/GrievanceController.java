package com.springboot.backend.Controller;
import com.springboot.backend.Entity.Grievance;
import com.springboot.backend.Entity.User;
import com.springboot.backend.Service.GrievanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/grievances")
public class GrievanceController {
    @Autowired
    private GrievanceService grievanceService;

    @PostMapping("/register")
    public ResponseEntity<Grievance> registerGrievance(@RequestBody Grievance grievance) {
        return ResponseEntity.ok(grievanceService.registerGrievance(grievance));
    }

    @GetMapping
    public List<Grievance> getAllGrievances() {
        return grievanceService.getAllGrievances();
    }

    @PostMapping("/assign/{grievanceId}")
    public ResponseEntity<Grievance> assignGrievance(@PathVariable Long grievanceId, @RequestBody User assignee) {
        return ResponseEntity.ok(grievanceService.assignGrievance(grievanceId, assignee));
    }

    @PostMapping("/resolve/{grievanceId}")
    public ResponseEntity<Grievance> resolveGrievance(@PathVariable Long grievanceId) {
        return ResponseEntity.ok(grievanceService.resolveGrievance(grievanceId));
    }
}
