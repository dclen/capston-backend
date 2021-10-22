package com.example.capstoneproject.controller;

import com.example.capstoneproject.model.User;
import com.example.capstoneproject.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/capstone")
    List<User> getAll() {
        return service.getAll();
    }

    @PostMapping("/capstone")
    User save(@RequestBody User user) {
        return service.save(user);
    }
}
