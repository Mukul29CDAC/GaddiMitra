package com.cdac.gaaddimitra.servicesimpl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.gaaddimitra.entities.Quotation;
import com.cdac.gaaddimitra.entities.Users;
import com.cdac.gaaddimitra.entitiesDTO.QuotationDto;
import com.cdac.gaaddimitra.repository.QuotationRepo;
import com.cdac.gaaddimitra.repository.UserRepository;
import com.cdac.gaaddimitra.services.QuotationServiceIntf;


@Service
public class QuotationServiceImpl implements QuotationServiceIntf {

	@Autowired
	QuotationRepo repoQuotation;
	
	@Autowired
	UserRepository userRepo;
	
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
	
	public List<QuotationDto> allQuotationsForCustomer(int id,String role) {
		// TODO Auto-generated method stub
		Iterator<Quotation> itr = null;
		List<QuotationDto> quotations = new ArrayList<>();
		
		if(role.equalsIgnoreCase("customer")) {
			itr = repoQuotation.findByCustomerId(id).iterator();
		}else{
			 itr = repoQuotation.findBySenderId(id).iterator();
		}
		
		
		
		while(itr.hasNext()) {
			Quotation qout = itr.next();
			Optional<Users> sender = userRepo.findById(qout.getSenderid());
			if (sender.isPresent()) {
			    QuotationDto proxy = new QuotationDto();
			    BeanUtils.copyProperties(qout, proxy);
			    proxy.setSendername(sender.get().getName());
			    quotations.add(proxy);
			} else {
			    System.out.println("No user found with sender ID: " + qout.getSenderid());
			   
			}
		}
		return quotations;
	}
	

}
