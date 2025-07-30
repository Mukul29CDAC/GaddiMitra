package com.cdac.gaaddimitra.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.gaaddimitra.entitiesDTO.DealerDto;
import com.cdac.gaaddimitra.servicesimpl.DealerServiceImpl;

@CrossOrigin(origins = "*")
@RestController
public class DealerController {
	
	@Autowired
	DealerServiceImpl serviceDealer;
		
	@GetMapping("dealers/alldealers")
	public List<DealerDto> getAllDealers(){
	
		return serviceDealer.getAllDealers();
	}
	
	@PostMapping("register/dealer")
	public String addDealer(@RequestBody DealerDto obj) {	
		serviceDealer.addDealer(obj);
		return "Dealer Added";
	}
	
	@GetMapping("dealers/getonedealer/{id}")
	public DealerDto getDealer(@PathVariable int id) {
		return serviceDealer.getOneDealer(id);
	}
	
}
