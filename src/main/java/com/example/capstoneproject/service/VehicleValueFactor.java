package com.example.capstoneproject.service;

public enum VehicleValueFactor {
    LESSTHAN5000OREQUALTO5000(1.0), GREATERTHAN5000(1.2) ;


    private double vehicleValue;

    public double getFactorValue() {
        return vehicleValue;
    }

    VehicleValueFactor(double vehicleValue) {
        this.vehicleValue = vehicleValue;
    }
}
