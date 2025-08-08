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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.cdac.gaaddimitra.entities.Veichles;
import com.cdac.gaaddimitra.entitiesDTO.VeichleDto;
import com.cdac.gaaddimitra.servicesimpl.VeichleServiceImpl;

@RestController
public class VeichleController {

	@Autowired
	VeichleServiceImpl serviceVeichle;


	@GetMapping("/veichles/allVeichles")
	public List<VeichleDto> allVeichles() {
		return  serviceVeichle.getAllVeichle();
	}
	
	@GetMapping("/veichles/allVeichles/{dealerid}")
	public List<VeichleDto> allVeichles(@PathVariable int dealerid) {
		return  serviceVeichle.getDealerVeichle(dealerid);
	}

	@PostMapping("/veichles/addVeichle/{id}")
	public void addVeichle(@RequestPart("obj") VeichleDto obj,
			@RequestPart("image") MultipartFile image,
			@PathVariable int id){
		serviceVeichle.addVeichle(obj,image,id);

	}
	
	@PutMapping("/vehicles/update/{id}")
	public String editVehicle(@PathVariable int id,@RequestBody VeichleDto veichle) {
		serviceVeichle.editVehicle(veichle,id);
		return "Vehicle Updated Successfully";
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

}
