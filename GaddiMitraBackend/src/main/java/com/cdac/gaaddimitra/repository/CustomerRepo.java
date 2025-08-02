package com.cdac.gaaddimitra.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.gaaddimitra.entities.Customer;

public interface CustomerRepo extends JpaRepository<Customer, Integer>{

}
