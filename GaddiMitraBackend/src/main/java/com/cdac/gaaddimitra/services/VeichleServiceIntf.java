package com.cdac.gaaddimitra.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.cdac.gaaddimitra.entitiesDTO.VeichleDto;

public interface VeichleServiceIntf {

	List<VeichleDto> getAllVeichle();
	
	void addVeichle(VeichleDto obj,MultipartFile image);
	
	public int totalVeichle();
	
	public void deleteVeichle(int id);
}
