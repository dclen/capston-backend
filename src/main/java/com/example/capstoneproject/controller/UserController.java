package com.example.capstoneproject.controller;

import com.example.capstoneproject.model.User;
import com.example.capstoneproject.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/capstone")
    @CrossOrigin(origins = "http://localhost:3000")
    List<User> getAll() {
        return service.getAll();
    }

    @GetMapping("/capstone/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    Optional<User> getUser(@PathVariable Long id) {
        return service.getUser(id);
    }


    @PostMapping("/capstone")
    User save(@RequestBody User user) {
        return service.save(user);
    }

    @GetMapping("/capstone/calculatequote")
    @CrossOrigin(origins = "http://localhost:3000")
    double calculate(@RequestParam String additionalDrivers, @RequestParam String engineSize, @RequestParam double currentValue, @RequestParam String vehicleType, @RequestParam Boolean usedForCommercial, @RequestParam Boolean usedOutsideState) {

        User user = new User();
        user.setAdditionalDrivers(additionalDrivers);
        user.setEngineSize(engineSize);
        user.setCurrentValue(currentValue);
        user.setVehicleType(vehicleType);
        user.setUsedForCommercial(usedForCommercial);
        user.setUsedOutsideState(usedOutsideState);

        return service.calculateQuote(user);

    }

}
