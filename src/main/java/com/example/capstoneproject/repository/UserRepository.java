package com.example.capstoneproject.repository;

import com.example.capstoneproject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByFirstNameAndLastName(String firstName, String lastName);


//    @Query("SELECT u FROM User u WHERE u.firstName = :firstName AND u.lastName = :lastName")
//    List<User> findByFirstNameAndLastNameUsingQuery(String firstName, String lastName);
//
//    @Query(value = "SELECT id, first_name, last_name FROM people p WHERE p.first_name = :firstName AND p.last_name = :lastName", nativeQuery = true)
//    List<User> findByFirstNameAndLastNameUsingNativeQuery(String firstName, String lastName);
//
//    List<User> findByFirstNameAndLastNameNamedQuery( String firstName,String lastName);
//
//    User findByFirstNameAndLastNameNamedNativeQuery(String firstName, String lastName);


}
