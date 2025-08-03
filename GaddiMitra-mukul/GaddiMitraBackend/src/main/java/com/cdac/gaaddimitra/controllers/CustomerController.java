package com.cdac.gaaddimitra.controllers;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;

import com.cdac.gaaddimitra.entitiesDTO.UserDto;
import com.cdac.gaaddimitra.servicesimpl.CustomerServiceImpl;

@CrossOrigin(origins = "*")
@RestController
public class CustomerController {
	
	@Autowired
	CustomerServiceImpl service;
	
	
	@GetMapping("customer/allCustomer")
	public List<UserDto> allCustomer(){
		return service.getAllCustomers();
	}
	
}
