package com.springboot.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.springboot.backend.Entity.User;
import com.springboot.backend.Entity.Grievance;


public interface GrievanceRepository extends JpaRepository<Grievance, Long> {
    List<Grievance> findByStudent(User student);
    List<Grievance> findBySupervisor(User supervisor);
    List<Grievance> findByAssignee(User assignee);
}

