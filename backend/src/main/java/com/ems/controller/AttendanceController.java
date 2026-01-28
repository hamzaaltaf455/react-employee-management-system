package com.ems.controller;

import com.ems.model.Attendance;
import com.ems.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Attendance Controller
 * Handles all attendance-related endpoints
 */
@RestController
@RequestMapping("/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    /**
     * Get all attendance records
     * GET /api/attendance
     */
    @GetMapping
    public ResponseEntity<List<Attendance>> getAllAttendance() {
        return ResponseEntity.ok(attendanceService.getAllAttendance());
    }

    /**
     * Get attendance by ID
     * GET /api/attendance/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Attendance> getAttendanceById(@PathVariable String id) {
        return attendanceService.getAttendanceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Get attendance by employee
     * GET /api/attendance/employee/{employeeId}
     */
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Attendance>> getAttendanceByEmployee(@PathVariable String employeeId) {
        return ResponseEntity.ok(attendanceService.getAttendanceByEmployee(employeeId));
    }

    /**
     * Get attendance by date
     * GET /api/attendance/date/{date}
     */
    @GetMapping("/date/{date}")
    public ResponseEntity<List<Attendance>> getAttendanceByDate(@PathVariable String date) {
        return ResponseEntity.ok(attendanceService.getAttendanceByDate(date));
    }

    /**
     * Get today's attendance
     * GET /api/attendance/today
     */
    @GetMapping("/today")
    public ResponseEntity<List<Attendance>> getTodaysAttendance() {
        return ResponseEntity.ok(attendanceService.getTodaysAttendance());
    }

    /**
     * Get employee attendance statistics
     * GET /api/attendance/employee/{employeeId}/stats?days={days}
     */
    @GetMapping("/employee/{employeeId}/stats")
    public ResponseEntity<Map<String, Object>> getEmployeeAttendanceStats(
            @PathVariable String employeeId,
            @RequestParam(required = false) Integer days) {
        return ResponseEntity.ok(attendanceService.getEmployeeAttendanceStats(employeeId, days));
    }

    /**
     * Get date attendance statistics
     * GET /api/attendance/date/{date}/stats
     */
    @GetMapping("/date/{date}/stats")
    public ResponseEntity<Map<String, Object>> getDateAttendanceStats(@PathVariable String date) {
        return ResponseEntity.ok(attendanceService.getDateAttendanceStats(date));
    }

    /**
     * Mark attendance
     * POST /api/attendance
     */
    @PostMapping
    public ResponseEntity<Attendance> markAttendance(@RequestBody Attendance attendance) {
        Attendance marked = attendanceService.markAttendance(attendance);
        return ResponseEntity.status(HttpStatus.CREATED).body(marked);
    }

    /**
     * Update attendance
     * PUT /api/attendance/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<Attendance> updateAttendance(@PathVariable String id, @RequestBody Attendance attendance) {
        attendance.setId(id);
        Attendance updated = attendanceService.markAttendance(attendance);
        return ResponseEntity.ok(updated);
    }

    /**
     * Delete attendance
     * DELETE /api/attendance/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttendance(@PathVariable String id) {
        if (attendanceService.deleteAttendance(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
