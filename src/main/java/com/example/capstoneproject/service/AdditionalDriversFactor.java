package com.example.capstoneproject.service;

public enum AdditionalDriversFactor {
    LESSTHAN2(1.1), GREATERTHANOREQUALTO2(1.2);


    private double factorValue;

    public double getFactorValue() {
        return factorValue;
    }

    AdditionalDriversFactor(double factorValue) {
        this.factorValue = factorValue;
    }
}
