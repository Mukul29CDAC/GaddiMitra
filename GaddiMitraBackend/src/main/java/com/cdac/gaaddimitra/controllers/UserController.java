package com.cdac.gaaddimitra.controllers;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

//import com.cdac.gaaddimitra.entitiesDTO.ServiceCenterDto;
import com.cdac.gaaddimitra.entitiesDTO.UserDto;
import com.cdac.gaaddimitra.servicesimpl.EmailService;
import com.cdac.gaaddimitra.servicesimpl.UserServiceImpl;

@CrossOrigin(origins="*")
@RestController
public class UserController {

	@Autowired
	UserServiceImpl serviceUser;
	
//	@Autowired
//	EmailService emailService;
	
	
	@PostMapping("/user/login")
	public UserDto login(@RequestBody UserDto obj) {
//		System.out.print("login come");
		
//			emailService.sendSimpleEmail(obj.getEmail(), "New Device Login", "Recently Login to a device");
		
		return serviceUser.login(obj);
	}
	
	@PostMapping("/user/register")
	public String register(@RequestBody UserDto obj) {
		
		serviceUser.register(obj);
		return "User Register";
	}
}

