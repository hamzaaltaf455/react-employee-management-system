package com.ems.model;

/**
 * Emergency Contact Model
 * Represents the emergency contact information of an employee
 */
public class EmergencyContact {
    private String name;
    private String relationship;
    private String phone;

    // Constructors
    public EmergencyContact() {
    }

    public EmergencyContact(String name, String relationship, String phone) {
        this.name = name;
        this.relationship = relationship;
        this.phone = phone;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRelationship() {
        return relationship;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
