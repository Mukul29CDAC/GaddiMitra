package com.cdac.gaaddimitra.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cdac.gaaddimitra.entities.Customer;
import com.cdac.gaaddimitra.entities.Users;

public interface UserRepository extends JpaRepository<Users, Integer> {

	@Query(value = "SELECT * FROM users WHERE email = :email", nativeQuery = true)
	Users findByEmail(@Param("email") String email);
	
	@Query(value = "SELECT * FROM users WHERE role = :role", nativeQuery = true)
	List<Users> findByRole(@Param("role") String role);
}
