package com.cdac.gaaddimitra.controllers;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cdac.gaaddimitra.entitiesDTO.VeichleDto;
//import com.cdac.gaaddimitra.entities.VeichleRequest;
import com.cdac.gaaddimitra.entitiesDTO.VeichleRequestDto;
//import com.cdac.gaaddimitra.observer.VeichleRequestPublisher;
import com.cdac.gaaddimitra.servicesimpl.VeichleRequestServiceImpl;

@RestController
public class VeichleRequestController {
	
	@Autowired
	VeichleRequestServiceImpl service;
	

    @GetMapping("requests/showallrequests/{id}")
    public ResponseEntity<List<VeichleRequestDto>> allRequest(@PathVariable int id) {
       
        List<VeichleRequestDto> requests = service.allRequests(id);
        if (requests.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(requests); 
    }
    
    

	@PostMapping("requests/addRequest")
	public String addRequest(@RequestPart("obj") VeichleRequestDto vec,
			@RequestPart("image") MultipartFile image) {
		service.addRequest(vec,image);	
		return "Request Added";
	}
	
	@GetMapping("veichleRequest/total")
	public long totalRequest() {
		return service.totalRequests();
	}
	
	@GetMapping("requests/getAllServiceRequests/{role}")
	public ResponseEntity<List<VeichleRequestDto>> getServiceRequests(@PathVariable String role) {
		List<VeichleRequestDto> veichleRequests = service.getAllServiceRequest(role);
		if (veichleRequests.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(veichleRequests);
	}
	
	
	@PutMapping("/request/update/{id}")
	public String updateRequest(@PathVariable int id,@RequestBody VeichleRequestDto requestdata) {
		service.updateRequest(requestdata, id);
		return "Edit Succesfully";
	}
	
	@DeleteMapping("/request/delete/{id}")
	public String deleteRequestByCustomer(@PathVariable int id) {
		service.deleteRequest(id);
		return "deleted succesfully";
	}
	
	
}
