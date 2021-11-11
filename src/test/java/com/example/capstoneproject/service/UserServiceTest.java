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

    User user = new User();

    @BeforeEach
    void setUp() {
    }

    @Test
    void calculateCorrectQuoteValueOf_203_28() {
        user.setVehicleType("Coupe");
        user.setEngineSize("1000");
        user.setAdditionalDrivers("3");
        user.setUsedForCommercial(true);
        user.setUsedOutsideState(true);
        user.setCurrentValue(5000);

        double expectedResult = 203.28;
        double actualResult = userService.calculateQuote(user);

        assertEquals(expectedResult,actualResult);

    }

    @Test
    void calculateCorrectQuoteValueOf_371_71() {
        user.setVehicleType("Hatchback");
        user.setEngineSize("1600");
        user.setAdditionalDrivers("2");
        user.setUsedForCommercial(true);
        user.setUsedOutsideState(true);
        user.setCurrentValue(5000);

        double expectedResult = 371.71;
        double actualResult = userService.calculateQuote(user);

        assertEquals(expectedResult,actualResult);

    }

    @Test
    void calculateCorrectQuoteValueOf_514_80() {
        user.setVehicleType("Cabriolet");
        user.setEngineSize("3000");
        user.setAdditionalDrivers("0");
        user.setUsedForCommercial(false);
        user.setUsedOutsideState(false);
        user.setCurrentValue(15000);

        double expectedResult = 514.80;
        double actualResult = userService.calculateQuote(user);

        assertEquals(expectedResult,actualResult);

    }

}