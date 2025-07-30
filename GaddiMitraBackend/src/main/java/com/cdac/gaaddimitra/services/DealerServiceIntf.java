package com.cdac.gaaddimitra.services;

import java.util.List;

import com.cdac.gaaddimitra.entitiesDTO.DealerDto;

public interface DealerServiceIntf {

	public void addDealer(DealerDto obj);
	
	public List<DealerDto> getAllDealers();
	
	public DealerDto getOneDealer(int id);
	
}
