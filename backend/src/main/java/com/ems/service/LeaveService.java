package com.ems.service;

import com.ems.model.Leave;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

/**
 * Leave Service
 * Manages leave applications in-memory
 */
@Service
public class LeaveService {

    private final Map<String, Leave> leaves = new ConcurrentHashMap<>();
    private final AtomicInteger idCounter = new AtomicInteger(3);

    public LeaveService() {
        initializeData();
    }

    /**
     * Initialize with hardcoded leave data
     */
    private void initializeData() {
        Leave leave1 = new Leave();
        leave1.setId("LEAVE001");
        leave1.setEmployeeId("EMP003");
        leave1.setLeaveType("Casual Leave");
        leave1.setStartDate("2024-12-25");
        leave1.setEndDate("2024-12-27");
        leave1.setDays(3);
        leave1.setReason("Family vacation");
        leave1.setStatus("Approved");
        leave1.setAppliedOn("2024-12-10");
        leave1.setApprovedBy("EMP001");
        leave1.setApprovedOn("2024-12-11");
        leave1.setRejectionReason(null);
        leaves.put(leave1.getId(), leave1);

        Leave leave2 = new Leave();
        leave2.setId("LEAVE002");
        leave2.setEmployeeId("EMP004");
        leave2.setLeaveType("Sick Leave");
        leave2.setStartDate("2024-12-15");
        leave2.setEndDate("2024-12-16");
        leave2.setDays(2);
        leave2.setReason("Medical appointment");
        leave2.setStatus("Pending");
        leave2.setAppliedOn("2024-12-14");
        leave2.setApprovedBy(null);
        leave2.setApprovedOn(null);
        leave2.setRejectionReason(null);
        leaves.put(leave2.getId(), leave2);
    }

    public List<Leave> getAllLeaves() {
        return new ArrayList<>(leaves.values());
    }

    public Optional<Leave> getLeaveById(String id) {
        return Optional.ofNullable(leaves.get(id));
    }

    public List<Leave> getLeavesByEmployee(String employeeId) {
        return leaves.values().stream()
                .filter(leave -> leave.getEmployeeId().equals(employeeId))
                .sorted(Comparator.comparing(Leave::getAppliedOn).reversed())
                .collect(Collectors.toList());
    }

    public List<Leave> getLeavesByStatus(String status) {
        return leaves.values().stream()
                .filter(leave -> leave.getStatus().equals(status))
                .collect(Collectors.toList());
    }

    public List<Leave> getPendingLeaves() {
        return getLeavesByStatus("Pending");
    }

    public Leave applyLeave(Leave leave) {
        String id = "LEAVE" + String.format("%03d", idCounter.getAndIncrement());
        leave.setId(id);
        
        // Calculate days between start and end date
        if (leave.getDays() == null && leave.getStartDate() != null && leave.getEndDate() != null) {
            LocalDate start = LocalDate.parse(leave.getStartDate());
            LocalDate end = LocalDate.parse(leave.getEndDate());
            long days = ChronoUnit.DAYS.between(start, end) + 1;
            leave.setDays((int) days);
        }
        
        leave.setStatus("Pending");
        leave.setAppliedOn(LocalDate.now().toString());
        leave.setApprovedBy(null);
        leave.setApprovedOn(null);
        leave.setRejectionReason(null);
        
        leaves.put(id, leave);
        return leave;
    }

    public Optional<Leave> updateLeave(String id, Leave updatedLeave) {
        if (!leaves.containsKey(id)) {
            return Optional.empty();
        }
        updatedLeave.setId(id);
        leaves.put(id, updatedLeave);
        return Optional.of(updatedLeave);
    }

    public Optional<Leave> approveLeave(String id, String approverId) {
        Leave leave = leaves.get(id);
        if (leave == null) {
            return Optional.empty();
        }
        leave.setStatus("Approved");
        leave.setApprovedBy(approverId);
        leave.setApprovedOn(LocalDate.now().toString());
        return Optional.of(leave);
    }

    public Optional<Leave> rejectLeave(String id, String approverId, String reason) {
        Leave leave = leaves.get(id);
        if (leave == null) {
            return Optional.empty();
        }
        leave.setStatus("Rejected");
        leave.setApprovedBy(approverId);
        leave.setApprovedOn(LocalDate.now().toString());
        leave.setRejectionReason(reason);
        return Optional.of(leave);
    }

    public boolean deleteLeave(String id) {
        return leaves.remove(id) != null;
    }

    public Map<String, Object> getLeaveStats(String employeeId) {
        List<Leave> employeeLeaves = getLeavesByEmployee(employeeId);
        
        long pending = employeeLeaves.stream().filter(l -> "Pending".equals(l.getStatus())).count();
        long approved = employeeLeaves.stream().filter(l -> "Approved".equals(l.getStatus())).count();
        long rejected = employeeLeaves.stream().filter(l -> "Rejected".equals(l.getStatus())).count();
        int totalDays = employeeLeaves.stream()
                .filter(l -> "Approved".equals(l.getStatus()))
                .mapToInt(Leave::getDays)
                .sum();
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", employeeLeaves.size());
        stats.put("pending", pending);
        stats.put("approved", approved);
        stats.put("rejected", rejected);
        stats.put("totalDays", totalDays);
        
        return stats;
    }
}
