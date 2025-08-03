package com.cdac.gaaddimitra.servicesimpl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.gaaddimitra.entities.Users;
import com.cdac.gaaddimitra.entitiesDTO.UserDto;
import com.cdac.gaaddimitra.repository.UserRepository;

@Service
public class DealerServiceImpl {


	@Autowired
	UserRepository repo;
	
	public List<UserDto> getAllDealers(){
		List<UserDto> dealers = new ArrayList<>();
		Iterator<Users> usr = repo.findByRole("dealer").iterator();
		
		while(usr.hasNext()) {
			UserDto dto = new UserDto();
			BeanUtils.copyProperties(usr, dto);
			dealers.add(dto);
		}
		
		return dealers;
		
		
	}
}
