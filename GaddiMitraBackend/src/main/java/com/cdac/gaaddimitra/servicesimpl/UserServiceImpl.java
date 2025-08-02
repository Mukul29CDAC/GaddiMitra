package com.cdac.gaaddimitra.servicesimpl;

import java.util.Optional;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.gaaddimitra.entities.Customer;
import com.cdac.gaaddimitra.entities.Dealer;
import com.cdac.gaaddimitra.entities.ServiceCenter;
import com.cdac.gaaddimitra.entities.Users;
import com.cdac.gaaddimitra.entitiesDTO.CustomerDto;
import com.cdac.gaaddimitra.entitiesDTO.DealerDto;
import com.cdac.gaaddimitra.entitiesDTO.ServiceCenterDto;
import com.cdac.gaaddimitra.entitiesDTO.UserDto;
import com.cdac.gaaddimitra.repository.ServiceCenterRepo;
import com.cdac.gaaddimitra.repository.UserRepository;
import com.cdac.gaaddimitra.services.UserServiceIntf;

@Service
public class UserServiceImpl {
	
	@Autowired
	UserRepository repoUser;
	
	@Autowired
	ServiceCenterRepo repoService;
	
	

	public UserDto login(UserDto obj) {
		// TODO Auto-generated method stub
		UserDto user = new UserDto();
		Users usr = repoUser.findByEmail(obj.getEmail());
			
		if(usr != null) {
			if(usr.getPassword().equals(obj.getPassword())) {
				int id = usr.getUserid();
				String name = usr.getName();
				String email = usr.getEmail();
				String password = usr.getPassword();
				String address = usr.getAddress();
				String phone = usr.getPhone();
				String role = usr.getRole();
				
				   if(usr.getRole().equals("customer")) {
					   CustomerDto customer = new CustomerDto(id,name,email,password,address,phone,role);
					   return customer;
					 
				   }else if(usr.getRole().equals("dealer")) {
					   DealerDto dealer = new DealerDto(id,name,email,password,address,phone,role);
					   return dealer;
					   
				   }else if(usr.getRole().equals("servicecenter")) {
					   Optional<ServiceCenter> servicecenter = repoService.findById(usr.getUserid());
					   ServiceCenterDto center =  new ServiceCenterDto(id,name,email,password,address,phone,role,servicecenter.get().getType());
					   
					   return center;
				   }
			}
		
		}
		
		return user;
		
	}
	
	
	public void register(UserDto obj) {
		Users user = new Users();
		
		BeanUtils.copyProperties(obj, user);
		repoUser.save(user);
	}

}
