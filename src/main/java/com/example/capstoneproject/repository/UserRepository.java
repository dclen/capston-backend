package com.example.capstoneproject.repository;

import com.example.capstoneproject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
