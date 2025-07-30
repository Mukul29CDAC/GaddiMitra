package com.cdac.gaaddimitra.controllers;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.gaaddimitra.entitiesDTO.CustomerDto;
import com.cdac.gaaddimitra.entitiesDTO.QuotationDto;
import com.cdac.gaaddimitra.servicesimpl.CustomerServiceImpl;

@CrossOrigin(origins = "*")
@RestController
public class CustomerController {
	
	@Autowired
	CustomerServiceImpl service;
	
	
	@GetMapping("customer/allCustomer")
	public List<CustomerDto> allCustomer(){
		return service.getAllCustomers();
	}
	
	
	@PostMapping("register/customer")
	public String addCustomer(@RequestBody CustomerDto obj) {
		service.addCustomer(obj);
		return "Customer Added";
	}
	
//	@GetMapping	("/customer/getQuotation")
//	public QuotationDto getQuotation(@RequestBody QuotationDto quotation ) {
//		return quotation;
//	}
}
