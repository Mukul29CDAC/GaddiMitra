package com.cdac.gaaddimitra.services;

import java.util.List;

import com.cdac.gaaddimitra.entitiesDTO.QuotationDto;

public interface QuotationServiceIntf {

	public void addQuotation(QuotationDto obj);
	
	public List<QuotationDto> allQuotations();
	
	public long totalQuotation();
}
