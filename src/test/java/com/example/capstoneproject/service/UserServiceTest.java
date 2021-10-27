package com.example.capstoneproject.service;

import com.example.capstoneproject.model.User;
import com.example.capstoneproject.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import static org.junit.jupiter.api.Assertions.*;

class UserServiceTest {

    @BeforeEach
    void setUp() {


@Mock
UserRepository userRepository;

        User user = new User();
        user.setAdditionalDrivers("3");
        user.setEngineSize("1000");
        user.setCurrentValue(5000L);
        user.setVehicleType("coupe");
        user.setCommercialPurpose(true);
        user.setOutsideRegisteredState(true);
    }

    @Test
    void calculateQuote() {
    }
}