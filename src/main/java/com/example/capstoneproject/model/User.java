package com.example.capstoneproject.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String prefix;
    private String firstName;
    private String lastName;
    private String telephoneNumber;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String postcode;
    private String vehicleType;
    private String engineSize;
    private String additionalDrivers;
    private Boolean usedForCommercial;
    private Boolean usedOutsideState;
    private double currentValue;
    private String dateRegistered;

}
