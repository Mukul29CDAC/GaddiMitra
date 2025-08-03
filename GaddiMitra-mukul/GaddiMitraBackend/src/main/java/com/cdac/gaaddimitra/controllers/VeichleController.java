package com.cdac.gaaddimitra.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.cdac.gaaddimitra.entitiesDTO.VeichleDto;
import com.cdac.gaaddimitra.servicesimpl.VeichleServiceImpl;

@CrossOrigin(origins = "*")
@RestController
public class VeichleController {

	@Autowired
	VeichleServiceImpl serviceVeichle;
	
	
	@GetMapping("/veichles/allVeichles")
	public List<VeichleDto> allVeichles() {
		return  serviceVeichle.getAllVeichle();
	}
	
	@PostMapping("/veichles/addVeichle")
	public void addVeichle(@RequestPart("obj") VeichleDto obj,
	                                         @RequestPart("image") MultipartFile image) {
	         serviceVeichle.addVeichle(obj,image);
	    
	}

	
	@GetMapping("/veichles/totalVeichle")
	public int gettotal() {
		return serviceVeichle.totalVeichle();
	}
	
	@DeleteMapping("/veichles/removeVeichle/{id}")
	public String deleteVeichle(@PathVariable int id) {
		System.out.println(id);
		serviceVeichle.deleteVeichle(id);
		
		return "deleted";
		
	}
	
	@GetMapping("/veichles/veichleDetails/{id}")
	public ResponseEntity<VeichleDto> getVechicleDetails(@PathVariable int id) {
		VeichleDto vehicleDto = serviceVeichle.getVeichleDetails(id);
		if(vehicleDto == null)
			return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
	    return new ResponseEntity<>(vehicleDto, HttpStatus.OK);
	}
}
