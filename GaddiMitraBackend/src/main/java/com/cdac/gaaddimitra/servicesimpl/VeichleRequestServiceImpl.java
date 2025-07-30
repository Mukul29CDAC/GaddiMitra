package com.cdac.gaaddimitra.servicesimpl;

import java.util.ArrayList;

 
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.gaaddimitra.entities.VeichleRequest;
import com.cdac.gaaddimitra.entitiesDTO.VeichleRequestDto;
import com.cdac.gaaddimitra.observer.VeichleRequestPublisher;
import com.cdac.gaaddimitra.repository.VeichleRequestRepo;
import com.cdac.gaaddimitra.services.VeichleRequestIntf;



@Service
public class VeichleRequestServiceImpl implements VeichleRequestIntf{
	
	@Autowired
	VeichleRequestRepo repoRequest;
	

	@Autowired
    private VeichleRequestPublisher publisher;

	@Override
	public void addRequest(VeichleRequestDto req) {
		VeichleRequest vec = new VeichleRequest();
		BeanUtils.copyProperties(req, vec);
		repoRequest.save(vec);
		publisher.publish(vec);
		
	}

	@Override
	public List<VeichleRequestDto> allRequests() {
		List<VeichleRequestDto> proxylist = new ArrayList<>();
		Iterator<VeichleRequest> itr = repoRequest.findAll().iterator();
		
		while(itr.hasNext()) {
			VeichleRequestDto proxyObj =  new VeichleRequestDto();
			BeanUtils.copyProperties(itr.next(), proxyObj);	
			proxylist.add(proxyObj);
		}

		return proxylist;
	}

	@Override
	public long totalRequests() {
		// TODO Auto-generated method stub
		return repoRequest.count();
		
	}

}
