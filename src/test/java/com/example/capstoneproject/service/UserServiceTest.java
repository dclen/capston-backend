package com.example.capstoneproject.service;

import com.example.capstoneproject.model.User;
import com.example.capstoneproject.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.ByteArrayOutputStream;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private UserService userService;
    private final ByteArrayOutputStream out = new ByteArrayOutputStream();

    User user = new User();

    @BeforeEach
    void setUp() {
    }

    @Test
    void calculateQuote() {
        user.setAdditionalDrivers("3");
        user.setEngineSize("1000");
        user.setCurrentValue(5000L);
        user.setVehicleType("Coupe");
        user.setCommercialPurpose(true);
        user.setOutsideRegisteredState(true);

        double expectedResult = 203.28;
        double actualResult = userService.calculateQuote(user);

        assertEquals(expectedResult,actualResult);

    }
}