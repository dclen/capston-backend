package com.example.capstoneproject.controller;

import com.example.capstoneproject.model.User;
import com.example.capstoneproject.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
public class UserController {

    public static final String ID_NOT_FOUND_ERROR_MSG = "Person Not Found, id: ";

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
    User getUser(@PathVariable Long id) {
        return service.getUser(id);
    }


    @PostMapping("/capstone")
    @CrossOrigin(origins = "http://localhost:3000")
    User save(@RequestBody User user) {
        return service.save(user);
    }

    @PutMapping("/capstone/updatephone/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    User update(@PathVariable Long id, @RequestBody User user) {
        User userToUpdate;
        try {
            userToUpdate = service.getUser(id);
        } catch (NoSuchElementException nse) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, ID_NOT_FOUND_ERROR_MSG + id, nse);
        }
        userToUpdate.setTelephoneNumber(user.getTelephoneNumber());

        return service.save(userToUpdate);
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
