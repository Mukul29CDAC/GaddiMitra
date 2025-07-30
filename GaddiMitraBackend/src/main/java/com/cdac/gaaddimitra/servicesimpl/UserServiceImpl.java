package com.cdac.gaaddimitra.servicesimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.gaaddimitra.entities.Customer;
import com.cdac.gaaddimitra.entities.Dealer;
import com.cdac.gaaddimitra.entities.ServiceCenter;
import com.cdac.gaaddimitra.entitiesDTO.UserDto;
import com.cdac.gaaddimitra.repository.CustomerRepo;
import com.cdac.gaaddimitra.repository.DealerRepo;
import com.cdac.gaaddimitra.repository.ServiceCenterRepo;
import com.cdac.gaaddimitra.services.UserServiceIntf;

@Service
public class UserServiceImpl implements UserServiceIntf{

	@Autowired
	CustomerRepo repoCustomer;
	
	@Autowired
	DealerRepo repoDealer;
	
	@Autowired
	ServiceCenterRepo repoServiceCenter;
	
	@Override
	public UserDto login(UserDto obj) {
		// TODO Auto-generated method stub
		UserDto user = new UserDto();
		Dealer dealer = repoDealer.findByEmail(obj.getEmail());
		Customer customer = repoCustomer.findByEmail(obj.getEmail());
		
		ServiceCenter servicecenter = repoServiceCenter.findByEmail(obj.getEmail());
		
		if(dealer != null) {
			if(dealer.getPassword().equals(obj.getPassword())) {
				user.setUserid(dealer.getDealerid());
				user.setName(dealer.getName());
				user.setEmail(dealer.getEmail());
				user.setRole("dealer");
				return user;
			}
			
		}else if(customer != null) {
			if(customer.getPassword().equals(obj.getPassword())) {
				user.setUserid(customer.getCustomerid());
				user.setName(customer.getName());
				user.setEmail(customer.getEmail());
				user.setRole("customer");
				return user;
			}
		}else if(servicecenter != null){
			if(servicecenter.getPassword().equals(obj.getPassword())) {
				user.setUserid(servicecenter.getServicecenterid());
				user.setName(servicecenter.getName());
				user.setEmail(servicecenter.getEmail());
				user.setRole("service_center");
				return user;
			}
		}
		
		return user;
		
	}

}
