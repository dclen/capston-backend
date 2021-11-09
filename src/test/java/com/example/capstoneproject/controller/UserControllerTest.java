package com.example.capstoneproject.controller;

import com.example.capstoneproject.model.User;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("GET /capstone -> HTTP 200")
    void getAllGet200() throws Exception {
        mockMvc
                .perform(get("/capstone"))
                .andExpect(status().is(200));
    }

    @Test
    void getNonExistingEndpoint404() throws Exception {
        mockMvc
                .perform(get("/nonexistinendpoint"))
                .andExpect(status().is(404));
    }

    @Test
    void given3UsersInDB_whenGETUsers_thenHTTP200AndListSize3() throws Exception {
        final var mvcResult = mockMvc
                .perform(get("/capstone"))
                .andDo(print())
                .andExpect(status().is(200))
                .andReturn();

        // get JSON from the response
        final var usersFromDbInJSONFormat = mvcResult.getResponse().getContentAsString();
        // map JSON -> Java
        List<User> usersFromDB = objectMapper.readValue(usersFromDbInJSONFormat, new TypeReference<>() {
        });

        assertEquals(3, usersFromDB.size());

    }

    @Test
    @DirtiesContext
    void givenFullSpringContextWithDbInitialized_whenPOSTUsersWithJSON_thenHTTP200AndUserWithId() throws Exception {


        var prefix = "Mr";
        var firstName = "Adam";
        var lastName = "Stewart";
        var telephoneNumber = "48321366";
        var addressLine1 = "addressLine1";
        var addressLine2 = "addressLine2";
        var city = "belfast";
        var postcode = "bt3 17tt";
        var vehicleType = "Hatchback";
        var engineSize = "engineSize";
        var additionalDrivers = "1";
        var commercialPurpose = true;
        var outsideRegisteredState = true;
        var currentValue = 10000L;
        var dateRegistered = "10/10/2021";


        var user = new User(null, prefix, firstName, lastName, telephoneNumber, addressLine1, addressLine2, city, postcode, vehicleType, engineSize, additionalDrivers, commercialPurpose, outsideRegisteredState, currentValue, dateRegistered);
        var userAsString = objectMapper.writeValueAsString(user);

        final var mvcResult = mockMvc
                .perform(
                        post("/capstone")
                                .content(userAsString)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().is(200))
                .andReturn();

        final var userFromDbAsJson = mvcResult.getResponse().getContentAsString();

        User userFromDB = objectMapper.readValue(userFromDbAsJson, User.class);

        assertAll(
                () -> assertNotNull(userFromDB.getId()),
                () -> assertEquals(firstName, userFromDB.getFirstName()),
                () -> assertEquals(lastName, userFromDB.getLastName()),
                () -> assertEquals(prefix, userFromDB.getPrefix()),
                () -> assertEquals(telephoneNumber, userFromDB.getTelephoneNumber()),
                () -> assertEquals(addressLine1, userFromDB.getAddressLine1()),
                () -> assertEquals(addressLine2, userFromDB.getAddressLine2()),
                () -> assertEquals(city, userFromDB.getCity()),
                () -> assertEquals(postcode, userFromDB.getPostcode()),
                () -> assertEquals(vehicleType, userFromDB.getVehicleType()),
                () -> assertEquals(engineSize, userFromDB.getEngineSize()),
                () -> assertEquals(additionalDrivers, userFromDB.getAdditionalDrivers()),
                () -> assertEquals(commercialPurpose, userFromDB.getUsedForCommercial()),
                () -> assertEquals(outsideRegisteredState, userFromDB.getUsedOutsideState()),
                () -> assertEquals(currentValue, userFromDB.getCurrentValue()),
                () -> assertEquals(dateRegistered, userFromDB.getDateRegistered())
        );
    }
}
