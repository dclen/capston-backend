package com.example.capstoneproject.service;

public enum VehicleTypeFactor {

    CABRIOLET(1.3), COUPE(1.4), ESTATE(1.5), HATCHBACK(1.6), OTHER(1.7);

    private double factorValue;

    VehicleTypeFactor(final double factorValue) {
        this.factorValue = factorValue;
    }

    public double getFactorValue() {
        return factorValue;
    }
}
