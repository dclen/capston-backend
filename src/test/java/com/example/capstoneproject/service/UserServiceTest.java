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

    @Test
    void whenVehicleTypeIsCabrioletReturn_1_3() {
        user.setVehicleType("Cabriolet");

        double expectedResult = 1.3;
        double actualResult = userService.calculateVehicleTypeFactor(user);

        assertEquals(expectedResult,actualResult);
    }


    @Test
    void whenVehicleTypeIsCoupeReturn_1_3() {
        user.setVehicleType("Coupe");

        double expectedResult = 1.4;
        double actualResult = userService.calculateVehicleTypeFactor(user);

        assertEquals(expectedResult,actualResult);
    }

    @Test
    void whenVehicleTypeIsEstateReturn_1_5() {
        user.setVehicleType("Estate");

        double expectedResult = 1.5;
        double actualResult = userService.calculateVehicleTypeFactor(user);

        assertEquals(expectedResult,actualResult);
    }

    @Test
    void whenVehicleTypeIsHatchbackReturn_1_6() {
        user.setVehicleType("Hatchback");

        double expectedResult = 1.6;
        double actualResult = userService.calculateVehicleTypeFactor(user);

        assertEquals(expectedResult,actualResult);
    }

    @Test
    void whenVehicleTypeIsOtherReturn_1_7() {
        user.setVehicleType("Other");

        double expectedResult = 1.7;
        double actualResult = userService.calculateVehicleTypeFactor(user);

        assertEquals(expectedResult,actualResult);
    }

    @Test
    void whenEngineSizeIs1000Return_1() {
        user.setEngineSize("1000");

        double expectedResult = 1;
        double actualResult = userService.calculateEngineSizeFactor(user);

        assertEquals(expectedResult,actualResult);
    }

    @Test
    void whenEngineSizeIs1600Return_1_6() {
        user.setEngineSize("1600");

        double expectedResult = 1.6;
        double actualResult = userService.calculateEngineSizeFactor(user);

        assertEquals(expectedResult,actualResult);
    }

    @Test
    void whenEngineSizeIs2000Return_2() {
        user.setEngineSize("2000");

        double expectedResult = 2;
        double actualResult = userService.calculateEngineSizeFactor(user);

        assertEquals(expectedResult,actualResult);
    }

    @Test
    void whenEngineSizeIs2500Return_2_5() {
        user.setEngineSize("2500");

        double expectedResult = 2.5;
        double actualResult = userService.calculateEngineSizeFactor(user);

        assertEquals(expectedResult,actualResult);
    }

    @Test
    void whenEngineSizeIs3000Return_3() {
        user.setEngineSize("3000");

        double expectedResult = 3;
        double actualResult = userService.calculateEngineSizeFactor(user);

        assertEquals(expectedResult,actualResult);
    }

    @Test
    void whenEngineSizeIsOtherReturn_3_5() {
        user.setEngineSize("Other");

        double expectedResult = 3.5;
        double actualResult = userService.calculateEngineSizeFactor(user);

        assertEquals(expectedResult,actualResult);
    }

    @Test
    void whenVehicleValueIsEqualTo5000Return_1() {
        user.setCurrentValue(5000);

        double expectedResult = 1;
        double actualResult = userService.calculateVehicleValueFactor(user);

        assertEquals(expectedResult,actualResult);
    }

    @Test
    void whenVehicleValueIsLessThan5000Return_1() {
        user.setCurrentValue(4999);

        double expectedResult = 1;
        double actualResult = userService.calculateVehicleValueFactor(user);

        assertEquals(expectedResult,actualResult);
    }

    @Test
    void whenVehicleValueIsGreaterThan5000Return_1_2() {
        user.setCurrentValue(5001);

        double expectedResult = 1.2;
        double actualResult = userService.calculateVehicleValueFactor(user);

        assertEquals(expectedResult,actualResult);
    }

    @Test
    void whenAdditionalDriversIsEqualTo2Return_1_2() {
        user.setAdditionalDrivers("2");

        double expectedResult = 1.2;
        double actualResult = userService.calculateAdditionalDriversFactor(user);

        assertEquals(expectedResult,actualResult);
    }

    @Test
    void whenAdditionalDriversIsLessThan2Return_1_1() {
        user.setAdditionalDrivers("1");

        double expectedResult = 1.1;
        double actualResult = userService.calculateAdditionalDriversFactor(user);

        assertEquals(expectedResult,actualResult);
    }

    @Test
    void whenAdditionalDriversIsGreaterThan2Return_1_2() {
        user.setAdditionalDrivers("3");

        double expectedResult = 1.2;
        double actualResult = userService.calculateAdditionalDriversFactor(user);

        assertEquals(expectedResult,actualResult);
    }

    @Test
    void whenUsedForCommercialIsTrueReturn_1_1() {
        user.setUsedForCommercial(true);

        double expectedResult = 1.1;
        double actualResult = userService.calculateCommercialUseFactor(user);

        assertEquals(expectedResult,actualResult);
    }

    @Test
    void whenUsedForCommercialIsFalseReturn_1() {
        user.setUsedForCommercial(false);

        double expectedResult = 1;
        double actualResult = userService.calculateCommercialUseFactor(user);

        assertEquals(expectedResult,actualResult);
    }

    @Test
    void whenUsedOutsideStateReturn_1_1() {
        user.setUsedOutsideState(true);

        double expectedResult = 1.1;
        double actualResult = userService.calculateOutsideStateUseFactor(user);

        assertEquals(expectedResult,actualResult);
    }

    @Test
    void whenUsedOutsideStateReturn_1() {
        user.setUsedOutsideState(false);

        double expectedResult = 1;
        double actualResult = userService.calculateOutsideStateUseFactor(user);

        assertEquals(expectedResult,actualResult);
    }








}