package com.example.capstoneproject.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

//    @Test
//    void shouldFindYuval_usingQuery(){
//        assertEquals(1, userRepository.findByFirstNameAndLastNameUsingQuery("Dermot", "Clen").size());
//    }
//
//    @Test
//    void shouldFindYuval_usingNativeQuery(){
//        assertEquals(1, userRepository.findByFirstNameAndLastNameUsingNativeQuery("Dermot", "Clen").size());
//    }
//
//    @Test
//    void shouldFindYuval_usingNamedQuery(){
//        assertEquals(1, userRepository.findByFirstNameAndLastNameNamedQuery("Dermot", "Clen").size());
//    }
//
//    @Test
//    void shouldFindYuval_usingNamedNativeQuery(){
//        assertNotNull(userRepository.findByFirstNameAndLastNameNamedNativeQuery("Dermot", "Clen"));
//    }


    @Test
    void shouldFindDermot(){
        assertEquals(1, userRepository.findByFirstNameAndLastName("Dermot", "Clen").size());
    }

}