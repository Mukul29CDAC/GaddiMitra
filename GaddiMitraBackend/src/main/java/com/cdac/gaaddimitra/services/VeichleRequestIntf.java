package com.cdac.gaaddimitra.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.cdac.gaaddimitra.entitiesDTO.VeichleRequestDto;

public interface VeichleRequestIntf {
	
	public void addRequest(VeichleRequestDto req);
	
	public List<VeichleRequestDto> allRequests();
	
	public long totalRequests();
	
	public ResponseEntity<List<VeichleRequestDto>> getAllServiceRequest();
	
}
