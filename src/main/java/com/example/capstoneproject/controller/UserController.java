package com.example.capstoneproject.controller;

import com.example.capstoneproject.model.User;
import com.example.capstoneproject.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping("/capstone")
    User save(@RequestBody User user) {
        return service.save(user);
    }
}
