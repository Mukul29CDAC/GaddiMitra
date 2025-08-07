package com.cdac.gaaddimitra.controllers;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.cdac.gaaddimitra.entities.Notification;
import com.cdac.gaaddimitra.entities.Quotation;
import com.cdac.gaaddimitra.entitiesDTO.QuotationDto;
//import com.cdac.gaaddimitra.entities.Notification;
//import com.cdac.gaaddimitra.entitiesDTO.ServiceCenterDto;
import com.cdac.gaaddimitra.entitiesDTO.UserDto;
import com.cdac.gaaddimitra.entitiesDTO.VeichleRequestDto;
import com.cdac.gaaddimitra.repository.VeichleRepo;
import com.cdac.gaaddimitra.services.QuotationServiceIntf;
import com.cdac.gaaddimitra.servicesimpl.QuotationServiceImpl;
import com.cdac.gaaddimitra.servicesimpl.ServiceCenterImpl;

@RestController
public class ServiceCenterController {
	
	@Autowired
	ServiceCenterImpl serviceCenter;
	
	
	@GetMapping("/servicecenter/allcenters")
	public List<UserDto> getAllCenters(){
		return serviceCenter.getAllServiceCenter();
	}

	
	
}
