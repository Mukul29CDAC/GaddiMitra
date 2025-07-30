package com.cdac.gaaddimitra.services;

import java.util.List;

import com.cdac.gaaddimitra.entitiesDTO.CustomerDto;

public interface CustomerIntf {
	
	public void addCustomer(CustomerDto obj);
	
	public List<CustomerDto> getAllCustomers();
}
