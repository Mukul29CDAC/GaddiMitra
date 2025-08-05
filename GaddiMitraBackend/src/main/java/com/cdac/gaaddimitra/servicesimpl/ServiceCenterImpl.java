package com.cdac.gaaddimitra.servicesimpl;

import java.util.ArrayList;


import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.gaaddimitra.entities.ServiceCenter;
import com.cdac.gaaddimitra.entities.Users;
//import com.cdac.gaaddimitra.entitiesDTO.ServiceCenterDto;
import com.cdac.gaaddimitra.entitiesDTO.UserDto;
import com.cdac.gaaddimitra.repository.ServiceCenterRepo;
import com.cdac.gaaddimitra.repository.UserRepository;
//import com.cdac.gaaddimitra.services.ServiceCenterIntf;


@Service
public class ServiceCenterImpl {
	
	@Autowired
	UserRepository repo;

	public List<UserDto> getAllServiceCenter(){
		List<UserDto> centers = new ArrayList<>();
		Iterator<Users> usr = repo.findByRole("servicecenter").iterator();
		
		while(usr.hasNext()) {
			UserDto dto = new UserDto();
			BeanUtils.copyProperties(usr.next(), dto);
			centers.add(dto);
		}
		return centers;
	}
	
	
}
