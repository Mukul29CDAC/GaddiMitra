package com.cdac.gaaddimitra.servicesimpl;

import java.util.Optional;



import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.gaaddimitra.entities.Customer;
import com.cdac.gaaddimitra.entities.Dealer;
import com.cdac.gaaddimitra.entities.ServiceCenter;
import com.cdac.gaaddimitra.entities.Users;

import com.cdac.gaaddimitra.entitiesDTO.UserDto;
import com.cdac.gaaddimitra.repository.CustomerRepo;
import com.cdac.gaaddimitra.repository.DealerRepo;
import com.cdac.gaaddimitra.repository.ServiceCenterRepo;
import com.cdac.gaaddimitra.repository.UserRepository;
import com.cdac.gaaddimitra.services.UserServiceIntf;

@Service
public class UserServiceImpl {
	
	@Autowired
	UserRepository repoUser;
	
	@Autowired
	ServiceCenterRepo repoService;
	
	@Autowired
	CustomerRepo repoCustomer;
	
	@Autowired
	DealerRepo repoDealer;
	
	

	public UserDto login(UserDto obj) {
		// TODO Auto-generated method stub
		UserDto user = new UserDto();
		Users usr = repoUser.findByEmail(obj.getEmail());
			
		if(usr != null) {
			if(usr.getPassword().equals(obj.getPassword())) {
				BeanUtils.copyProperties(usr,user);
				return user;	  
			}
		}
		return user;
	}
	
	
	public void register(UserDto obj) {
		Users user = new Users();
		
		if(obj.getRole().equals("servicecenter")) {
			ServiceCenter service = new ServiceCenter();
			BeanUtils.copyProperties(obj, service);
			repoService.save(service);
		}else if(obj.getRole().equals("customer")) {
			Customer cust = new Customer();
			BeanUtils.copyProperties(obj, cust);
			repoCustomer.save(cust);
		}else if(obj.getRole().equals("dealer")) {
			Dealer dealer = new Dealer();
			BeanUtils.copyProperties(obj, dealer);
			repoDealer.save(dealer);
		}
		
		else {
			BeanUtils.copyProperties(obj, user);
			repoUser.save(user);
		}
		
		
		
	}

}
