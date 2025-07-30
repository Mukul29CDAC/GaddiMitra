package com.cdac.gaaddimitra.servicesimpl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.gaaddimitra.entities.Customer;
import com.cdac.gaaddimitra.entitiesDTO.CustomerDto;
import com.cdac.gaaddimitra.repository.CustomerRepo;
import com.cdac.gaaddimitra.services.CustomerIntf;


@Service
public class CustomerServiceImpl implements CustomerIntf {

	@Autowired
	CustomerRepo repoCust;
	
	@Override
	public void addCustomer(CustomerDto obj) {
		Customer cust = new Customer();
		BeanUtils.copyProperties(obj, cust);
		repoCust.save(cust);
	}

	@Override
	public List<CustomerDto> getAllCustomers() {
		
		List<CustomerDto> proxylist = new ArrayList();
		Iterator<Customer> itr = repoCust.findAll().iterator();
		
		while(itr.hasNext()) {
			CustomerDto proxyObj =  new CustomerDto();
			BeanUtils.copyProperties(itr.next(), proxyObj);	
		}
		return proxylist;
	}

}
