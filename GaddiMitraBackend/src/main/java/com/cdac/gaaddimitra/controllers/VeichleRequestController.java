package com.cdac.gaaddimitra.controllers;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

//import com.cdac.gaaddimitra.entities.VeichleRequest;
import com.cdac.gaaddimitra.entitiesDTO.VeichleRequestDto;
//import com.cdac.gaaddimitra.observer.VeichleRequestPublisher;
import com.cdac.gaaddimitra.servicesimpl.VeichleRequestServiceImpl;

@CrossOrigin(origins = "*")
@RestController
public class VeichleRequestController {
	
	@Autowired
	VeichleRequestServiceImpl service;
	
	
	@GetMapping("/requests/showallrequests")
	public List<VeichleRequestDto> allRequest(){
		
		return service.allRequests();
	}
	
	@PostMapping("requests/addRequest")
	public String addRequest(@RequestBody VeichleRequestDto vec) {
		service.addRequest(vec);	
		return "Request Added";
	}
	
	@GetMapping("/veichleRequest/total")
	public long totalRequest() {
//		System.out.println();
		return service.totalRequests();
	}
}
