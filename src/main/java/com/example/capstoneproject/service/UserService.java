package com.example.capstoneproject.service;

import com.example.capstoneproject.model.User;
import com.example.capstoneproject.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public double calculateQuote(User user){



        double totalQuote = 100*VehicleTypeFactor.COUPE.getFactorValue()*EngineSizeFactor.SIZE1000.getFactorValue()
                                *AdditionalDriversFactor.GREATERTHANOREQUALTO2.getFactorValue()
                                *CommercialUseFactor.YES.getFactorValue()
                                *OutsideStateUseFactor.YES.getFactorValue()
                                *VehicleValueFactor.LESSTHAN5000OREQUALTO5000.getFactorValue();



        totalQuote = Math.round(totalQuote*100.0)/100.0;

        return totalQuote;

    }

    private double calculateVehicleTypeFactor(User user){

        double vehicleTypeFactor = 0;

        String vehicleType = user.getVehicleType();



        return vehicleTypeFactor;
    }
}
