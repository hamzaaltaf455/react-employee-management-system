package com.ems.service;

import com.ems.model.Attendance;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * Attendance Service
 * Manages attendance data in-memory
 */
@Service
public class AttendanceService {

    private final Map<String, Attendance> attendanceRecords = new ConcurrentHashMap<>();

    public AttendanceService() {
        initializeData();
    }

    /**
     * Initialize with generated attendance data for the last 30 days
     */
    private void initializeData() {
        String[] employeeIds = {
            "EMP001", "EMP002", "EMP003", "EMP004", "EMP005",
            "EMP006", "EMP007", "EMP008", "EMP009", "EMP010",
            "EMP011", "EMP012", "EMP013", "EMP014", "EMP015"
        };

        LocalDate today = LocalDate.now();
        Random random = new Random(42); // Fixed seed for consistency

        for (int i = 0; i < 30; i++) {
            LocalDate date = today.minusDays(i);
            String dateStr = date.toString();

            for (String empId : employeeIds) {
                boolean isPresent = random.nextDouble() > 0.1; // 90% attendance rate
                String checkInTime = isPresent ? String.format("09:%02d", random.nextInt(30)) : null;
                String checkOutTime = isPresent ? String.format("18:%02d", random.nextInt(30)) : null;
                double workingHours = isPresent ? 9.0 + random.nextDouble() : 0.0;

                Attendance attendance = new Attendance();
                attendance.setId("ATT-" + empId + "-" + dateStr);
                attendance.setEmployeeId(empId);
                attendance.setDate(dateStr);
                attendance.setStatus(isPresent ? "Present" : "Absent");
                attendance.setCheckInTime(checkInTime);
                attendance.setCheckOutTime(checkOutTime);
                attendance.setWorkingHours(Math.round(workingHours * 100.0) / 100.0);
                attendance.setNotes(isPresent ? "" : "Not marked");

                attendanceRecords.put(attendance.getId(), attendance);
            }
        }
    }

    public List<Attendance> getAllAttendance() {
        return new ArrayList<>(attendanceRecords.values());
    }

    public Optional<Attendance> getAttendanceById(String id) {
        return Optional.ofNullable(attendanceRecords.get(id));
    }

    public List<Attendance> getAttendanceByEmployee(String employeeId) {
        return attendanceRecords.values().stream()
                .filter(att -> att.getEmployeeId().equals(employeeId))
                .sorted(Comparator.comparing(Attendance::getDate).reversed())
                .collect(Collectors.toList());
    }

    public List<Attendance> getAttendanceByDate(String date) {
        return attendanceRecords.values().stream()
                .filter(att -> att.getDate().equals(date))
                .collect(Collectors.toList());
    }

    public List<Attendance> getTodaysAttendance() {
        String today = LocalDate.now().toString();
        return getAttendanceByDate(today);
    }

    public Attendance markAttendance(Attendance attendance) {
        String id = "ATT-" + attendance.getEmployeeId() + "-" + attendance.getDate();
        attendance.setId(id);
        
        // If updating existing record, preserve the ID
        Attendance existing = attendanceRecords.get(id);
        if (existing != null) {
            // Update existing record
            attendanceRecords.put(id, attendance);
        } else {
            // Create new record
            attendanceRecords.put(id, attendance);
        }
        return attendance;
    }

    public Map<String, Object> getEmployeeAttendanceStats(String employeeId, Integer days) {
        if (days == null) days = 30;
        
        List<Attendance> records = getAttendanceByEmployee(employeeId)
                .stream()
                .limit(days)
                .collect(Collectors.toList());

        long present = records.stream().filter(att -> "Present".equals(att.getStatus())).count();
        long absent = records.stream().filter(att -> "Absent".equals(att.getStatus())).count();
        long halfDay = records.stream().filter(att -> "Half Day".equals(att.getStatus())).count();
        long late = records.stream().filter(att -> "Late".equals(att.getStatus())).count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("total", records.size());
        stats.put("present", present);
        stats.put("absent", absent);
        stats.put("halfDay", halfDay);
        stats.put("late", late);
        stats.put("attendanceRate", records.isEmpty() ? 0.0 : 
            Math.round((present * 100.0 / records.size()) * 10.0) / 10.0);
        
        return stats;
    }

    public Map<String, Object> getDateAttendanceStats(String date) {
        List<Attendance> records = getAttendanceByDate(date);

        long present = records.stream().filter(att -> "Present".equals(att.getStatus())).count();
        long absent = records.stream().filter(att -> "Absent".equals(att.getStatus())).count();
        long halfDay = records.stream().filter(att -> "Half Day".equals(att.getStatus())).count();
        long late = records.stream().filter(att -> "Late".equals(att.getStatus())).count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("total", records.size());
        stats.put("present", present);
        stats.put("absent", absent);
        stats.put("halfDay", halfDay);
        stats.put("late", late);
        
        return stats;
    }

    public boolean deleteAttendance(String id) {
        return attendanceRecords.remove(id) != null;
    }
}
