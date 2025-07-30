package com.cdac.gaaddimitra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.cdac.gaaddimitra.entities.Customer;


@Repository
public interface CustomerRepo extends JpaRepository<Customer, Integer>{

	@Query(value = "SELECT * FROM customer WHERE email = :email", nativeQuery = true)
	Customer findByEmail(@Param("email") String email);

}


