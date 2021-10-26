package com.example.capstoneproject;

import com.example.capstoneproject.service.EngineSizeFactor;
import com.example.capstoneproject.service.VehicleTypeFactor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CapstoneprojectApplication {

    public static void main(String[] args) {

        SpringApplication.run(CapstoneprojectApplication.class, args);

        System.out.println(EngineSizeFactor.SIZE1000.getFactorValue());
    }



}
