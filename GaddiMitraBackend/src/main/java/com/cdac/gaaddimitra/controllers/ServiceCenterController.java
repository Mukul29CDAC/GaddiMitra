package com.cdac.gaaddimitra.controllers;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
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
import com.cdac.gaaddimitra.entitiesDTO.ServiceCenterDto;
import com.cdac.gaaddimitra.repository.VeichleRepo;
import com.cdac.gaaddimitra.services.QuotationServiceIntf;
import com.cdac.gaaddimitra.servicesimpl.QuotationServiceImpl;
import com.cdac.gaaddimitra.servicesimpl.ServiceCenterImpl;

@CrossOrigin(origins = "*")
@RestController
public class ServiceCenterController {
	
	@Autowired
	ServiceCenterImpl serviceCenter;
	
	@Autowired
	QuotationServiceImpl serviceQuot;
	

	
	@GetMapping("/servicecenter/allcenters")
	public List<ServiceCenterDto> getAllCenters(){
		return serviceCenter.getAllServiceCenter();
	}
	
	@PostMapping("/register/servicecenter")
	public String addServiceCenter(@RequestBody ServiceCenterDto obj) {
		serviceCenter.addServiceCenter(obj);
		return "ObjectAdded";
	}
//	
//	@GetMapping("/servicecenter/getNotify")
//	public void sendNotification(@RequestBody Notification msg) {
//		System.out.println(msg);
//	}
//	
//	@PostMapping("/servicecenter/sendQuotataion")
//	public void sendQuoatation(@RequestBody QuotationDto quotation) {
//		serviceQuot.addQuotation(quotation);
////		new RestTemplate().postForEntity("http://localhost:8080/customer/getQuotation", quotation, QuotationDto.class);
//	}
//	
	
	
}
