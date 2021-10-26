package com.example.capstoneproject.service;

public enum EngineSizeFactor {

    SIZE1000(1.0), SIZE1600(1.6), SIZE2000(2.0), SIZE2500(2.5), SIZE3000(3.0), OTHER(3.5);

    private double factorValue;

    EngineSizeFactor(final double factorValue) {
        this.factorValue = factorValue;
    }

    public double getFactorValue() {
        return factorValue;
    }
}
