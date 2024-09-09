package com.springboot.backend.Service;
import com.springboot.backend.Entity.Grievance;
import com.springboot.backend.Entity.User;
import com.springboot.backend.Repository.GrievanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class GrievanceService {
    @Autowired
    private GrievanceRepository grievanceRepository;

    public Grievance registerGrievance(Grievance grievance) {
        grievance.setStatus("PENDING");
        return grievanceRepository.save(grievance);
    }

    public List<Grievance> getGrievancesByStudent(User student) {
        return grievanceRepository.findByStudent(student);
    }

    public List<Grievance> getGrievancesBySupervisor(User supervisor) {
        return grievanceRepository.findBySupervisor(supervisor);
    }

    public List<Grievance> getAllGrievances() {
        return grievanceRepository.findAll();
    }

    public Grievance assignGrievance(Long grievanceId, User assignee) {
        Grievance grievance = grievanceRepository.findById(grievanceId).orElseThrow();
        grievance.setAssignee(assignee);
        grievance.setStatus("ASSIGNED");
        return grievanceRepository.save(grievance);
    }


    public Grievance resolveGrievance(Long grievanceId) {
        Grievance grievance = grievanceRepository.findById(grievanceId).orElseThrow();
        grievance.setStatus("RESOLVED");
        return grievanceRepository.save(grievance);
    }
}
