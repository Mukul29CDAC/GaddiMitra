package com.cdac.gaaddimitra.servicesimpl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.gaaddimitra.entities.Quotation;
import com.cdac.gaaddimitra.entitiesDTO.QuotationDto;
import com.cdac.gaaddimitra.repository.QuotationRepo;
import com.cdac.gaaddimitra.services.QuotationServiceIntf;


@Service
public class QuotationServiceImpl implements QuotationServiceIntf {

	@Autowired
	QuotationRepo repoQuotation;
	
	@Override
	public void addQuotation(QuotationDto obj) {
		Quotation quot = new Quotation();
		BeanUtils.copyProperties(obj, quot);
		repoQuotation.save(quot);
	}

	@Override
	public List<QuotationDto> allQuotations() {
		// TODO Auto-generated method stub
		
		List<QuotationDto> quotations = new ArrayList<>();
		
		Iterator<Quotation> itr = repoQuotation.findAll().iterator();
		
		while(itr.hasNext()) {
			QuotationDto proxy =  new QuotationDto();
			BeanUtils.copyProperties(itr.next(), proxy);
			quotations.add(proxy);
		}
		return quotations;
		
		
	}
	
	@Override
	public long totalQuotation() {
		return repoQuotation.count();
	}
	

}
