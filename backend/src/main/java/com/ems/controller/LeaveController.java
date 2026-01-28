package com.ems.controller;

import com.ems.model.Leave;
import com.ems.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Leave Controller
 * Handles all leave management endpoints
 */
@RestController
@RequestMapping("/leaves")
@CrossOrigin(origins = "*")
public class LeaveController {

    @Autowired
    private LeaveService leaveService;

    /**
     * Get all leaves
     * GET /api/leaves
     */
    @GetMapping
    public ResponseEntity<List<Leave>> getAllLeaves() {
        return ResponseEntity.ok(leaveService.getAllLeaves());
    }

    /**
     * Get leave by ID
     * GET /api/leaves/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Leave> getLeaveById(@PathVariable String id) {
        return leaveService.getLeaveById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Get leaves by employee
     * GET /api/leaves/employee/{employeeId}
     */
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Leave>> getLeavesByEmployee(@PathVariable String employeeId) {
        return ResponseEntity.ok(leaveService.getLeavesByEmployee(employeeId));
    }

    /**
     * Get leaves by status
     * GET /api/leaves/status/{status}
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Leave>> getLeavesByStatus(@PathVariable String status) {
        return ResponseEntity.ok(leaveService.getLeavesByStatus(status));
    }

    /**
     * Get pending leaves
     * GET /api/leaves/pending
     */
    @GetMapping("/pending")
    public ResponseEntity<List<Leave>> getPendingLeaves() {
        return ResponseEntity.ok(leaveService.getPendingLeaves());
    }

    /**
     * Get leave statistics for employee
     * GET /api/leaves/employee/{employeeId}/stats
     */
    @GetMapping("/employee/{employeeId}/stats")
    public ResponseEntity<Map<String, Object>> getLeaveStats(@PathVariable String employeeId) {
        return ResponseEntity.ok(leaveService.getLeaveStats(employeeId));
    }

    /**
     * Apply for leave
     * POST /api/leaves
     */
    @PostMapping
    public ResponseEntity<Leave> applyLeave(@RequestBody Leave leave) {
        Leave created = leaveService.applyLeave(leave);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * Update leave
     * PUT /api/leaves/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<Leave> updateLeave(@PathVariable String id, @RequestBody Leave leave) {
        return leaveService.updateLeave(id, leave)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Approve leave
     * POST /api/leaves/{id}/approve
     */
    @PostMapping("/{id}/approve")
    public ResponseEntity<Leave> approveLeave(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        String approverId = body.get("approverId");
        if (approverId == null) {
            return ResponseEntity.badRequest().build();
        }
        return leaveService.approveLeave(id, approverId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Reject leave
     * POST /api/leaves/{id}/reject
     */
    @PostMapping("/{id}/reject")
    public ResponseEntity<Leave> rejectLeave(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        String approverId = body.get("approverId");
        String reason = body.getOrDefault("reason", "");
        if (approverId == null) {
            return ResponseEntity.badRequest().build();
        }
        return leaveService.rejectLeave(id, approverId, reason)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Delete/Cancel leave
     * DELETE /api/leaves/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLeave(@PathVariable String id) {
        if (leaveService.deleteLeave(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
