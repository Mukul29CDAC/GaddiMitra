package com.cdac.gaaddimitra.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.gaaddimitra.entities.Quotation;
import com.cdac.gaaddimitra.entitiesDTO.QuotationDto;
import com.cdac.gaaddimitra.entitiesDTO.VeichleDto;
import com.cdac.gaaddimitra.entitiesDTO.VeichleRequestDto;
import com.cdac.gaaddimitra.servicesimpl.QuotationServiceImpl;

@CrossOrigin(origins = "*")
@RestController
public class QuotationController {


	@Autowired
	QuotationServiceImpl serviceQuot;


	@PostMapping("/quotation/addQuotation")
	public void sendQuotation(@RequestBody QuotationDto obj) {
		serviceQuot.addQuotation(obj);
	}

	@GetMapping("quotation/allQuotation")
	public List<QuotationDto> getQuotations(){
		return serviceQuot.allQuotations();
	}
	
	@GetMapping("quotation/totalQuotation")
	public long totalQotation() {
		return serviceQuot.totalQuotation();
	}
	
	@GetMapping("quotation/allQuotation/{id}/{role}")
	public List<QuotationDto> getQuotationsForCustomer(@PathVariable int id,@PathVariable String role){
		return serviceQuot.allQuotationsForCustomer(id,role);
	}
	
}
