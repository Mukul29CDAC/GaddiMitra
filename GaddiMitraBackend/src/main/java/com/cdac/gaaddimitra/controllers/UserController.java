package com.cdac.gaaddimitra.controllers;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.gaaddimitra.entitiesDTO.UserDto;
import com.cdac.gaaddimitra.servicesimpl.UserServiceImpl;

@CrossOrigin(origins="*")
@RestController
public class UserController {

	@Autowired
	UserServiceImpl serviceUser;
	
	@PostMapping("/user/login")
	public UserDto login(@RequestBody UserDto obj) {
		return serviceUser.login(obj);
	}
	
	@PostMapping("/user/register")
	public String register(@RequestBody UserDto obj) {
		System.out.println(obj);
		serviceUser.register(obj);
		return "User Register";
	}
}

