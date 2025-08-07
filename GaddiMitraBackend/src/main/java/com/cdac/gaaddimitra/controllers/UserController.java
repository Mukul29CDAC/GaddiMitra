package com.cdac.gaaddimitra.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.gaaddimitra.entitiesDTO.AuthRequest;
import com.cdac.gaaddimitra.entitiesDTO.AuthResponse;
import com.cdac.gaaddimitra.entitiesDTO.UserDto;
import com.cdac.gaaddimitra.servicesimpl.UserServiceImpl;


@RestController
public class UserController {
	


	@Autowired
	UserServiceImpl serviceUser;
	

	@PostMapping("/user/login")
	public AuthResponse login(@RequestBody AuthRequest obj) {

		return serviceUser.login(obj);
	}
	
	@PostMapping("/user/register")
	public String register(@RequestBody UserDto obj) {
		
		serviceUser.register(obj);
		return "User Register";
	}
}

