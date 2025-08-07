package com.cdac.gaaddimitra.controllers;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

//import com.cdac.gaaddimitra.entitiesDTO.DealerDto;
import com.cdac.gaaddimitra.entitiesDTO.UserDto;
import com.cdac.gaaddimitra.servicesimpl.DealerServiceImpl;

@RestController
public class DealerController {
	
	@Autowired
	DealerServiceImpl serviceDealer;
		
	@GetMapping("dealers/alldealers")
	public List<UserDto> getAllDealers(){
	
		return serviceDealer.getAllDealers();
	}


}
