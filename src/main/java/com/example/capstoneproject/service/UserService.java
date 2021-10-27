package com.example.capstoneproject.service;

import com.example.capstoneproject.model.User;
import com.example.capstoneproject.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

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



        double totalQuote = 100*calculateVehicleTypeFactor(user)*calculateEngineSizeFactor(user)
                                *AdditionalDriversFactor.GREATERTHANOREQUALTO2.getFactorValue()
                                *CommercialUseFactor.YES.getFactorValue()
                                *OutsideStateUseFactor.YES.getFactorValue()
                                *VehicleValueFactor.LESSTHAN5000OREQUALTO5000.getFactorValue();



        totalQuote = Math.round(totalQuote*100.0)/100.0;

        return totalQuote;

    }

    private double calculateVehicleTypeFactor(User user){

        double vehicleTypeFactor = 0;

        String vehicleType = user.getVehicleType().toLowerCase(Locale.ROOT);

        switch (vehicleType){
            case "cabriolet":
                vehicleTypeFactor = VehicleTypeFactor.CABRIOLET.getFactorValue();
                break;
            case "coupe":
                vehicleTypeFactor = VehicleTypeFactor.COUPE.getFactorValue();
                break;
            case "estate":
                vehicleTypeFactor = VehicleTypeFactor.ESTATE.getFactorValue();
                break;
            case "hatchback":
                vehicleTypeFactor = VehicleTypeFactor.HATCHBACK.getFactorValue();
                break;
            case "other":
                vehicleTypeFactor = VehicleTypeFactor.OTHER.getFactorValue();
                break;
        }

        return vehicleTypeFactor;
    }

    private double calculateEngineSizeFactor(User user){
        String engineType = user.getEngineSize().toLowerCase(Locale.ROOT);

        double engineTypeFactor = 0;

        switch (engineType){
            case "1000":
                engineTypeFactor = EngineSizeFactor.SIZE1000.getFactorValue();
                break;
            case "1600":
                engineTypeFactor = EngineSizeFactor.SIZE1600.getFactorValue();
                break;
            case "2000":
                engineTypeFactor = EngineSizeFactor.SIZE2000.getFactorValue();
                break;
            case "2500":
                engineTypeFactor = EngineSizeFactor.SIZE2500.getFactorValue();
                break;
            case "3000":
                engineTypeFactor = EngineSizeFactor.SIZE3000.getFactorValue();
                break;
            case "other":
                engineTypeFactor = EngineSizeFactor.OTHER.getFactorValue();
        }

        return engineTypeFactor;
    }
}
